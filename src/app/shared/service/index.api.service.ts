import { Injectable } from "@angular/core";
import { ApiService } from "src/app/shared/service/api.service";
import { Observable, of, tap } from "rxjs";
import { BlogListData, TagList } from "src/app/shared/service/blog.interface";

@Injectable({
  providedIn: 'root'
})
export class IndexApiService {
  constructor (
    private api: ApiService
  ) {}

  private memoryCache: { data: BlogListData, page: number }[] = []

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

  getTags (): Observable<TagList> {
    return this.api.get<TagList>('tags.json')
  }
}