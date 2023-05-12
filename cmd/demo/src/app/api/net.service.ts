import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NetService {
  constructor(private http: HttpClient, private toastCtrl: ToastController) {}

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