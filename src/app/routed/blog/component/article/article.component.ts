import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
    private sanitizer: DomSanitizer
  ) {}

  ngOnChanges (changes: SimpleChanges): void {
    if (changes['stringHtml']) {
      const currentValue = changes['stringHtml'].currentValue
      this.html = this.sanitizer.bypassSecurityTrustHtml(currentValue)
    }
  }
}
