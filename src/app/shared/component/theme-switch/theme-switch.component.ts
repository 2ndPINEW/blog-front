import { Component } from "@angular/core";
import {
  Theme,
  ThemeConfig,
  ThemeSwitchService,
  ThemeConfigs,
} from "../../service/theme-switch.service";

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

  switchTheme(theme: Theme): void {
    this.themeService.setDefaultTheme(theme);
  }
}
