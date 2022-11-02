import { Component, Input } from '@angular/core';
import { ThemeSwitchService } from '../../service/theme-switch.service';

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

  get themedIcon (): string | undefined {
    return this.themeService.headerIcon
  }
}
