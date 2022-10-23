import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  @Input()
  tags!: string[]

  @Output()
  selectedTags: string[] = []

  isSelected (tag: string): boolean {
    return this.selectedTags.some(selectedTag => selectedTag === tag)
  }
}
