import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  ngOnInit (): void {
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
