import { Component } from '@angular/core';
import { NetService } from './api/net.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  appPages = [
    { title: '系统信息', url: '/info', icon: 'information-circle' },
    { title: '支持图标', url: '/icons', icon: 'apps' },
    { title: '服务检查', url: '/ping', icon: 'planet' },
  ];
  browser = [
    'Chrome',
    'Chromium',
    'Edge',
    'Brave',
    'QQ浏览器',
    '360急速',
    '360安全',
  ];
  constructor(public net: NetService) {}
}
