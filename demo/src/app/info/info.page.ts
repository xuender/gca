import { Component, OnDestroy, OnInit } from '@angular/core';
import { isString, filter as lfilter } from 'lodash';
import { Subscription, filter } from 'rxjs';

import { pb } from 'src/pb';
import { AppService } from '../api/app.service';
import { Value } from './value';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit, OnDestroy {
  query = '';
  private _infos: Value[] = [];
  private msg$?: Subscription;
  constructor(private app: AppService) {}

  ngOnDestroy(): void {
    if (this.msg$) {
      this.msg$.unsubscribe();
    }
  }

  get infos() {
    if (this.query) {
      const query = this.query.toLowerCase();

      return lfilter(this._infos, (value) => {
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
    // this.app.copy(`${value}`);
  }

  ngOnInit() {
    this.msg$ = this.app.onMsg$
      .pipe(filter((m) => m.type == pb.Type.info))
      .subscribe((msg) => {
        this._infos = [];

        for (let key in msg.info) {
          this._infos.push({ key, value: msg.info[key] });
        }
      });

    this.app.send({ type: pb.Type.info });
  }
}
