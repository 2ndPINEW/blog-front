import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BlogCardComponent } from './blog-card/blog-card.component';
import { RouterModule } from '@angular/router';
import { ChipComponent } from './chip/chip.component';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    BlogCardComponent,
    ChipComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    BlogCardComponent,
    ChipComponent,
    SearchComponent
  ]
})
export class AppCommonModule { }
