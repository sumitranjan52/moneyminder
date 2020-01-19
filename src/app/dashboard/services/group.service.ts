import { SingletonService } from './../../services/singleton.service';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';

import { Group } from './../../modals/group';
import { environment } from './../../../environments/environment.prod';
import { BaseService } from './base.service';
import { ResponseObject } from 'src/app/modals/responseObject';

@Injectable()
export class GroupService extends BaseService {

  constructor(http: HttpClient, singleton: SingletonService) {
    super(http, environment.api + "group/", singleton);
  }

  join(group: Group): Observable<HttpResponse<ResponseObject>> {
    return this.getHttp().put<ResponseObject>(super.getUrl() + "join", group, {
      observe: 'response',
      headers: {
        "Authorization": super.getSingleton().loginKey,
        "MM-Safe-Token": super.getSingleton().secureToken 
      }
    }).pipe();
  }

  getGroup(data: Group): Observable<HttpResponse<Group | ResponseObject>> {
    return this.getHttp().post<Group | ResponseObject>(super.getUrl() + "token", data, {
      observe: 'response',
      headers: {
        "Authorization": super.getSingleton().loginKey,
        "MM-Safe-Token": super.getSingleton().secureToken 
      }
    }).pipe();
  }

  updateMember(group: Group): Observable<HttpResponse<Group | ResponseObject>> {
    return this.getHttp().put<Group | ResponseObject>(super.getUrl() + "member", group, {
      observe: 'response',
      headers: {
        "Authorization": super.getSingleton().loginKey,
        "MM-Safe-Token": super.getSingleton().secureToken 
      }
    }).pipe();
  }
}
