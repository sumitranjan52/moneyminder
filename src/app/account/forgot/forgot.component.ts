import { SingletonService } from 'src/app/services/singleton.service';
import { environment } from './../../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from './../../modals/user';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  error: boolean = false;
  success: boolean = false;
  msg: string;
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private service: AccountService,
    private singleton: SingletonService) {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.minLength(3)
        , Validators.pattern("^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$")])]
    });
  }

  ngOnInit() {
    this.service.token().subscribe(resp => {
      this.singleton.setToken(resp);
    }, (error: HttpErrorResponse) => {
      this.singleton.setToken(error);
      this.msg = error.error.message;
      this.error = true;
    });
  }

  get email() {
    return this.form.get("email");
  }

  forgot(value) {
    let user = {} as User;
    user.email = value.email;

    if (user.email != undefined && user.email != null) {
      this.service.forgot(user).subscribe(resp => {
        this.singleton.setToken(resp);
        if (resp != null && resp != undefined && this.service.isResponseObj(resp.body)) {
          if (resp.body.code == "SENT") {
            this.success = true;
            this.msg = resp.body.message;
          } else {
            this.error = true;
            this.msg = resp.body.message;
          }
        }
      }, (error: HttpErrorResponse) => {
        this.singleton.setToken(error);
        this.msg = error.error.message;
        this.error = true;
      });
    } else {
      this.msg = "Email is mandatory field";
      this.error = true;
    }
  }
}
