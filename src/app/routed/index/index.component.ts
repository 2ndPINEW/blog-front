import { Component, OnInit } from '@angular/core';
import { BlogApiService } from '../../shared/service/blog.api.service';
import { IndexApiService } from './service/index.api.service';
import { MetaData } from '../../shared/service/blog.interface'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  page = 1

  contents: MetaData[] = new Array(10)

  constructor(
    private api: IndexApiService,
    private blogApi: BlogApiService
  ) { }

  ngOnInit(): void {
    this.api.getList(this.page).subscribe(v => {
      this.contents = v.contents
    })
  }

  prefetch (path: string): void {
    this.blogApi.getBlogContent(path).subscribe(() => {})
  }
}
