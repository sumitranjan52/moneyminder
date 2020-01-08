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

  ngOnInit () {
    console.log("here");
    this.service.token().subscribe(resp => {
      if(resp != null && resp != undefined && resp.headers != null && resp.headers != undefined){
        this.singleton.secureToken = resp.headers.get(environment.token);
      }
    }, (error: HttpErrorResponse) => {
      if(error != null && error != undefined && error.headers != null && error.headers != undefined){
        this.singleton.secureToken = error.headers.get(environment.token);
      }
    });
  }

  get email() {
    return this.form.get("email");
  }

  forgot(value) {
    console.log(value);
    let user = {} as User;
    user.email = value.email;

    if (user.email != undefined && user.email != null) {
      this.service.forgot(user).subscribe(resp => {
        console.log(resp);
        if(resp != null && resp != undefined && resp.headers != null && resp.headers != undefined){
          console.log(resp.headers.get(environment.token));
          this.singleton.secureToken = resp.headers.get(environment.token);
        }
        if(resp != null && resp != undefined && this.service.isResponseObj(resp.body)) {
          if (resp.body.code == "SENT") {
            this.success = true;
            this.msg = resp.body.message;
          } else {
            this.error = true;
            this.msg = resp.body.message;
          }
        }
      }, (error: HttpErrorResponse) => {
        console.log(error);
        if(error != null && error != undefined && error.headers != null && error.headers != undefined){
          console.log(error.headers.get(environment.token));
          this.singleton.secureToken = error.headers.get(environment.token);
        }
      });
    } else {
      this.msg = "Email is mandatory field";
      this.error = true;
    }
  }
}
