import { environment } from './../../environments/environment';
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
      return true;
    }

    this.router.navigateByUrl('account');
    return false;
  }
}
