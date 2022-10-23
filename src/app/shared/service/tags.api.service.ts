import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BlogListData, TagList } from './blog.interface';

export interface ApiOptions {
}

@Injectable({
  providedIn: 'root'
})
export class TagsApiService {
  private tagsCache: TagList | undefined
  private listCache: { data: BlogListData, tag: string }[] = []

  constructor(
    private api: ApiService
  ) { }


  getListFromTag (tag: string): Observable<BlogListData> {
    const cache = this.listCache.find(cache => cache.tag === tag)
    if (cache) {
      return of(cache.data)
    }

    return this.api.get<BlogListData>(`search/tags/${tag}`).pipe(
      tap(data => {
        this.listCache.push({ tag, data })
      })
    )
  }

  getTags (): Observable<TagList> {
    if (this.tagsCache) {
      return of(this.tagsCache)
    }
    return this.api.get<TagList>('tags.json').pipe(
      tap(data => {
        this.tagsCache = data
      })
    )
  }

}
