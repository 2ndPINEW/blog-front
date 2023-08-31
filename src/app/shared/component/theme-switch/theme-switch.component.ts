import { Component } from "@angular/core";
import {
  Theme,
  ThemeConfig,
  ThemeSwitchService,
  ThemeConfigs,
} from "../../service/theme-switch.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-theme-switch",
  templateUrl: "./theme-switch.component.html",
  styleUrls: ["./theme-switch.component.scss"],
})
export class ThemeSwitchComponent {
  constructor(private themeService: ThemeSwitchService) {}

  get themes(): ThemeConfig[] {
    return ThemeConfigs;
  }

  get currentTheme$(): Observable<Theme> {
    return this.themeService.theme$;
  }

  switchTheme(theme: Theme): void {
    this.themeService.setDefaultTheme(theme);
  }
}
