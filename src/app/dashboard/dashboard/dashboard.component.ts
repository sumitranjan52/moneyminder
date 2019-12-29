import { Group } from './../../modals/group';
import { Item } from './../../modals/item';
import { Category } from './../../modals/category';
import { SingletonService } from './../../services/singleton.service';
import { AccountService } from './../../account/services/account.service';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'src/app/services/cookie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public singleton: SingletonService) { }

  ngOnInit() {
  }
}
