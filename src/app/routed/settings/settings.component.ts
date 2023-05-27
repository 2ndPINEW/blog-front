import { Component } from '@angular/core';
import { MetaData } from 'src/app/shared/service/blog.interface';
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

  previewData: MetaData = {
    date: "9999/99/99",
    path: "/path",
    tags: [],
    icon: "/assets/test.png",
    title: "ブログカードプレビュー",
    description: "ブログカードプレビューを表示します。",
  }

  switchTheme (theme: Theme): void {
    this.themeService.setDefaultTheme(theme)
  }
}
