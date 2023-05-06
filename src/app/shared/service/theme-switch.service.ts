import { Injectable } from "@angular/core";

export interface ThemeConfig {
  theme: Theme;
  label: string;
  condition: (today: Date) => boolean;
}

export type Theme =
  | "none"
  | "halloween"
  | "xmas"
  | "spring"
  | "valentine"
  | "summer";

export const ThemeConfigs: ThemeConfig[] = [
  {
    theme: "none",
    label: "自動",
    condition: (_: Date) => {
      return false;
    },
  },
  {
    theme: "halloween",
    label: "ハロウィン",
    condition: (today: Date) => {
      return today.getDate() >= 24 && today.getMonth() === 9;
    },
  },
  {
    theme: "xmas",
    label: "クリスマス",
    condition: (today: Date) => {
      return (
        today.getMonth() === 11 &&
        18 <= today.getDate() &&
        today.getDate() <= 25
      );
    },
  },
  {
    theme: "valentine",
    label: "バレンタイン",
    condition: (today: Date) => {
      return today.getMonth() === 1 && today.getDate() === 14;
    },
  },
  {
    theme: "spring",
    label: "春",
    condition: (today: Date) => {
      return (
        today.getMonth() === 3 && today.getDate() >= 5 && today.getDate() <= 20
      );
    },
  },
  {
    theme: "summer",
    label: "夏",
    condition: (today: Date) => {
      return (
        today.getMonth() === 6 && today.getDate() >= 7 && today.getDate() <= 23
      );
    },
  },
];

@Injectable({
  providedIn: "root",
})
export class ThemeSwitchService {
  theme: Theme = "none";

  constructor() {}

  init(): void {
    const today = new Date();
    const forceUseTheme = sessionStorage.getItem("theme") ?? "none";

    document.body.className = "";
    this.theme = "none";

    const themeConfig =
      forceUseTheme !== "none"
        ? ThemeConfigs.find(
            (themeConfig) => themeConfig.theme === forceUseTheme
          )
        : ThemeConfigs.find((themeConfig) => themeConfig.condition(today));

    if (themeConfig) {
      this.theme = themeConfig.theme;
      document.body.classList.add(themeConfig.theme);
    }
  }

  setDefaultTheme(theme: Theme): void {
    window.sessionStorage.setItem("theme", theme);
    this.init();
  }

  /** ヘッダーのアイコン */
  get headerIcon(): string | undefined {
    switch (this.theme) {
      case "halloween":
        return "/assets/images/halloween/halloween_text_e.png";
      case "xmas":
        return `/assets/images/xmas/logo.png`;
      default:
        return undefined;
    }
  }

  /** 記事カードのサムネイル */
  get blogCardThumbnail(): string | undefined {
    switch (this.theme) {
      case "halloween":
        return "/assets/images/service/logo_s.png";
      case "xmas":
        const xmasIconIndex = Math.floor(Math.random() * 3) + 1;
        return `/assets/images/xmas/icons/${xmasIconIndex}.png`;
      case "spring":
        const springIconIndex = Math.floor(Math.random() * 3) + 1;
        return `/assets/images/spring/icons/${springIconIndex}.png`;
      case "summer":
        const summerIconIndex = Math.floor(Math.random() * 11) + 1;
        return `/assets/images/summer/icons/${summerIconIndex}.png`;
      case "valentine":
        const valentineIconIndex = Math.floor(Math.random() * 4) + 1;
        return `/assets/images/valentine/icons/${valentineIconIndex}.png`;
      default:
        return undefined;
    }
  }

  /** 目次の読み終わったマーク */
  get tocCompleteMark(): string {
    switch (this.theme) {
      case "none":
        return "/assets/images/service/logo_s.png";
      case "halloween":
        return "/assets/images/halloween/halloween_mark_majo.png";
      case "xmas":
        return "/assets/images/xmas/icons/2.png";
      default:
        return "/assets/images/service/logo_s.png";
    }
  }
}

export function ThemeSwitchServiceInit(
  themeSwitchService: ThemeSwitchService
): Function {
  return () => themeSwitchService.init();
}
