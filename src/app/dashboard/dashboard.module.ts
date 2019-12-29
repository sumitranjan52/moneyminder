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
import { JoinGroupDialogComponent } from '../dialog/join-group-dialog/join-group-dialog.component';
import { CreateGroupDialogComponent } from '../dialog/create-group-dialog/create-group-dialog.component';
import { CreateItemDialogComponent } from '../dialog/create-item-dialog/create-item-dialog.component';
import { CreateCategoryDialogComponent } from '../dialog/create-category-dialog/create-category-dialog.component';
import { FilterDialogComponent } from '../dialog/filter-dialog/filter-dialog.component';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { ShareComponent } from '../dialog/share/share.component';
import { UpdateMemberComponent } from '../dialog/update-member/update-member.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ItemComponent,
    GroupComponent,
    SummaryComponent,
    JoinGroupDialogComponent,
    CreateGroupDialogComponent,
    CreateItemDialogComponent,
    CreateCategoryDialogComponent,
    FilterDialogComponent,
    ConfirmDialogComponent,
    ShareComponent,
    UpdateMemberComponent
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
    ItemService,
    CategoryService,
    GroupService
  ],
  entryComponents: [
    JoinGroupDialogComponent,
    CreateGroupDialogComponent,
    CreateItemDialogComponent,
    CreateCategoryDialogComponent,
    FilterDialogComponent,
    ConfirmDialogComponent,
    ShareComponent,
    UpdateMemberComponent
  ]
})
export class DashboardModule { }
