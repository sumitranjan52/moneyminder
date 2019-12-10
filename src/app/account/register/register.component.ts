import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from './../services/account.service';
import { User } from '../../modals/user';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  error: boolean = false;
  success: boolean = false;
  msg: string;
  successMsg: string;
  form: FormGroup;

  constructor(private fb: FormBuilder, 
    private service: AccountService,
    private router: Router) {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
      username: [null, Validators.compose([Validators.required, Validators.minLength(3)
        , Validators.pattern("^[a-z0-9_]{3,16}$")])],
      email: [null, Validators.compose([Validators.required, Validators.minLength(3)
        , Validators.pattern("^[\\w!#$%&'*+/=?`{|}~^-]+(?:\\.[\\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,6}$")])],
      mobile: [null, Validators.compose([Validators.required, Validators.minLength(10)
        , Validators.pattern("(0/91)?[7-9][0-9]{9}")])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }

  get name() {
    return this.form.get("name");
  }

  get username() {
    return this.form.get("username");
  }

  get email() {
    return this.form.get("email");
  }

  get mobile() {
    return this.form.get("mobile");
  }

  get password() {
    return this.form.get("password");
  }

  register(value: any) {
    let user = {} as User;
    console.log("value ", value);
    console.log("user ", user);
    if (value != null || value != undefined) {
      user.name = value.name;
      user.username = value.username;
      user.email = value.email;
      user.mobile = value.mobile;
      user.password = value.password;
    }
    console.log("user ", user);

    if (user.username != null && user.password != null && user.name != null
      && user.email != null && user.mobile != null) {
      this.service.register(user).subscribe(resp => {
        console.log(resp);
        if (this.service.isResponseObj(resp)) {
          if (resp.code === "CREATED") {
            this.success = true;
            this.successMsg = resp.message + ". Redirecting to login page in 3 sec...";
            setTimeout(() => {
              this.router.navigateByUrl("/account/login");
            }, 3000);
          } else {
            this.error = true;
            this.msg = resp.message;
          }
        }
      });
    } else {
      this.msg = "all fields are mandatory";
      this.error = true;
    }
  }
}
