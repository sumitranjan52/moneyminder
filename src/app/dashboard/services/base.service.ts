import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ResponseObject } from './../../modals/responseObject';
import { Group } from './../../modals/group';
import { Item } from './../../modals/item';
import { Category } from './../../modals/category';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class BaseService {

  constructor(private http: HttpClient, private url: string) { }

  getHttp(): HttpClient {
    return this.http;
  }

  getUrl(): string {
    return this.url;
  }

  create(data: Item | Group | Category): Observable<Item | Group | Category | ResponseObject> {
    return this.http.post<Item | Group | Category | ResponseObject>(this.url, data, {
      headers: {
        "Authorization": "Bearer icKwDYGcYCapHXyBntvc2-efcSg"
      }
    }).pipe();
  }

  update(data: Item | Group | Category): Observable<Item | Group | Category | ResponseObject> {
    return null;
  }

  delete(id: number): Observable<ResponseObject> {
    return null;
  }

  get(id: number): Observable<Item | Group | Category | ResponseObject> {
    return this.http.get<Item | Group | Category | ResponseObject>(this.url+id, {
      headers: {
        "Authorization": "Bearer icKwDYGcYCapHXyBntvc2-efcSg"
      }
    }).pipe();
  }

  getAll(): Observable<Item[] | Group[] | Category[] | ResponseObject> {
    return this.http.get<Item[] | Group[] | Category[] | ResponseObject>(this.url, {
      headers: {
        "Authorization": "Bearer icKwDYGcYCapHXyBntvc2-efcSg"
      }
    }).pipe();
  }

  search(data: Item | Group | Category): Observable<Item[] | Group[] | Category[] | ResponseObject> {
    return null;
  }

}
