import { Observable } from 'rxjs/internal/Observable';
import { Category } from './../../modals/category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment.prod';
import { BaseService } from './base.service';

@Injectable()
export class CategoryService extends BaseService {

  constructor(http: HttpClient) { 
    super(http, environment.api + "category/");
    console.log("Category service started");
  }

  getCategory(name: string): Observable<Category> {
    return null;
  }
}
