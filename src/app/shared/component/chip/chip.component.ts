import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

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
  selected: boolean = false

  @Output()
  selectedChange = new EventEmitter<boolean>()

  constructor (
    private router: Router
  ) {}

  onClick (): void {
    this.selected = !this.selected
    this.selectedChange.emit(this.selected)
  }

  get routerLink (): string {
    return this.router.serializeUrl(
      this.router.createUrlTree(
        ['/tags', this.label]
      )
    )    
  }
}
