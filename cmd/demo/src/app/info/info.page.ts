import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NetService } from '../api/net.service';
import { Value } from './value';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  infos: Value[] = [];
  constructor(private http: HttpClient, private net: NetService) {}

  copy(value: any) {
    this.net.copy(`${value}`);
  }

  ngOnInit() {
    this.http.get<any>('/api/info').subscribe((data) => {
      const ret: Value[] = [];

      for (const key in data) {
        ret.push({ key, value: data[key] });
      }

      console.log(ret);
      this.infos = ret;
    });
  }
}
