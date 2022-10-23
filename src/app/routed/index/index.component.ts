import { Component, OnInit } from '@angular/core';

import { IndexApiService } from '../../shared/service/index.api.service';
import { MetaData } from '../../shared/service/blog.interface'
import { SeoService } from 'src/app/shared/service/seo.service';
import { TagsApiService } from 'src/app/shared/service/tags.api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  // 本来は1から、0はページングしない全部含んだリスト
  // 記事が増えてきたら考える
  page = 0

  contents: MetaData[] = new Array(10)
  tags: string[] = new Array(3)

  constructor(
    private api: IndexApiService,
    private tagsApi: TagsApiService,
    private seo: SeoService
  ) { }

  ngOnInit(): void {
    this.seo.update('ブログ', '日報とか学んだこととかメモするブログ')

    this.api.getList(this.page).subscribe(v => {
      this.contents = v.contents
    })
    this.tagsApi.getTags().subscribe(v => {
      this.tags = v.tags
    })
  }
}
