import { SingletonService } from './../../services/singleton.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountService } from './../services/account.service';
import { User } from '../../modals/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'src/app/services/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  error: boolean = false;
  msg: string;
  form: FormGroup;

  constructor(private fb: FormBuilder, 
    private service: AccountService,
    private cookie: CookieService,
    private router: Router,
    private singleton: SingletonService) {
    this.form = this.fb.group({
      username: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit () {
    console.log("here");
    this.service.token().subscribe(resp => {
      this.singleton.setToken(resp);
    }, (error: HttpErrorResponse) => {
      this.singleton.setToken(error);
    });
  }

  get username() {
    return this.form.get("username");
  }

  get password() {
    return this.form.get("password");
  }

  login(value: any) {
    let user = {} as User;
    console.log("value ", value);
    console.log("user ", user);
    if (value != null || value != undefined) {
      user.username = value.username;
      user.password = value.password;
    }
    console.log("user ", user);

    if (user.username != null && user.password != null) {
      this.service.login(user).subscribe(resp => {
        console.log(resp);
        this.singleton.setToken(resp);
        if (resp == null) {
          console.log("no data is returned");
          return;
        }
        if (this.service.isToken(resp.body)) {
          this.cookie.set(this.cookie.name, 
            resp.body.token, 
            location.hostname,
            "/",
            (location.hostname === "localhost")? false: true);
            this.singleton.loginKey = resp.body.token;
            this.router.navigateByUrl("/dashboard");
        } else if (this.service.isResponseObj(resp)) {
          this.error = true;
          this.msg = resp.message;
        }
      }, (error: HttpErrorResponse) => {
        this.singleton.setToken(error);
      });
    } else {
      this.msg = "username and password are mandatory";
      this.error = true;
    }
  }
}