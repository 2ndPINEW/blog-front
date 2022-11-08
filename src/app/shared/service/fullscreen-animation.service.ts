import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class FullscreenAnimationService {
  isAnimationEnable: boolean = true

  constructor (
    private router: Router
  ) {}

  ngOnInit (): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.enableAnimation()
      }
    })
  }

  enableAnimation (): void {
    this.isAnimationEnable = true
  }

  disableAnimation (): void {
    this.isAnimationEnable = false
  }
}