import { Component } from '@angular/core';
import { ThemeSwitchService, switchableThemes, Theme } from 'src/app/shared/service/theme-switch.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  constructor(
    private themeService: ThemeSwitchService
  ) { }

  get themes (): { key: Theme, value: string }[] {
    return switchableThemes
  }

  switchTheme (theme: Theme): void {
    this.themeService.setDefaultTheme(theme)
  }
}
