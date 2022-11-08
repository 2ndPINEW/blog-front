import { Component, Input, OnInit } from '@angular/core';

// https://amateur-engineer.com/css-leaf/
@Component({
  selector: 'app-leaf',
  templateUrl: './leaf.component.html',
  styleUrls: ['./leaf.component.scss']
})
export class LeafComponent {
  @Input() colors: string[] = [
    '#47ff76',
    '#ffbf00',
    '#009926',
    '#c2704e',
    '#47ff76',
    '#ffbf00',
    '#009926',
    '#c2704e',
  ]
}
