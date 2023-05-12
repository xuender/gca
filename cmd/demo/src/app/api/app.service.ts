import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient, private toastCtrl: ToastController) {
    this.http.post('/app/load', null).subscribe();
    fromEvent(window, 'beforeunload').subscribe((_) => {
      this.http.post('/app/unload', null).subscribe();
    });
  }

  copy(text: string) {
    this.http
      .post<boolean>('/app/clipboard', text)
      .subscribe(async (result) => {
        if (result) {
          const toast = await this.toastCtrl.create({
            message: `[ ${text} ] 复制到剪切板`,
            duration: 1500,
            position: 'top',
          });

          await toast.present();
        }
      });
  }
}
