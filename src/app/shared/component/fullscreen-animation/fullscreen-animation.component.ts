import { Component } from "@angular/core";
import { FullscreenAnimationService } from "../../service/fullscreen-animation.service";
import { ThemeSwitchService } from "../../service/theme-switch.service";
import { Observable, combineLatest, map } from "rxjs";

@Component({
  selector: "app-fullscreen-animation",
  templateUrl: "./fullscreen-animation.component.html",
  styleUrls: ["./fullscreen-animation.component.scss"],
})
export class FullscreenAnimationComponent {
  constructor(
    private themeService: ThemeSwitchService,
    private animationService: FullscreenAnimationService
  ) {}

  get leafColors$(): Observable<string[] | undefined> {
    return combineLatest([
      this.animationService.isAnimationEnable$,
      this.themeService.theme$,
    ]).pipe(
      map(([isAnimationEnable, theme]) => {
        if (!isAnimationEnable) {
          return undefined;
        }
        if (theme === "spring") {
          return [
            "#F1CFE7",
            "#F2AFBE",
            "#F25DBE",
            "#FFC6E8",
            "#F1CFE7",
            "#F1CFE7",
            "#F25DBE",
            "#F1CFE7",
            "#F1CFE7",
          ];
        }
        return undefined;
      })
    );
  }
}
