import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { debounceTime, fromEvent, merge, MonoTypeOperatorFunction, Observable, Subscription, take, throttleTime } from 'rxjs';
import { ApiError } from 'src/app/shared/service/api.interface';

import { BlogPageData, MetaData } from 'src/app/shared/service/blog.interface';
import { FullscreenAnimationService } from 'src/app/shared/service/fullscreen-animation.service';
import { SeoService } from 'src/app/shared/service/seo.service';
import { BlogApiService } from '../../shared/service/blog.api.service';
import { IndexApiService } from '../../shared/service/index.api.service';
import { SectionContent, HtmlHeadLevel } from './service/blog.interface';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, OnDestroy {
  @ViewChild('endOfArticle') endOfArticleElementRef!: ElementRef<HTMLDivElement>

  constructor(
    private route: ActivatedRoute,
    private blogApi: BlogApiService,
    private zone: NgZone,
    private indexApi: IndexApiService,
    private router: Router,
    private seo: SeoService,
    private animationService: FullscreenAnimationService
  ) { }

  path = this.route.snapshot.paramMap.get('path')
  data: BlogPageData | undefined

  indexLevels: HtmlHeadLevel[] = [1, 2, 3]
  readingSection: SectionContent | undefined = undefined

  recommends: MetaData[] = []

  complete: boolean = false

  private subscription = new Subscription()

  ngOnInit(): void {
    this.init()

    this.subscription.add(
      this.route.paramMap.subscribe(param => {
        this.path = param.get('path')
      })
    )
    this.subscription.add(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.init()
        }
      })
    )
    this.subscription.add(
      fromEvent(window, 'scroll').pipe(throunceTime(100)).subscribe(() => {
        this.onScroll()
      })
    )
  }

  ngOnDestroy (): void {
    this.subscription.unsubscribe()
  }

  private init (): void {
    this.animationService.disableAnimation()
    this.data = undefined
    this.recommends = []
    if (!this.path) {
      this.seo.update('お探しの記事が見つかりません', 'お探しの記事が見つかりません')
      return
    }
    this.blogApi.getBlogContent(this.path, true).subscribe(data => {
      this.data = data
      if (data?.metaData?.title && data?.metaData?.description && this.path) {
        this.seo.update(data?.metaData?.title, data?.metaData?.description)
      }
      this.zone.onMicrotaskEmpty.pipe(take(1)).subscribe(() => {
        this.makeSectionScrollPositionMap()
      })
      this.indexApi.getList(1).subscribe(data => {
        this.recommends =
          [...data.contents]
            .sort(() => (Math.random() < 0.5) ? -1 : 1)
            .filter(content => content.path !== this.path)
            .slice(-3)
      })
    }, (e: ApiError) => {
      this.data = {
        html: '',
        metaData: {
          date: e.error_code === 404 ? '指定した記事が見つかりません' : '通信エラーが発生しました',
          description: '',
          icon: '',
          tags: [],
          title: e.error_title ?? '通信エラー',
          path: ''
        }
      }
    })
  }

  // Dom生成時にセクションごとの座標を保持しておく
  private sectionPositionMap: SectionPositionMap[]  = []

  private makeSectionScrollPositionMap (): void {
    const regexp = `H(${this.indexLevels.join('|')})`
    const allDom = document.querySelectorAll('*')
    const allHeadDom = Array.prototype.filter.call(allDom, (dom: HTMLElement) => (new RegExp(regexp)).test(dom.tagName))
    allHeadDom.forEach((head: HTMLElement) => {
      const level = Number(head.tagName.slice(-1)) as HtmlHeadLevel
      const position = head.offsetTop - 1
      const text = head.innerHTML
      this.sectionPositionMap.push({
        level, position, text
      })
    })
    this.sectionPositionMap.reverse()
  }

  // スクロールした時に、読んでいるセクションをセットする
  private onScroll (): void {
    const nowPosition = window.scrollY
    const readLineHeight = window.innerHeight * 0.3
    if (this.endOfArticleElementRef.nativeElement.offsetTop - readLineHeight < nowPosition) {
      this.complete = true
      this.animationService.enableAnimation()
    } else {
      this.complete = false
    }
    const readingPosition = this.sectionPositionMap.find(v => v.position - readLineHeight < nowPosition)
    if (readingPosition) {
      this.readingSection = {
        level: readingPosition.level,
        text: readingPosition.text
      }
    } else if (this.sectionPositionMap.length > 0) {
      const topSection = this.sectionPositionMap.slice(-1)[0]
      this.readingSection = {
        level: topSection.level,
        text: topSection.text
      }
    }
  }

  // 指定したセクションまでスクロルする
  scrollIntoView (section: SectionContent): void {
    // TODO: ViewChild とか使ってエレメント探すようにする
    const sectionElements = document.querySelectorAll(`h${section.level}`)
    sectionElements.forEach(sectionElement => {
      if (sectionElement.innerHTML === section.text) {
        sectionElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
      }
    })
  }
}

type SectionPositionMap = SectionContent & {
  position: number
}

// https://stackoverflow.com/questions/52038067/rxjs-throttletime-plus-last-value
function throunceTime<T>(duration: number): MonoTypeOperatorFunction<T> {
  return (source: Observable<T>) =>
    merge(source.pipe(throttleTime(duration)), source.pipe(debounceTime(duration)))
      .pipe(throttleTime(0, undefined, { leading: true, trailing: false }));
}