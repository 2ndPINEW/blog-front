import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnInit } from '@angular/core';
import { environment  } from 'src/environments/environment';
import { MediaQuery, ObserveResizeService } from 'angular-container-media-query'
import { MetaData } from '../../service/blog.interface';
import { BlogApiService } from '../../service/blog.api.service';
import { ThemeSwitchService } from '../../service/theme-switch.service';
import { LazyModulePreloadService } from '../../service/lazy-module-preload.service';
import { BrowserSupportService } from '../../service/browser-support.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogCardComponent {
  @Input()
  data!: MetaData

  @MediaQuery('(min-width: 500px)') mediumLayout = false;
  @MediaQuery('(min-width: 880px)') largeLayout = false;

  private themedThumbnail = this.themeService.blogCardThumbnail

  constructor(
    resize: ObserveResizeService,
    elementRef: ElementRef,
    changeDetector: ChangeDetectorRef,
    private blogApi: BlogApiService,
    private themeService: ThemeSwitchService,
    private modulePreload: LazyModulePreloadService,
    private browserSupport: BrowserSupportService
  ) {
    resize.register(this, elementRef, changeDetector);
  }

  resourceUrl (path: string): string {
    const fullPath = this.browserSupport.isSupportWebp ? `${environment.apiUrl}${path.split('.')[0]}.webp` : `${environment.apiUrl}${path}`
    return this.themedThumbnail ?? fullPath
  }

  prefetch (path: string): void {
    this.modulePreload.prefetchStart('blog')
    this.blogApi.getBlogContent(path).subscribe()
  }
}
