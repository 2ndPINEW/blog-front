import { Injectable } from "@angular/core";

// TODO: 型の定義が複数変更必要で微妙だから直す
export type Theme = 'none' | 'halloween' | 'xmas' | 'spring' | 'valentine'

interface ThemeConfig {
  theme: Theme
  condition: Function
}

export const switchableThemes: { key: Theme, value: string }[] = [
  {
    key: 'none',
    value: 'リセット(自動)'
  }, {
    key: 'halloween',
    value: 'ハロウィン'
  }, {
    key: 'xmas',
    value: 'クリスマス'
  }, {
    key: 'spring',
    value: '春'
  }
  , {
    key: 'valentine',
    value: 'バレンタイン'
  }
]

@Injectable({
  providedIn: 'root'
})
export class ThemeSwitchService {
  theme: Theme = 'none'

  constructor () {}

  init (): void {
    const today = new Date()
    const forceUseTheme = sessionStorage.getItem('theme') as Theme

    document.body.className = ''
    this.theme = 'none'

    const themeConfigs: ThemeConfig[] = [{
      theme: 'halloween',
      condition: () => {
        return today.getDate() >= 24 && today.getMonth() === 9
      }
    }, {
      theme: 'xmas',
      condition: () => {
        return today.getMonth() === 11 && 18 <= today.getDate() && today.getDate() <= 25
      }
    }, {
      theme: 'spring',
      condition: () => {
        return today.getMonth() === 3
      }
    }, {
      theme: 'valentine',
      condition: () => {
        return today.getMonth() === 1 && today.getDate() === 14
      }
    }]

    const themeConfig = themeConfigs.find(themeConfig => themeConfig.condition() || themeConfig.theme === forceUseTheme)
    if (themeConfig) {
      this.theme = themeConfig.theme
      document.body.classList.add(themeConfig.theme)
    }
  }

  setDefaultTheme (theme: Theme): void {
    if (theme === 'none') {
      window.sessionStorage.removeItem('theme')
    } else {
      window.sessionStorage.setItem('theme', theme)
    }
    this.init()
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

export function ThemeSwitchServiceInit (themeSwitchService: ThemeSwitchService): Function {
  return () => themeSwitchService.init()
}