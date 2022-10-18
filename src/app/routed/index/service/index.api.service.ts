import { Injectable } from "@angular/core";
import { ApiService } from "src/app/shared/service/api.service";
import { BlogListData } from "src/app/routed/index/service/index.interface";
import { Observable } from "rxjs";

@Injectable()
export class IndexApiService {
  constructor (
    private api: ApiService
  ) {}

  getList (page: number): Observable<BlogListData> {
    return this.api.get(`page-${page}.json`)
  }
}