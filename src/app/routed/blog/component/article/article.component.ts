import { Component, Input, NgZone, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import hljs from 'highlight.js';
import { take } from 'rxjs';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnChanges {
  @Input()
  stringHtml: string | undefined

  html: SafeHtml | undefined

  constructor (
    private sanitizer: DomSanitizer,
    private zone: NgZone
  ) {}

  ngOnChanges (changes: SimpleChanges): void {
    if (changes['stringHtml']) {
      const currentValue = changes['stringHtml'].currentValue
      this.html = this.sanitizer.bypassSecurityTrustHtml(currentValue)

      this.zone.onMicrotaskEmpty.pipe(take(1)).subscribe(() => {
        hljs.highlightAll()
      })
      window.setTimeout(() => {
        hljs.highlightAll()
      })
    }
  }
}
