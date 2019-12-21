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
export class ForgotComponent {

  error: boolean = false;
  success: boolean = false;
  msg: string;
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private service: AccountService) {
    this.form = this.fb.group({
      email: [null, Validators.compose([Validators.required, Validators.minLength(3)
        , Validators.pattern("^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$")])]
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
        if(resp != null && resp != undefined) {
          if (resp.code == "SENT") {
            this.success = true;
            this.msg = resp.message;
          } else {
            this.error = true;
            this.msg = resp.message;
          }
        }
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
    } else {
      this.msg = "Email is mandatory field";
      this.error = true;
    }
  }
}
