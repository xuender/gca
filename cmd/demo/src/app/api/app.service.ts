import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';
import { fromEvent } from 'rxjs';
import { Result } from './result';

@Injectable({ providedIn: 'root' })
export class AppService {
  constructor(private http: HttpClient, private toastCtrl: ToastController) {
    this.http.post('/app/load', null).subscribe();
    fromEvent(window, 'beforeunload').subscribe((_) => {
      this.http.post('/app/unload', null).subscribe();
    });
  }

  copy(text: string) {
    this.http
      .post<Result<boolean>>('/app/clipboard', text)
      .subscribe(async (result) => {
        const opts: ToastOptions = { position: 'top' };
        if (result.success) {
          opts.message = `[ ${text} ] 已复制。`;
          opts.icon = 'information-circle';
          opts.duration = 1500;
        } else {
          opts.message = result.error;
          opts.icon = 'sad';
          opts.buttons = [{ text: '关闭', role: 'cancel' }];
        }

        const toast = await this.toastCtrl.create(opts);
        await toast.present();
      });
  }
}
