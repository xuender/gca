import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController } from '@ionic/angular';
import { AppService } from '../api/app.service';
import { Query } from './query';
import { Result } from './result';
import { Subscription, fromEvent } from 'rxjs';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.page.html',
  styleUrls: ['./icons.page.scss'],
})
export class IconsPage implements OnInit, OnDestroy {
  icons: Result = {};
  query: Query = { limit: 0 };
  private keySubscription?: Subscription;

  constructor(
    private http: HttpClient,
    private actionSheetCtrl: ActionSheetController,
    private app: AppService
  ) {}

  ngOnInit() {
    this.keySubscription = fromEvent<KeyboardEvent>(
      window,
      'keydown'
    ).subscribe((event) => {
      switch (event.key) {
        case 'PageDown':
          this.next();
          break;
        case 'PageUp':
          this.prev();
          break;
        default:
          console.log('keydown', event);
      }
    });
    this.find();
  }

  ngOnDestroy(): void {
    if (this.keySubscription) {
      this.keySubscription.unsubscribe();
    }
  }

  find() {
    if (this.query.text) {
      this.query.text = this.query.text.toLowerCase();
    }

    this.http
      .post<Result>('/api/icons', this.query)
      .subscribe((r) => (this.icons = r));
  }

  next() {
    if (!this.query.limit) {
      this.query.limit = 0;
    }

    let old = this.query.limit;
    this.query.limit += 100;

    if (this.icons.count && this.query.limit >= this.icons.count) {
      this.query.limit = old;
    }

    this.find();
  }

  prev() {
    if (this.query.limit) {
      this.query.limit -= 100;
    } else {
      this.query.limit = 0;
    }

    if (this.query.limit < 0) {
      this.query.limit = 0;
    }

    this.find();
  }

  async copy(str: string) {
    const buttons: ActionSheetButton[] = [];

    for (const key of ['', '-sharp', '-outline']) {
      let text = `<ion-icon name="${str + key}"></ion-icon>`;
      buttons.push({
        text,
        icon: str + key,
        data: { text },
      });

      text = str + key;
      buttons.push({
        text,
        icon: text,
        data: { text },
      });
    }

    buttons[0].role = 'destructive';
    buttons.push({
      text: '取消',
      role: 'cancel',
      data: {},
    });

    const actionSheet = await this.actionSheetCtrl.create({
      header: '复制',
      buttons,
    });

    await actionSheet.present();

    const data = await actionSheet.onDidDismiss();
    if (!data || !data.data || !data.data.text) {
      return;
    }

    this.app.copy(data.data.text);
  }
}
