import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./routed/index/index.module').then(m => m.IndexModule) },
  { path: 'blog', loadChildren: () => import('./routed/blog/blog.module').then(m => m.BlogModule) },
  { path: 'tags', loadChildren: () => import('./routed/tags/tags.module').then(m => m.TagsModule) },
  { path: 'settings', loadChildren: () => import('./routed/settings/settings.module').then(m => m.SettingsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
