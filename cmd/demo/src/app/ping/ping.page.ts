import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../api/app.service';
import { Message } from './message';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ping',
  templateUrl: './ping.page.html',
  styleUrls: ['./ping.page.scss'],
})
export class PingPage implements OnInit, OnDestroy {
  msgs: Message[] = [];
  private msg$?: Subscription;

  constructor(private app: AppService, private http: HttpClient) {}

  ngOnInit(): void {
    this.msg$ = this.app.onMsg$.subscribe((msg) => {
      this.msgs.unshift({
        type: 'ws',
        data: msg.data,
        dur: new Date().getTime() - (msg.number as number),
      });
    });
  }

  ngOnDestroy(): void {
    if (this.msg$) {
      this.msg$.unsubscribe();
    }
  }

  ping() {
    // const start = new Date().getTime();
    this.http.get<Message>('/app/ping').subscribe((msg) => {
      msg.dur = new Date().getTime() - start;
      msg.type = 'http';
      this.msgs.unshift(msg);
    });
    const start = new Date().getTime();
    this.app.send({ number: start });
  }

  color(dur: number) {
    if (dur < 10) {
      return 'success';
    }

    if (dur < 20) {
      return 'secondary';
    }

    if (dur < 30) {
      return 'tertiary';
    }

    if (dur < 40) {
      return 'warning';
    }

    return 'danger';
  }
}
