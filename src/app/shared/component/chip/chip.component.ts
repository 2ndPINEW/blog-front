import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent {
  @Input()
  label!: string

  @Input()
  link: string | undefined

  @Input()
  selected: boolean = true

  @Output()
  selectedChange = new EventEmitter<boolean>()

  onClick (): void {
    this.selected = !this.selected
    this.selectedChange.emit(this.selected)
  }
}
