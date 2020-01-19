import { HttpErrorResponse } from '@angular/common/http';
import { Group } from './../../modals/group';
import { Item } from './../../modals/item';
import { Category } from './../../modals/category';
import { SingletonService } from './../../services/singleton.service';
import { AccountService } from './../../account/services/account.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private service: AccountService,
    public singleton: SingletonService,
    private cookie: CookieService,
    private router: Router) { }

  ngOnInit() {
    this.service.fetch(this.singleton.loginKey).subscribe(resp => {
      this.singleton.setToken(resp);
      if (this.service.isResponseObj(resp.body)) {
        this.singleton.genLogout();
      } else if (this.service.isUser(resp.body)) {
        this.singleton.user = resp.body;
      }
    }, (error: HttpErrorResponse) => {
      this.singleton.setToken(error);
      if (error.status === 401) {
        this.singleton.genLogout();
      }
    });
  }

  logout() {
    this.service.delete(this.singleton.loginKey).subscribe(resp => {
      if (resp == null) {
        return;
      }
      this.singleton.setToken(resp);
      if (this.service.isResponseObj(resp.body)) {
        if (resp.body.code === "DELETED") {
          this.singleton.categoryEdit = {} as Category;
          this.singleton.deleteData = {};
          this.singleton.itemEdit = {} as Item;
          this.singleton.groupEdit = {} as Group;

          this.singleton.groupData = {} as Group;
          this.singleton.filterItem = {} as Item;

          this.singleton.loginKey = null;
          this.cookie.delete(this.cookie.name, "/", location.hostname);
          this.router.navigateByUrl("/account");
        }
      }
    }, (error: HttpErrorResponse) => {
      this.singleton.setToken(error);
      if (error.status === 401) {
        this.singleton.genLogout();
      }
    });
  }
}
