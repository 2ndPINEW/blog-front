import { Injectable } from "@angular/core";
import { ApiService } from "src/app/shared/service/api.service";
import { BlogListData } from "src/app/routed/index/service/index.interface";
import { Observable, of, tap } from "rxjs";

@Injectable()
export class IndexApiService {
  constructor (
    private api: ApiService
  ) {}

  memoryCache: { data: BlogListData, page: number }[] = []

  getList (page: number): Observable<BlogListData> {
    const cache = this.memoryCache.find(cache => cache.page === page)
    if (cache) {
      return of(cache.data)
    }

    return this.api.get<BlogListData>(`page-${page}.json`).pipe(
      tap(data => {
        this.memoryCache.push({ page, data })
      })
    )
  }
}