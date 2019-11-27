import { HttpClientModule } from '@angular/common/http';
import { BaseService } from './services/base.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

import { MaterialModule } from '../material-module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupService } from './services/group.service';
import { CategoryService } from './services/category.service';
import { ItemService } from './services/item.service';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ItemComponent } from './item/item.component';
import { GroupComponent } from './group/group.component';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ItemComponent,
    GroupComponent,
    SummaryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    DashboardRoutingModule,
    HttpClientModule,
    ScrollingModule
  ],
  providers: [
    BaseService,
    ItemService,
    CategoryService,
    GroupService
  ]
})
export class DashboardModule { }
