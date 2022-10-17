import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', loadChildren: () => import('./routed/index/index.module').then(m => m.IndexModule) }, { path: 'test', loadChildren: () => import('./routed/test/test.module').then(m => m.TestModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
