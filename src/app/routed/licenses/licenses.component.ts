import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { SeoService } from 'src/app/shared/service/seo.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.scss']
})
export class LicensesComponent implements OnInit {
  license$!: Observable<string>

  constructor(
    private http: HttpClient,
    private seo: SeoService
  ) { }

  ngOnInit(): void {
    this.seo.update('ライセンス', '3rdpartylicense')
    if (environment.production) {
      this.license$ = this.http.get('/3rdpartylicenses.txt', { responseType: 'text' })
    } else {
      this.license$ = of('license')
    }
  }
}
