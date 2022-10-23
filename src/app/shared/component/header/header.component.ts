import { Component, Input } from '@angular/core';
import { Theme, ThemeSwitchService } from '../../service/theme-switch.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title: string | undefined
  @Input() description: string | undefined

  constructor (
    private themeService: ThemeSwitchService
  ) {}

  get theme (): Theme {
    return this.themeService.theme
  }
}
