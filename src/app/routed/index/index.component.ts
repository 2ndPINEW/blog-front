import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

import { BlogApiService } from '../../shared/service/blog.api.service';
import { IndexApiService } from '../../shared/service/index.api.service';
import { MetaData } from '../../shared/service/blog.interface'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  page = 1

  contents: MetaData[] = new Array(10)
  tags: string[] = new Array(3)

  constructor(
    private api: IndexApiService,
    private blogApi: BlogApiService,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle(environment.siteTitle)
    this.api.getList(this.page).subscribe(v => {
      this.contents = v.contents
    })
    this.api.getTags().subscribe(v => {
      this.tags = v.tags
    })
  }

  prefetch (path: string): void {
    this.blogApi.getBlogContent(path).subscribe(() => {})
  }
}
