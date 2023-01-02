import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicensesRoutingModule } from './licenses-routing.module';
import { LicensesComponent } from './licenses.component';
import { AppCommonModule } from 'src/app/shared/component/app-common.module';


@NgModule({
  declarations: [
    LicensesComponent
  ],
  imports: [
    CommonModule,
    LicensesRoutingModule,
    AppCommonModule
  ]
})
export class LicensesModule { }
