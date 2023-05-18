import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, ToastOptions } from '@ionic/angular';
import { NextObserver, map, share } from 'rxjs';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { pb } from 'src/pb';
import { Result } from './result';

@Injectable({ providedIn: 'root' })
export class AppService {
  onOpen$: NextObserver<Event> = {
    next: () => {
      console.log('连接开启');
    },
  };
  onClose$: NextObserver<CloseEvent> = {
    next: () => {
      console.log('连接关闭');
    },
  };
  private ws: WebSocketSubject<ArrayBuffer> = webSocket({
    url: `ws://${location.host}/ws`,
    openObserver: this.onOpen$,
    closeObserver: this.onClose$,
    binaryType: 'arraybuffer',
    serializer: (v) => v as ArrayBuffer,
    deserializer: (v) => v.data,
  });
  onMsg$ = this.ws.pipe(
    map((msg) => {
      const buf = new Uint8Array(msg as ArrayBuffer);

      return pb.Msg.decode(buf);
    }),
    share()
  );

  constructor(private http: HttpClient, private toastCtrl: ToastController) {
    this.onMsg$.subscribe((msg) => console.log(msg));
    // this.http.post('/app/load', null).subscribe();
    // fromEvent(window, 'beforeunload').subscribe((_) => {
    //   this.http.post('/app/unload', null).subscribe();
    // });
  }

  send(data: pb.IMsg) {
    const m = pb.Msg.create(data);
    this.ws.next(pb.Msg.encode(m).finish());
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
