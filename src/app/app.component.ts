import { Component, OnInit } from '@angular/core';
import { fromEvent, race, timer } from 'rxjs';

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
    // transitionendが発火しないことがたまにありそうなので、適当にタイムアウトする
    race(
      fromEvent(loadingScreen, 'transitionend'),
      timer(500)
    ).subscribe(() => {
      loadingScreen.remove()
    })
    loadingScreen.classList.add('loaded')
  }
}
