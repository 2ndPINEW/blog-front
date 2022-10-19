import { Component, OnInit } from '@angular/core';
import { IndexApiService } from './service/index.api.service';
import { IndexData } from './service/index.interface';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  page = 1

  contents: IndexData[] = new Array(10)

  constructor(
    private api: IndexApiService
  ) { }

  ngOnInit(): void {
    this.api.getList(this.page).subscribe(v => {
      this.contents = v.contents
    })
  }
}
