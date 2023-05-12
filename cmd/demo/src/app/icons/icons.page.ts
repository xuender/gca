import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActionSheetButton, ActionSheetController } from '@ionic/angular';
import { NetService } from '../api/net.service';
import { Query } from './query';
import { Result } from './result';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.page.html',
  styleUrls: ['./icons.page.scss'],
})
export class IconsPage implements OnInit {
  icons: Result = {};
  query: Query = { limit: 0 };

  constructor(
    private http: HttpClient,
    private actionSheetCtrl: ActionSheetController,
    private net: NetService
  ) {}

  find() {
    this.http
      .post<Result>('/api/icons', this.query)
      .subscribe((r) => (this.icons = r));
  }

  next() {
    if (this.query.limit) {
      this.query.limit += 100;
    } else {
      this.query.limit = 100;
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

    this.net.copy(data.data.text);
  }

  ngOnInit() {
    this.find();
  }
}
