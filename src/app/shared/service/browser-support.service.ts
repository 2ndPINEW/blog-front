import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BrowserSupportService {
  constructor () {}

  isSupportWebp = true

  init (): void {
    this.checkSupportWebp()
  }

  private checkSupportWebp() {
    var img = new Image()
    img.onload = () => {
      this.isSupportWebp = true
    }
    img.onerror = () => {
      this.isSupportWebp = false
    }
    img.src = 'data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA=='
  }
}

export function BrowserSupportServiceInit (browserSupportService: BrowserSupportService): Function {
  return () => browserSupportService.init()
}