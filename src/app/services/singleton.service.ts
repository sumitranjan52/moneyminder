import { Injectable, EventEmitter } from '@angular/core';

import { Item } from '../modals/item';
import { Group } from './../modals/group';
import { Category } from './../modals/category';
import { User } from '../modals/user';
import { AccountService } from '../account/services/account.service';
import { CookieService } from './cookie.service';
import { Router } from '@angular/router';

@Injectable()
export class SingletonService {

  constructor(private service: AccountService,
    private cookie: CookieService,
    private router: Router) { }

  /* login key to find user is logged in or not */
  loginKey: string;
  user = {} as User;

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

  logout() {
    this.service.delete(this.loginKey).subscribe(resp => {
      console.log(resp);
      if (resp == null) {
        return;
      }
      if (resp.code === "DELETED") {
        this.categoryEdit = {} as Category;
        this.deleteData = {};
        this.itemEdit = {} as Item;
        this.groupEdit = {} as Group;

        this.groupData = {} as Group;
        this.filterItem = {} as Item;

        this.loginKey = null;
        this.cookie.delete(this.cookie.name, "/", location.hostname);
        this.router.navigateByUrl("/account");
      }
    });
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
