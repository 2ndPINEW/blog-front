import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AppInitializeService {
  constructor (
  ) {}

  init (): void {
    console.log('Application init')
    const loadingScreen = document.querySelector('.app-loading')
    if (!loadingScreen) {
      console.error('loading element not found')
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