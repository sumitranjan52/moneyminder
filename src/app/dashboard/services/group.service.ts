import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Group } from './../../modals/group';
import { environment } from './../../../environments/environment.prod';
import { BaseService } from './base.service';

@Injectable()
export class GroupService extends BaseService {

  constructor(http: HttpClient) {
    super(http, environment.api + "group/");
    console.log("Group service started");
  }

  getGroup(name: string): Group {
    return null;
  }

  updateMember(group: Group): Group {
    return null;
  }
}
