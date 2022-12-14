import { SingletonService } from "src/app/services/singleton.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { AccountService } from "../services/account.service";
import { User } from "src/app/modals/user";

@Component({
  selector: "app-reset",
  templateUrl: "./reset.component.html",
  styleUrls: ["./reset.component.css"],
})
export class ResetComponent implements OnInit {
  error: boolean = false;
  success: boolean = false;
  msg: string;

  token: string;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: AccountService,
    private router: Router,
    private activated: ActivatedRoute,
    private singleton: SingletonService
  ) {
    this.activated.queryParams.subscribe((param) => {
      this.token = param["token"];
    });
    this.form = this.fb.group({
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      cpassword: [
        null,
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
    });
  }

  ngOnInit() {
    this.service.token().subscribe(
      (resp) => {
        this.singleton.setToken(resp);
      },
      (error: HttpErrorResponse) => {
        this.singleton.setToken(error);
        this.msg = error.error.message;
        this.error = true;
      }
    );
  }

  get password() {
    return this.form.get("password");
  }

  get cpassword() {
    return this.form.get("cpassword");
  }

  reset(value) {
    if (
      value.password != undefined &&
      value.cpassword != undefined &&
      value.password != null &&
      value.cpassword != null
    ) {
      let user = {} as User;
      if (value.password == value.cpassword) {
        user.password = value.password;
      } else {
        this.error = true;
        this.msg = "Password and confirm password do not matches";
        return;
      }
      user.key = this.token;
      this.service.reset(user).subscribe(
        (resp) => {
          this.singleton.setToken(resp);
          if (
            resp != null &&
            resp != undefined &&
            this.service.isResponseObj(resp.body)
          ) {
            if (resp.body.code == "RESET") {
              this.success = true;
              this.msg = resp.body.message + ". Redirecting in 2 seconds...";
              setTimeout(() => {
                this.router.navigateByUrl("/account/login");
              }, 2000);
            } else {
              this.error = true;
              this.msg = resp.body.message;
            }
          }
        },
        (error: HttpErrorResponse) => {
          this.singleton.setToken(error);
          this.msg = error.error.message;
          this.error = true;
        }
      );
    } else {
      this.error = true;
      this.msg = "Password and confirm password is mandatory field";
    }
  }
}
