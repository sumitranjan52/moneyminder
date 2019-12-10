import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ResponseObject } from './../../modals/responseObject';
import { Group } from './../../modals/group';
import { Item } from './../../modals/item';
import { Category } from './../../modals/category';
import { Observable } from 'rxjs/internal/Observable';
import { SingletonService } from 'src/app/services/singleton.service';

@Injectable()
export class BaseService {

  constructor(private http: HttpClient, 
    private url: string,
    private singleton: SingletonService) { }

  getHttp(): HttpClient {
    return this.http;
  }

  getUrl(): string {
    return this.url;
  }

  getSingleton(): SingletonService {
    return this.singleton;
  }

  create(data: Item | Group | Category): Observable<Item | Group | Category | ResponseObject> {
    return this.http.post<Item | Group | Category | ResponseObject>(this.url, data, {
      headers: {
        "Authorization": "Bearer " + this.singleton.loginKey
      }
    }).pipe();
  }

  update(data: Item | Group | Category): Observable<Item | Group | Category | ResponseObject> {
    return this.http.put<Item | Group | Category | ResponseObject>(this.url, data, {
      headers: {
        "Authorization": "Bearer " + this.singleton.loginKey
      }
    }).pipe();
  }

  delete(id: number): Observable<ResponseObject> {
    return this.http.delete<ResponseObject>(this.url + id, {
      headers: {
        "Authorization": "Bearer " + this.singleton.loginKey
      }
    }).pipe();
  }

  get(id: number): Observable<Item | Group | Category | ResponseObject> {
    return this.http.get<Item | Group | Category | ResponseObject>(this.url + id, {
      headers: {
        "Authorization": "Bearer " + this.singleton.loginKey
      }
    }).pipe();
  }

  getAll(): Observable<Item[] | Group[] | Category[] | ResponseObject> {
    return this.http.get<Item[] | Group[] | Category[] | ResponseObject>(this.url, {
      headers: {
        "Authorization": "Bearer " + this.singleton.loginKey
      }
    }).pipe();
  }

  search(data: Item | Group | Category): Observable<Item[] | Group[] | Category[] | ResponseObject> {
    return this.http.post<Item[]>(this.url + "search", data, {
      headers: {
        "Authorization": "Bearer " + this.singleton.loginKey
      }
    }).pipe();
  }

  isItem(item: any): item is Item {
    return ((<Item>item).amount != null && (<Item>item).amount != undefined);
  }

  isGroup(group: any): group is Group {
    return ((<Group>group).members != null && (<Group>group).members != undefined);
  }

  isCategory(category: any): category is Category {
    return ((<Category>category).name != null && (<Category>category).name != undefined);
  }

  isResponseObj(responseObj: any): responseObj is ResponseObject {
    return ((<ResponseObject>responseObj).message != null && (<ResponseObject>responseObj).message != undefined);
  }
}
