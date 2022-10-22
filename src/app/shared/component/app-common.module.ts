import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { RouterModule } from '@angular/router';
import { ChipComponent } from './chip/chip.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BlogCardComponent,
    ChipComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    BlogCardComponent,
    ChipComponent
  ]
})
export class AppCommonModule { }
