import { Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor (
    private title: Title,
    private meta: Meta,
    private router: Router
  ) {}

  update (title: string, description: string, ogpKey: string): void {
    this.title.setTitle(`${title} - ${environment.siteTitle}`)
    this.meta.removeTag('name=description')
    this.meta.addTag({
      name: 'description',
      content: description
    })

    document.querySelectorAll('[property^=og]').forEach(meta => {
      if (meta instanceof HTMLMetaElement) {
        this.meta.removeTagElement(meta)
      }
    })
    this.meta.addTag({
      property: 'og:url',
      content: window.location.href
    })
    this.meta.addTag({
      property: "og:type",
      content: 'website'
    })
    this.meta.addTag({
      property: 'og:title',
      content: `${title} - ${environment.siteTitle}`
    })
    this.meta.addTag({
      property: 'og:description',
      content: description
    })
    this.meta.addTag({
      property: 'og:image',
      content: `${environment.apiUrl}${ogpKey}-og.png`
    })
    this.meta.addTag({
      property: 'og:image:width',
      content: '1200'
    })
    this.meta.addTag({
      property: 'og:image:height',
      content: '630'
    })


// <meta name=twitter:card content=summary>
// <meta name=twitter:site content=@whowatch>
// <meta name=twitter:title content="ふわっちランド ふわっちZOO">
// <meta name=twitter:description content="ふわっちランド ふわっちZOO 特設Webページ！">
// <meta name=twitter:image content=https://whowatch.tv/image/ogp-image.png>

    document.querySelectorAll('[name^=twitter]').forEach(meta => {
      if (meta instanceof HTMLMetaElement) {
        this.meta.removeTagElement(meta)
      }
    })
    this.meta.addTag({
      name: 'twitter:card',
      content: 'summary'
    })
    this.meta.addTag({
      name: 'twitter:site',
      content: '@2ndpinew'
    })
    this.meta.addTag({
      name: 'twitter:title',
      content: `${title} - ${environment.siteTitle}`
    })
    this.meta.addTag({
      name: 'twitter:description',
      content: description
    })
    this.meta.addTag({
      name: 'twitter:image',
      content: `${environment.apiUrl}${ogpKey}-og.png`
    })
  }
}