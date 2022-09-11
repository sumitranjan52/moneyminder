import { SingletonService } from "./../../services/singleton.service";
import { environment } from "./../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { BaseService } from "./base.service";

@Injectable()
export class ItemService extends BaseService {
  constructor(http: HttpClient, singleton: SingletonService) {
    super(http, environment.api + "item/", singleton);
  }
}
