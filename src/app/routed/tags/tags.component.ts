import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { IndexApiService } from 'src/app/shared/service/index.api.service';
import { SeoService } from 'src/app/shared/service/seo.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags = new Array(3)
  
  private selectedTag: string = this.route.snapshot.paramMap.get('tag') ?? ''

  private subscription = new Subscription()

  constructor(
    private indexApi: IndexApiService,
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
    this.seo.update(`${this.selectedTag} の記事一覧`, `${this.selectedTag} のタグがついた記事一覧`)
    this.indexApi.getTags().subscribe(data => {
      this.tags = data.tags
    })
  }

  get description (): string {
    return `Tagged with ${this.selectedTag}`
  }
}
