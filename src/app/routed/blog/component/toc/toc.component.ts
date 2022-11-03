import { Component, ElementRef, EventEmitter, Input, Output, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { ThemeSwitchService } from 'src/app/shared/service/theme-switch.service';
import { SectionContent, HtmlHeadLevel } from '../../service/blog.interface';

@Component({
  selector: 'app-toc',
  templateUrl: './toc.component.html',
  styleUrls: ['./toc.component.scss']
})
export class TocComponent {
  @Input()
  stringHtml: string | undefined

  @Input()
  indexLevels!: HtmlHeadLevel[]

  @Input()
  readingSection: SectionContent | undefined

  @Input()
  complete: boolean = false

  @Output()
  clickSection = new EventEmitter<SectionContent>()

  toc: SectionContent[] = []

  @ViewChild('progressArea') progressAreaElementRef!: ElementRef<HTMLDivElement>
  @ViewChild('progressLine') progressLineElementRef!: ElementRef<HTMLDivElement>

  @ViewChildren('toc') tocElementRef!: QueryList<ElementRef<HTMLDivElement>>

  constructor (
    private themeService: ThemeSwitchService
  ) {}

  ngOnChanges (changes: SimpleChanges): void {
    if (changes['stringHtml']) {
      const currentValue = changes['stringHtml'].currentValue
      this.makeToc(currentValue)
    }

    // if (changes['complete'] && changes['complete'].previousValue === false) {
    //   // コンプリートした瞬間の処理
    // }
  }

  onClick (section: SectionContent): void {
    this.clickSection.emit(section)
  }

  makeToc (html: string): void {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, 'text/html')
    this.toc = []
    
    const regexp = `H(${this.indexLevels.join('|')})`
    const allDom = doc.querySelectorAll('*')
    const allHeadDom = Array.prototype.filter.call(allDom, (dom: Element) => (new RegExp(regexp)).test(dom.tagName))
    allHeadDom.forEach((head: Element) => {
      const level = Number(head.tagName.slice(-1)) as HtmlHeadLevel
      this.toc.push({
        level: level,
        text: head.innerHTML
      })
    })
  }

  get progressLineHeightPx (): string {
    return `${this.progressLineHeight}px`
  }

  private get progressLineHeight (): number {
    if (!this.readingSection) {
      return 8
    }

    if (this.complete) {
      return this.progressAreaElementRef.nativeElement.clientHeight
    }

    const parentOffset = this.progressAreaElementRef.nativeElement.offsetTop
    const readingHeadElement = this.tocElementRef.find(elementRef => elementRef.nativeElement.innerHTML === this.readingSection?.text)
    const top = readingHeadElement?.nativeElement.offsetTop
    const clientHeight = readingHeadElement?.nativeElement.clientHeight
    if (!top || !clientHeight) {
      return 8
    }
    const height = top - parentOffset + (clientHeight / 2)
    return height
  }

  get completeMark (): string {
    return this.themeService.tocCompleteMark
  }
}
