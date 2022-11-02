import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  _tags: string[] | undefined = undefined

  @Input()
  set tags (v: string[] | undefined) {
    this._tags = v
  }

  get tags (): string[] {
    return this._tags ?? new Array(10)
  }

  @Output()
  selectedTags: string[] = []

  isSelected (tag: string): boolean {
    return this.selectedTags.some(selectedTag => selectedTag === tag)
  }
}
