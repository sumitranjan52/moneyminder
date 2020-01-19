import { environment } from './../../environments/environment';
import { Injectable, EventEmitter } from '@angular/core';

import { Item } from '../modals/item';
import { Group } from './../modals/group';
import { Category } from './../modals/category';
import { User } from '../modals/user';
import { CookieService } from './cookie.service';
import { Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class SingletonService {

  constructor(private cookie: CookieService,
    private router: Router) { }

  /* login key to find user is logged in or not */
  loginKey: string = "";
  user = {} as User;

  // token to prevent csrf and dos attack
  csrfToken: string = "";

  get secureToken(){
    if (this.csrfToken == null || this.csrfToken == undefined) {
      return this.csrfToken;
    }
    return this.csrfToken;
  }

  set secureToken(token: string){
    if (token == null || token == undefined) {
      this.csrfToken = "";
    }
    this.csrfToken = token;
  }

  setToken(resp: HttpResponse<any> | HttpErrorResponse) {
    if (resp != null && resp != undefined && resp.headers != null && resp.headers != undefined) {
      this.secureToken = resp.headers.get(environment.token);
    }
  }

  groupData = {} as Group;

  deleteData = {} as any;

  itemEdit = {} as Item;
  groupEdit = {} as Group;
  categoryEdit = {} as Category;

  filterItem = {} as Item;

  eventEmitter = new EventEmitter();

  get group(): Group {
    return this.groupData;
  }

  set group(value: Group) {
    this.groupData = value;
    this.filterItem = {} as Item;
    this.eventEmitter.emit(value);
  }

  genLogout() {
    this.categoryEdit = {} as Category;
    this.deleteData = {};
    this.itemEdit = {} as Item;
    this.groupEdit = {} as Group;

    this.groupData = {} as Group;
    this.filterItem = {} as Item;

    this.loginKey = null;
    this.cookie.delete(this.cookie.name, "/", location.hostname);
    this.router.navigateByUrl("account");
  }
}
