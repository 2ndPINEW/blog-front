import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/service/api.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.getList().subscribe(v => {
      console.log(v)
    })
  }

  getList (): Observable<any> {
    return this.api.get('page-1.json')
  }
}
