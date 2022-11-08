import { Component, OnInit } from '@angular/core';
import { ThemeSwitchService } from '../../service/theme-switch.service';

@Component({
  selector: 'app-fullscreen-animation',
  templateUrl: './fullscreen-animation.component.html',
  styleUrls: ['./fullscreen-animation.component.scss']
})
export class FullscreenAnimationComponent {

  constructor(
    private themeService: ThemeSwitchService
  ) { }

  get leafColors (): string[] | undefined {
    if (this.themeService.theme === 'spring') {
      return [
        '#F1CFE7',
        '#F2AFBE',
        '#F25DBE',
        '#FFC6E8',
        '#F1CFE7',
        '#F1CFE7',
        '#F25DBE',
        '#F1CFE7',
        '#F1CFE7',
      ]
    }
    return undefined
  }
}
