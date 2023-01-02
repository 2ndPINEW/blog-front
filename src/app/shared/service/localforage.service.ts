import { Injectable } from '@angular/core';
import * as localforage from 'localforage';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalforageService {
  constructor() {
    localforage.config({
      name: 'obake.land'
    });
  }

  get <T> (key: string): Observable<T> {
    return from(localforage.getItem(key)) as Observable<T>
  }

  set (key: string, value: any) {
    return from(localforage.setItem(key, value))
  }

  remove (key: string) {
    return from(localforage.removeItem(key))
  }

  DELETE_ALL () {
    return from(localforage.clear())
  }

  listKeys () {
    return from(localforage.keys())
  }
}