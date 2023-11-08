import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter } from 'rxjs';

import { pb } from 'src/pb';
import { AppService } from '../api/app.service';
import { Message } from './message';

@Component({
  selector: 'app-ping',
  templateUrl: './ping.page.html',
  styleUrls: ['./ping.page.scss'],
})
export class PingPage implements OnInit, OnDestroy {
  msgs: Message[] = [];
  private msg$?: Subscription;

  constructor(private app: AppService) {}

  ngOnInit() {
    this.msg$ = this.app.onMsg$
      .pipe(filter((m) => m.type == pb.Type.ping))
      .subscribe((msg) => {
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
    const number = new Date().getTime();
    this.app.send({ type: pb.Type.ping, number });
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
