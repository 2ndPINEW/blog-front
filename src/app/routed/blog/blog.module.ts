import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { AppCommonModule } from 'src/app/shared/component/app-common.module';
import { ArticleComponent } from './component/article/article.component';
import { TagsComponent } from './component/tags/tags.component';

@NgModule({
  declarations: [
    BlogComponent,
    ArticleComponent,
    TagsComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    AppCommonModule
  ]
})
export class BlogModule { }
