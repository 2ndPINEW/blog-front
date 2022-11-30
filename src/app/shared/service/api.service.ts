import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isApiError } from './api.interface';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface ApiOptions {
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient
  ) { }

  private httpOptions: any = {
    // ヘッダ情報
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    //
    // レスポンスにヘッダ情報を入れるための設定
    // https://angular.io/guide/http#reading-the-full-response
    //
    observe: 'response',  // ⇐ これを追加
    //
    // DELETE 実行時に `body` が必要になるケースがあるのでプロパティとして用意しておく
    // ( ここで用意しなくても追加できるけど... )
    body: null
  }

  get<T>(path: string, options?: ApiOptions) {
    return this.http.get<T>(`${environment.apiUrl}${path}`, this.httpOptions)
      .pipe(
        map(v => (v as any).body)
      )
      .pipe(
        catchError(e => {
          return of({
            error_code: e.status,
            error_title: e.statusText,
          })
        })
      )
      .pipe(
        tap(v => {
          if (isApiError(v)) {
            throw v
          }
        })
      ) as unknown as Observable<T>
  }
}
