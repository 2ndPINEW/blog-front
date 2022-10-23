import { Injectable } from "@angular/core";

export type Theme = 'none' | 'halloween'

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitchService {
  theme: Theme = 'none'

  constructor () {}

  init (): void {
    const today = new Date()

    const isHalloween = today.getDate() >= 24 && today.getMonth() === 9

    if (isHalloween) {
      this.theme = 'halloween'
      document.body.classList.add('halloween')
    }
  }
}

export function ThemeSwitchServiceInit (themeSwitchService: ThemeSwitchService): void {
  themeSwitchService.init()
}