import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LazyModulePreloadService } from './shared/service/lazy-module-preload.service';

// 遅延読み込みのモジュールを追加したときは以下も更新する
// src/app/shared/service/lazy-module-preload.service.ts
const routes: Routes = [
  { path: '', loadChildren: () => import('./routed/index/index.module').then(m => m.IndexModule) },
  { path: 'blog', loadChildren: () => import('./routed/blog/blog.module').then(m => m.BlogModule) },
  { path: 'tags', loadChildren: () => import('./routed/tags/tags.module').then(m => m.TagsModule) },
  { path: 'settings', loadChildren: () => import('./routed/settings/settings.module').then(m => m.SettingsModule) },
  { path: 'licenses', loadChildren: () => import('./routed/licenses/licenses.module').then(m => m.LicensesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: LazyModulePreloadService
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
