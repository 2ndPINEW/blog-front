import { Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";

@Injectable({
  providedIn: 'root'
})
export class AppInitializeService {
  constructor (
    private updates: SwUpdate
  ) {}

  init (): void {
    this.handleApplicationUnrecoverableState()
  }

  private handleApplicationUnrecoverableState (): void {
    this.updates.unrecoverable.subscribe(event => {
      console.error(event)
      document.location.reload()
    })
  }
}

export function AppInitializeServiceInit (appInitializeService: AppInitializeService): Function {
  return () => appInitializeService.init()
}