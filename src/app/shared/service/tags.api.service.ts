import { Observable, of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BlogListData, TagList } from './blog.interface';


@Injectable({
  providedIn: 'root'
})
export class TagsApiService {
  private tagsCache: TagList | undefined
  private listCache: { data: BlogListData, tag: string }[] = []
  private listPendingSubscription: { tag: string, subscription: Observable<BlogListData> }[] = []

  constructor(
    private api: ApiService
  ) { }


  getListFromTag(tag: string): Observable<BlogListData> {
    const cache = this.listCache.find(cache => cache.tag === tag)
    if (cache) {
      return of(cache.data)
    }

    const pending = this.listPendingSubscription.find(pending => pending.tag === tag)
    if (pending) {
      return pending.subscription
    }

    const pendingComplete$ = new Subject<BlogListData>()

    const subscription = this.api.get<BlogListData>(`search/tags/${tag}`).pipe(
      tap(data => {
        this.listCache.push({ tag, data })

        pendingComplete$.next(data)
        this.listPendingSubscription = this.listPendingSubscription.filter(complete => {
          return complete.tag === tag
        })
        pendingComplete$.complete()
      })
    )


    this.listPendingSubscription.push({ tag, subscription: pendingComplete$ })

    return subscription
  }

  getTags(): Observable<TagList> {
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
