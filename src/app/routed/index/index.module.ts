import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { IndexApiService } from './service/index.api.service';
import { AppCommonModule } from 'src/app/shared/component/app-common.module';


@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    AppCommonModule
  ],
  providers: [
    IndexApiService
  ]
})
export class IndexModule { }
