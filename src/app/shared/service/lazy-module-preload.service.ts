import {Injectable} from '@angular/core';
import {PreloadingStrategy, Route} from '@angular/router';
import {map, merge, Observable, of, Subject, tap, timer} from 'rxjs';

type ModulePath = 'blog' | 'tags' | 'settings'

@Injectable({
  providedIn: 'root'
})
export class LazyModulePreloadService implements PreloadingStrategy {
  private loadQue: {
    path: string
    onLoadRequestSubject: Subject<void>
  }[] = []

  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    if (!route.path) {
      console.warn('pathが存在しないルートのためプリフェッチできません')
      return of(null)
    }

    const onLoadRequestSubject = new Subject<void>()
    this.loadQue.push({
      path: route.path,
      onLoadRequestSubject: onLoadRequestSubject
    })

    return merge(
      onLoadRequestSubject,
      timer(3000)
    ).pipe(
      tap(() => {
        this.loadQue = this.loadQue.filter(que => que.path !== route.path)
      }),
      map(() => {
        return fn()
      })
    )
  }

  prefetchStart (path: ModulePath): void {
    const que = this.loadQue.find(que => que.path === path)
    if (que) {
      que.onLoadRequestSubject.next()
      que.onLoadRequestSubject.complete()
    }
  }
}