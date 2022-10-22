import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { AppCommonModule } from 'src/app/shared/component/app-common.module';
import { ArticleComponent } from './component/article/article.component';
import { TagsComponent } from './component/tags/tags.component';
import { TocComponent } from './component/toc/toc.component';

@NgModule({
  declarations: [
    BlogComponent,
    ArticleComponent,
    TagsComponent,
    TocComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    AppCommonModule
  ]
})
export class BlogModule { }
