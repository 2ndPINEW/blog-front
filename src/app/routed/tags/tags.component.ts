import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiError } from 'src/app/shared/service/api.interface';
import { MetaData } from 'src/app/shared/service/blog.interface';

import { SeoService } from 'src/app/shared/service/seo.service';
import { TagsApiService } from 'src/app/shared/service/tags.api.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit, OnDestroy {
  tags!: string[]
  
  private selectedTag: string = this.route.snapshot.paramMap.get('tag') ?? ''

  private subscription = new Subscription()

  contents: MetaData[] = new Array(10)

  constructor(
    private tagsApi: TagsApiService,
    private route: ActivatedRoute,
    private router: Router,
    private seo: SeoService
  ) { }

  ngOnInit(): void {
    this.init()

    this.subscription.add(
      this.route.paramMap.subscribe(param => {
        this.selectedTag = param.get('tag') ?? ''
      })
    )
    this.subscription.add(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.init()
        }
      })
    )
  }

  ngOnDestroy (): void {
    this.subscription.unsubscribe()
  }

  private init (): void {
    if (!this.selectedTag) {
      return
    }
    this.seo.update(`${this.selectedTag} の記事一覧`, `${this.selectedTag} のタグがついた記事一覧`)
    this.tagsApi.getTags().subscribe(data => {
      this.tags = data.tags
    })
    this.tagsApi.getListFromTag(this.selectedTag).subscribe(
      {
        next: data => {
          this.contents = data.contents
        },
        error: (_: ApiError) => {
          this.contents = []
        }
      }
    )
  }

  get description (): string {
    return `Tagged with ${this.selectedTag}`
  }
}
