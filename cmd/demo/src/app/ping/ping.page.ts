import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Message } from './message';

@Component({
  selector: 'app-ping',
  templateUrl: './ping.page.html',
  styleUrls: ['./ping.page.scss'],
})
export class PingPage implements OnInit {
  msgs: Message[] = [];
  constructor(private http: HttpClient) {}

  ping() {
    const start = new Date().getTime();
    this.http.get<Message>('/app/ping').subscribe((msg) => {
      const dif = new Date().getTime() - start;
      msg.difference = `${dif < 10 ? '0' : ''}${dif}`;
      this.msgs.unshift(msg);
    });
  }

  ngOnInit() {}
}
