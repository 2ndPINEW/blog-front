import {
  Component,
  Input,
  NgZone,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from "@angular/core";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import hljs from "highlight.js";

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.scss"],
})
export class ArticleComponent implements OnChanges {
  @Input()
  stringHtml: string | undefined;

  html: SafeHtml | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private zone: NgZone,
    private renderer: Renderer2
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["stringHtml"]) {
      // TODO: 型をつける
      const currentValue = changes["stringHtml"].currentValue;
      this.html = this.sanitizer.bypassSecurityTrustHtml(currentValue);

      // NOTE: zoneでやりたいけど、動かないことがある
      window.setTimeout(() => {
        hljs.highlightAll();
        if (currentValue?.includes("twitter-tweet")) {
          this.loadTwitterWidget();
        }
      });
    }
  }

  private loadTwitterWidget(): void {
    const script = this.renderer.createElement("script") as HTMLScriptElement;
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    this.renderer.appendChild(document.body, script);
  }
}
