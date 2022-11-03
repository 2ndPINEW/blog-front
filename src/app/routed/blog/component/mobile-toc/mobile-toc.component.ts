import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HtmlHeadLevel, SectionContent } from '../../service/blog.interface';

@Component({
  selector: 'app-mobile-toc',
  templateUrl: './mobile-toc.component.html',
  styleUrls: ['./mobile-toc.component.scss']
})
export class MobileTocComponent {
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

  isShowToc: boolean = false

  showToc (): void {
    this.isShowToc = true
  }

  hideToc (): void {
    this.isShowToc = false
  }

  onClickSection (section: SectionContent): void {
    this.hideToc()
    this.clickSection.emit(section)
  }
}
