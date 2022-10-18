import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BlogCardComponent } from './blog-card/blog-card.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BlogCardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    BlogCardComponent
  ]
})
export class AppCommonModule { }
