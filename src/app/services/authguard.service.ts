import { HttpErrorResponse } from '@angular/common/http';
import { AccountService } from './../account/services/account.service';
import { SingletonService } from './singleton.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private singleton: SingletonService,
    private router: Router,
    private service: AccountService) { }
  
  canActivate() {
    if (this.singleton.loginKey) {
      this.service.fetch(this.singleton.loginKey).subscribe(resp => {
        console.log(resp);
        if (this.service.isResponseObj(resp)) {
          this.router.navigateByUrl('account');
        } else {
          this.singleton.user = resp;
        }
      }, (error: HttpErrorResponse) => {
        this.router.navigateByUrl('account');
      });
      return true;
    }

    this.router.navigateByUrl('account');
    return false;
  }
}
