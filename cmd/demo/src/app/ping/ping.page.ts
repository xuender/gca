import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Message } from './message';

@Component({
  selector: 'app-ping',
  templateUrl: './ping.page.html',
  styleUrls: ['./ping.page.scss'],
})
export class PingPage {
  msgs: Message[] = [];
  constructor(private http: HttpClient) {}

  ping() {
    const start = new Date().getTime();
    this.http.get<Message>('/app/ping').subscribe((msg) => {
      msg.dur = new Date().getTime() - start;
      this.msgs.unshift(msg);
    });
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
