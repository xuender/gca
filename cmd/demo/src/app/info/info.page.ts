import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NetService } from '../api/net.service';
import { Value } from './value';
import { filter, isString } from 'lodash';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {
  query = '';
  private _infos: Value[] = [];
  constructor(private http: HttpClient, private net: NetService) {}

  get infos() {
    if (this.query) {
      const query = this.query.toLowerCase();

      return filter(this._infos, (value) => {
        if (value.key && value.key.toLowerCase().includes(query)) {
          return true;
        }

        if (
          isString(value.value) &&
          value.value.toLowerCase().includes(query)
        ) {
          return true;
        }

        return false;
      });
    }

    return this._infos;
  }

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
      this._infos = ret;
    });
  }
}
