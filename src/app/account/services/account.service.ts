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
    return this.http.post<Token | ResponseObject>(environment.api + "account/login", user);
  }

  register(user: User) {
    return this.http.post<ResponseObject>(environment.api + "account/reg", user);
  }
}
