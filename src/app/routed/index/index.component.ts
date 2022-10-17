import { Component, OnInit } from '@angular/core';
import { IndexApiService } from './service/index.api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  page = 1

  contents!: any

  constructor(
    private api: IndexApiService
  ) { }

  ngOnInit(): void {
    this.api.getList(this.page).subscribe(v => {
      console.log(v.contents)
      this.contents = v.contents
    })
  }
}
