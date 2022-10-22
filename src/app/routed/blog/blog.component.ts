import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, fromEvent, merge, MonoTypeOperatorFunction, Observable, take, throttleTime } from 'rxjs';
import { BlogPageData } from 'src/app/shared/service/blog.interface';
import { BlogApiService } from '../../shared/service/blog.api.service';
import { SectionContent, HtmlHeadLevel } from './service/blog.interface';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private api: BlogApiService,
    private zone: NgZone
  ) { }

  path = this.route.snapshot.paramMap.get('path')
  data: BlogPageData | undefined

  indexLevels: HtmlHeadLevel[] = [1, 2, 3]
  readingSection: SectionContent | undefined = undefined

  ngOnInit(): void {
    if (!this.path) {
      return
    }
    this.api.getBlogContent(this.path).subscribe(data => {
      this.data = data
      this.zone.onMicrotaskEmpty.pipe(take(1)).subscribe(() => {
        this.makeSectionScrollPositionMap()
      })
    })
    fromEvent(window, 'scroll').pipe(throunceTime(100)).subscribe(() => {
      this.onScroll()
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
    const readingPosition = this.sectionPositionMap.find(v => v.position < nowPosition)
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