import { SingletonService } from "./../../services/singleton.service";
import { Observable } from "rxjs/internal/Observable";
import { Category } from "./../../modals/category";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { environment } from "./../../../environments/environment";
import { BaseService } from "./base.service";

@Injectable()
export class CategoryService extends BaseService {
  constructor(http: HttpClient, singleton: SingletonService) {
    super(http, environment.api + "category/", singleton);
  }

  getCategory(name: string): Observable<Category> {
    return null;
  }
}
