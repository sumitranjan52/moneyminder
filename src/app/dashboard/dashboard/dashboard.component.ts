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

  constructor(private singleton: SingletonService,
    private service: AccountService,
    private cookie: CookieService,
    private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.service.delete(this.singleton.loginKey).subscribe(resp => {
      console.log(resp);
      if (resp == null) {
        return;
      }
      if (resp.code === "DELETED") {
        this.singleton.loginKey = null;
        this.cookie.delete(this.cookie.name, "/", location.hostname);
        this.router.navigateByUrl("/account");
      }
    });
  }
}
