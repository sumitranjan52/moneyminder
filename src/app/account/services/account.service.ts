import { SingletonService } from './../../services/singleton.service';
import { environment } from './../../../environments/environment';
import { ResponseObject } from '../../modals/responseObject';
import { Token } from '../../modals/token';
import { User } from '../../modals/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient, private singleton: SingletonService) { }

  token() {
    return this.http.get<Response>(environment.api + "account/token", {
      observe: 'response'
    }).pipe();
  }

  login(user: User) {
    return this.http.post<Response>(environment.api + "account/login", user, {
      observe: 'response',
      headers: {
        "MM-Safe-Token": this.singleton.secureToken 
      }
    }).pipe();
  }

  register(user: User) {
    return this.http.post<Response>(environment.api + "account/reg", user, {
      observe: 'response',
      headers: {
        "MM-Safe-Token": this.singleton.secureToken 
      }
    }).pipe();
  }

  forgot(user: User) {
    return this.http.post<Response>(environment.api + "account/forgot", user, {
      observe: 'response',
      headers: {
        "MM-Safe-Token": this.singleton.secureToken 
      }
    }).pipe();
  }

  reset(user: User) {
    return this.http.post<Response>(environment.api + "account/reset", user, {
      observe: 'response',
      headers: {
        "MM-Safe-Token": this.singleton.secureToken 
      }
    }).pipe();
  }

  fetch(key: any) {
    return this.http.get<Response>(environment.api + "account/?lk="+key, {
      observe: 'response',
      headers: {
        "MM-Safe-Token": this.singleton.secureToken 
      }
    }).pipe();
  }

  delete(key: any) {
    return this.http.delete<Response>(environment.api + "account/?lk="+key, {
      observe: 'response',
      headers: {
        "MM-Safe-Token": this.singleton.secureToken 
      }
    }).pipe();
  }

  isResponseObj(resp: any): resp is ResponseObject {
    return ((<ResponseObject>resp).message != null && (<ResponseObject>resp).message != undefined);
  }

  isToken(resp: any): resp is Token {
    return ((<Token>resp).token != null && (<Token>resp).token != undefined);
  }
}
