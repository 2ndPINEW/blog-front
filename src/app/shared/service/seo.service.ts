import { Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor (
    private title: Title,
    private meta: Meta
  ) {}

  update (title: string, description: string): void {
    this.title.setTitle(`${title} - ${environment.siteTitle}`)
    this.meta.removeTag('name=description')
    this.meta.addTag({
      name: 'description',
      content: description
    })
  }
}