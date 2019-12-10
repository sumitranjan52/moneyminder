import { Injectable } from '@angular/core';
import { SingletonService } from './singleton.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginGuard {

  constructor(private singleton: SingletonService,
    private router: Router) { }
  
  canActivate() {
    if (!this.singleton.loginKey) {
      return true;
    }

    this.router.navigateByUrl('dashboard');
    return false;
  }
}
