import { ChangeDetectorRef, Component, ElementRef, Input, OnInit } from '@angular/core';
import { environment  } from 'src/environments/environment';
import { MediaQuery, ObserveResizeService } from 'angular-container-media-query'
import { MetaData } from '../../service/blog.interface';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent {
  @Input()
  data!: MetaData

  @MediaQuery('(min-width: 500px)') mediumLayout = false;
  @MediaQuery('(min-width: 880px)') largeLayout = false;

  constructor(
    resize: ObserveResizeService,
    elementRef: ElementRef,
    changeDetector: ChangeDetectorRef
  ) {
    resize.register(this, elementRef, changeDetector);
  }

  resourceUrl (path: string): string {
    return `${environment.apiUrl}${path}`
  }
}
