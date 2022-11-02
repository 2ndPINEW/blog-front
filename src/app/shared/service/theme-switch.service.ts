import { Injectable } from "@angular/core";

export type Theme = 'none' | 'halloween' | 'xmas'

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

    const isXmas = today.getMonth() === 11 && 18 <= today.getDate() && today.getDate() <= 25
    if (isXmas) {
      this.theme = 'xmas'
      document.body.classList.add('xmas')
    }
  }

  /** ヘッダーのアイコン */
  get headerIcon (): string | undefined {
    switch (this.theme) {
      case 'halloween':
        return '/assets/images/halloween/halloween_text_e.png'
      case 'xmas':
        return `/assets/images/xmas/logo.png`
      default:
        return undefined
    }
  }

  /** 記事カードのサムネイル */
  get blogCardThumbnail (): string | undefined {
    switch (this.theme) {
      case 'halloween':
        return '/assets/images/service/logo_s.png'
      case 'xmas':
        const index = Math.floor(Math.random() * 3) + 1
        return `/assets/images/xmas/icons/${index}.png`
      default:
        return undefined
    }
  }

  /** 目次の読み終わったマーク */
  get tocCompleteMark (): string {
    switch (this.theme) {
      case 'none':
        return '/assets/images/service/logo_s.png'
      case 'halloween':
        return '/assets/images/halloween/halloween_mark_majo.png'
      case 'xmas':
        return '/assets/images/xmas/icons/2.png'
      default:
        return '/assets/images/service/logo_s.png'
    }
  }
}

export function ThemeSwitchServiceInit (themeSwitchService: ThemeSwitchService): void {
  themeSwitchService.init()
}