import { Component, Input, OnInit } from '@angular/core';
import { IndexData } from 'src/app/routed/index/service/index.interface';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.scss']
})
export class BlogCardComponent implements OnInit {
  @Input()
  data!: IndexData

  constructor() { }

  ngOnInit(): void {
  }

}
