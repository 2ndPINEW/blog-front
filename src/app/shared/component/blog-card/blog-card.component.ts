import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { environment } from "src/environments/environment";
import { MetaData } from "../../service/blog.interface";
import { BlogApiService } from "../../service/blog.api.service";
import { ThemeSwitchService } from "../../service/theme-switch.service";
import { LazyModulePreloadService } from "../../service/lazy-module-preload.service";
import { BrowserSupportService } from "../../service/browser-support.service";
import { match } from "css-mediaquery";
import {
  combineLatest,
  fromEvent,
  map,
  Observable,
  of,
  Subscription,
} from "rxjs";

@Component({
  selector: "app-blog-card",
  templateUrl: "./blog-card.component.html",
  styleUrls: ["./blog-card.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogCardComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  data: MetaData | undefined;

  private themedThumbnail$ = this.themeService.blogCardThumbnail$;

  private subscription = new Subscription();

  constructor(
    private cdRef: ChangeDetectorRef,
    private elementRef: ElementRef,
    private blogApi: BlogApiService,
    private themeService: ThemeSwitchService,
    private modulePreload: LazyModulePreloadService,
    private browserSupport: BrowserSupportService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      fromEvent(window, "resize").subscribe(() => {
        this.cdRef.detectChanges();
      })
    );
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry: any) => {
        if (!entry.isIntersecting) return;
        if (this.data?.path) {
          this.prefetch(this.data?.path);
          observer.unobserve(this.elementRef.nativeElement);
        }
      });
    });
    observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  resourceUrl$(path: string): Observable<string> {
    const fullPath = this.browserSupport.isSupportWebp
      ? `${environment.apiUrl}${path.split(".")[0]}.webp`
      : `${environment.apiUrl}${path}`;

    return combineLatest([this.themedThumbnail$, of(fullPath)]).pipe(
      map(([val1, val2]) => val1 ?? val2)
    );
  }

  prefetch(path: string): void {
    this.modulePreload.prefetchStart("blog");
    this.blogApi.getBlogContent(path).subscribe();
  }

  get mediumLayout(): boolean {
    return match("(min-width: 500px)", {
      width: `${(this.elementRef.nativeElement as HTMLElement).clientWidth}px`,
    });
  }
  get largeLayout(): boolean {
    return match("(min-width: 880px)", {
      width: `${(this.elementRef.nativeElement as HTMLElement).clientWidth}px`,
    });
  }
}
