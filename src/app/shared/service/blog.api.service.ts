import { Injectable } from "@angular/core";
import { ApiService } from "src/app/shared/service/api.service";
import { Observable, of, Subject, tap } from "rxjs";
import { BlogPageData } from "./blog.interface";

@Injectable({
  providedIn: 'root'
})
export class BlogApiService {
  constructor (
    private api: ApiService
  ) {}

  private memoryCache: { data: BlogPageData, fileName: string }[] = []
  private pendingSubscription: { fileName: string, subscription: Observable<BlogPageData> }[] = [] 

  /**
   * ブログ記事を取得する
   * キャッシュとか別の箇所から同一APIを叩いていた場合はいい感じにしてくれるので、何も気にせずに叩きまくって良い
   */
  getBlogContent (fileName: string): Observable<BlogPageData> {
    // キャッシュがある場合はそこから返す
    const cache = this.memoryCache.find(cache => cache.fileName === fileName)
    if (cache) {
      return of(cache.data)
    }

    // 既に同じパスへのリクエストが走っている場合は、そのリクエストが完了したときのサブジェクトを返す
    const pending = this.pendingSubscription.find(pending => pending.fileName === fileName)
    if (pending) {
      return pending.subscription
    }

    // ペンディング中に同時にAPIを叩こうとした場所から呼ぶサブジェクト
    const pendingComplete$ = new Subject<BlogPageData>()

    // リクエスト本体
    const subscription = this.api.get<BlogPageData>(`${fileName}.json`).pipe(
      tap(data => {
        // メモリー上にキャッシュを作る
        this.memoryCache.push({ fileName, data })
        // ペンディングを待機していた別のサブスクライバーに値を返してコンプリートする
        pendingComplete$.next(data)
        // ペンシング中のサブスクリプションの一覧から削除する
        this.pendingSubscription = this.pendingSubscription.filter(complete => {
          return complete.fileName === fileName
        })
        pendingComplete$.complete()
      })
    )

    // リクエスト本体をペンディング中のサブスクリプション一覧にプッシュする
    this.pendingSubscription.push({ fileName, subscription: pendingComplete$ })

    return subscription
  }
}