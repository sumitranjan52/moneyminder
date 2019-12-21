import { ResponseObject } from '../../modals/responseObject';
import { environment } from '../../../environments/environment';
import { Token } from '../../modals/token';
import { User } from '../../modals/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post<Token | ResponseObject>(environment.api + "account/login", user).pipe();
  }

  register(user: User) {
    return this.http.post<ResponseObject>(environment.api + "account/reg", user).pipe();
  }

  forgot(user: User) {
    return this.http.post<ResponseObject>(environment.api + "account/forgot", user).pipe();
  }

  reset(user: User) {
    return this.http.post<ResponseObject>(environment.api + "account/reset", user).pipe();
  }

  fetch(key: any) {
    return this.http.get<User | ResponseObject>(environment.api + "account/?lk="+key).pipe();
  }

  delete(key: any) {
    return this.http.delete<ResponseObject>(environment.api + "account/?lk="+key).pipe();
  }

  isResponseObj(resp: any): resp is ResponseObject {
    return ((<ResponseObject>resp).message != null && (<ResponseObject>resp).message != undefined);
  }

  isToken(resp: any): resp is Token {
    return ((<Token>resp).token != null && (<Token>resp).token != undefined);
  }
}
