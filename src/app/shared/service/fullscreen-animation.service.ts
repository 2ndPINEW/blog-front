import { Injectable } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import confetti from "canvas-confetti";
import { BehaviorSubject, take, timer } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FullscreenAnimationService {
  isAnimationEnable$ = new BehaviorSubject<boolean>(true);

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.enableAnimation();
      }
    });
  }

  enableAnimation(): void {
    this.isAnimationEnable$.next(true);
  }

  disableAnimation(): void {
    this.isAnimationEnable$.next(false);
  }

  confetti() {
    confetti({
      particleCount: 200,
      spread: 120,
      angle: 60,
      origin: { x: 0, y: 1 },
      scalar: 1.5,
    });
    confetti({
      particleCount: 200,
      spread: 120,
      angle: 120,
      origin: { x: 1, y: 1 },
      scalar: 1.5,
    });
  }

  stars() {
    timer(400, 200)
      .pipe(take(4))
      .subscribe(() => {
        this.star(Math.random(), Math.random());
      });
  }

  star(x: number, y: number) {
    const defaults = {
      spread: 360, // 360度 ± 22.5度に出現
      ticks: 50,
      gravity: 0,
      startVelocity: 30,
      shapes: ["star"],
      origin: { x, y },
      colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
    };

    confetti({
      ...defaults,
      particleCount: 100,
      scalar: 1.2,
      shapes: ["star"],
    });

    confetti({
      ...defaults,
      particleCount: 100,
      scalar: 0.75,
      shapes: ["circle"],
    });
  }
}
