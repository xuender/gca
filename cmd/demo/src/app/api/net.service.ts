import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from '../ping/message';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NetService {
  constructor(private http: HttpClient, private toastCtrl: ToastController) {}
  ping() {
    // return this.http.get<Message>('/api/ping').pipe(
    //   tap((msg) => {
    //     msg.date = new Date(msg.time);

    //     return msg;
    //   })
    // );
    return this.http.get<Message>('/api/ping');
  }

  copy(text: string) {
    this.http.post<boolean>('/api/clipboard', { text }).subscribe(async (r) => {
      if (r) {
        const toast = await this.toastCtrl.create({
          message: `${text} 复制到剪切板`,
          duration: 1500,
          position: 'top',
        });

        await toast.present();
      }
    });
  }
}
