import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PingPage } from './ping.page';

const routes: Routes = [
  {
    path: '',
    component: PingPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PingPageRoutingModule {}
