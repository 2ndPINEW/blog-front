import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitchService {
  constructor () {}
  init (): void {
    const today = new Date()

    const isHalloween = today.getDate() >= 24 && today.getMonth() === 9

    if (isHalloween) {
      document.body.classList.add('halloween')
    }
  }
}

export function ThemeSwitchServiceInit (themeSwitchService: ThemeSwitchService): void {
  themeSwitchService.init()
}