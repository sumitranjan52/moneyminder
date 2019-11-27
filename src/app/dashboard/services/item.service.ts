import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseService } from './base.service';

@Injectable()
export class ItemService extends BaseService {

  constructor(http: HttpClient) { 
    super(http, environment.api + "item/");
  }
}