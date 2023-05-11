import { Component, OnInit } from '@angular/core';
import { NetService } from '../api/net.service';
import { Message } from './message';

@Component({
  selector: 'app-ping',
  templateUrl: './ping.page.html',
  styleUrls: ['./ping.page.scss'],
})
export class PingPage implements OnInit {
  msgs: Message[] = [];
  constructor(private net: NetService) {}

  ping() {
    const start = new Date().getTime();
    this.net.ping().subscribe((msg) => {
      msg.difference = new Date().getTime() - start;
      this.msgs.unshift(msg);
    });
  }

  ngOnInit() {}
}
