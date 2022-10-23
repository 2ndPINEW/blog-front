import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiError, isApiError } from './api.interface';
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
  };

  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   */
  private handleError(error: any, operation: string = 'operation'): Observable<ApiError> {
    // TODO: リモート上のロギング基盤にエラーを送信する
    console.error('api_error_default', operation, error) // かわりにconsoleに出力

    const error_obj: ApiError = {
      error_code: 'N001',
      error_title: '通信エラーが発生しました',
      error_message: '通信環境をお確かめの上再度お試しください。'
    }

    // 空の結果を返して、アプリを持続可能にする
    return of(error_obj)
  }

  get<T>(path: string, options?: ApiOptions) {
    return this.http.get<T>(`${environment.apiUrl}${path}`, this.httpOptions)
      .pipe(
        map(v => (v as any).body)
      )
      .pipe(
        catchError(e => this.handleError(e, path))
      )
      // APIエラーが返ってきた時にタイトルが空白の場合はデフォルト文言を入れる
      .pipe(
        map(v => {
          if (isApiError(v)) {
            v['error_title'] = v.error_title ?? 'サーバーエラーが発生しました'
            v['error_message'] = v.error_message ?? 'しばらく待ってから再度お試しください。'
          }
          return v
        })
      ) as unknown as Observable<T>
  }
  
  post<T>(path: string, body: string, options?: ApiOptions) {
    return this.http.post<T>(`${environment.apiUrl}${path}`, body, this.httpOptions)
      .pipe(
        map(v => (v as any).body)
      )
      .pipe(
        catchError(e => this.handleError(e, path))
      )
      // APIエラーが返ってきた時にタイトルが空白の場合はデフォルト文言を入れる
      .pipe(
        map(v => {
          if (isApiError(v)) {
            v['error_title'] = v.error_title ?? 'サーバーエラーが発生しました'
            v['error_message'] = v.error_message ?? 'しばらく待ってから再度お試しください。'
          }
          return v
        })
      ) as unknown as Observable<T>
  }

  delete<T>(path: string, options?: ApiOptions) {
    return this.http.delete<T>(`${environment.apiUrl}${path}`, this.httpOptions)
      .pipe(
        map(v => (v as any).body)
      )
      .pipe(
        catchError(e => this.handleError(e, path))
      )
      // APIエラーが返ってきた時にタイトルが空白の場合はデフォルト文言を入れる
      .pipe(
        map(v => {
          if (isApiError(v)) {
            v['error_title'] = v.error_title ?? 'サーバーエラーが発生しました'
            v['error_message'] = v.error_message ?? 'しばらく待ってから再度お試しください。'
          }
          return v
        })
      ) as unknown as Observable<T>
  }
}
