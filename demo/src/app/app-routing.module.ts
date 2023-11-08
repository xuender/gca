import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'info',
    pathMatch: 'full',
  },
  {
    path: 'ping',
    loadChildren: () =>
      import('./ping/ping.module').then((m) => m.PingPageModule),
  },
  {
    path: 'icons',
    loadChildren: () =>
      import('./icons/icons.module').then((m) => m.IconsPageModule),
  },
  {
    path: 'info',
    loadChildren: () =>
      import('./info/info.module').then((m) => m.InfoPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
