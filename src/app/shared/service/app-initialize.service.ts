import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AppInitializeService {
  constructor (
  ) {}

  init (): void {
    this.closeSplashScreen()
  }

  private closeSplashScreen (): void {
    const loadingScreen = document.querySelector('.app-loading')
    if (!loadingScreen) {
      return
    }
    loadingScreen.addEventListener('transitionend', () => {
      loadingScreen.remove()
    })
    loadingScreen.classList.add('loaded')
  }
}

export function AppInitializeServiceInit (appInitializeService: AppInitializeService): Function {
  return () => appInitializeService.init()
}