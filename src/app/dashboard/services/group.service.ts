import { SingletonService } from './../../services/singleton.service';
import { Observable } from 'rxjs/internal/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Group } from './../../modals/group';
import { environment } from './../../../environments/environment.prod';
import { BaseService } from './base.service';
import { ResponseObject } from 'src/app/modals/responseObject';

@Injectable()
export class GroupService extends BaseService {

  constructor(http: HttpClient, singleton: SingletonService) {
    super(http, environment.api + "group/", singleton);
    console.log("Group service started");
  }

  join(group: Group): Observable<ResponseObject> {
    return this.getHttp().put<ResponseObject>(super.getUrl() + "join", group, {
      headers: {
        "Authorization": "Bearer " + super.getSingleton().loginKey
      }
    }).pipe();
  }

  getGroup(data: Group): Observable<Group | ResponseObject> {
    return this.getHttp().post<Group | ResponseObject>(super.getUrl() + "token", data, {
      headers: {
        "Authorization": "Bearer " + super.getSingleton().loginKey
      }
    }).pipe();
  }

  updateMember(group: Group): Group {
    return null;
  }
}
