import { Component } from '@angular/core';
import { ThemeSwitchService, Theme, ThemeConfigs, ThemeConfig } from 'src/app/shared/service/theme-switch.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  constructor(
    private themeService: ThemeSwitchService
  ) { }

  get themes (): ThemeConfig[] {
    return ThemeConfigs
  }

  switchTheme (theme: Theme): void {
    this.themeService.setDefaultTheme(theme)
  }
}
