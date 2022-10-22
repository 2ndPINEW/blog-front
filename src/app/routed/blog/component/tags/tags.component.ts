import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  private _tags: string[] | undefined

  @Input()
  set tags (v: string[] | undefined) {
    this._tags = v
  }

  get tags (): string[] | undefined {
    return this._tags || new Array(3)
  }
}
