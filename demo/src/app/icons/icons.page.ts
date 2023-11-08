import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController } from '@ionic/angular';
import { Subscription, filter, fromEvent } from 'rxjs';

import { pb } from 'src/pb';
import { AppService } from '../api/app.service';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.page.html',
  styleUrls: ['./icons.page.scss'],
})
export class IconsPage implements OnInit, OnDestroy {
  private keySubscription?: Subscription;
  private msg$?: Subscription;

  icons: pb.IMsg = {};
  constructor(
    private actionSheetCtrl: ActionSheetController,
    private app: AppService
  ) {}

  ngOnInit() {
    this.msg$ = this.app.onMsg$
      .pipe(filter((m) => m.type == pb.Type.icons))
      .subscribe((msg) => (this.icons = msg));
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

    if (this.msg$) {
      this.msg$.unsubscribe();
    }
  }

  find() {
    if (this.icons.text) {
      this.icons.text = this.icons.text.toLowerCase();
    }

    this.app.send({
      type: pb.Type.icons,
      offset: this.icons.offset,
      text: this.icons.text,
    });
  }

  next() {
    if (!this.icons.offset) {
      this.icons.offset = 0;
    }

    let old = this.icons.offset;
    (this.icons.offset as number) += 100;

    if (this.icons.count && this.icons.offset >= this.icons.count) {
      this.icons.offset = old;
    }

    this.find();
  }

  prev() {
    if (!this.icons.offset) {
      return;
    }

    (this.icons.offset as number) -= 100;

    if ((this.icons.offset as number) < 0) {
      this.icons.offset = 0;
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

    // this.app.copy(data.data.text);
  }
}
