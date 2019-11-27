import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material-module';
import { AppComponent } from './app.component';
import { JoinGroupDialogComponent } from './dialog/join-group-dialog/join-group-dialog.component';
import { CreateGroupDialogComponent } from './dialog/create-group-dialog/create-group-dialog.component';
import { CreateItemDialogComponent } from './dialog/create-item-dialog/create-item-dialog.component';
import { CreateCategoryDialogComponent } from './dialog/create-category-dialog/create-category-dialog.component';
import { FilterDialogComponent } from './dialog/filter-dialog/filter-dialog.component';
import { AuthGuard } from './services/authguard.service';
import { SingletonService } from './services/singleton.service';
import { CookieService } from './services/cookie.service';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    JoinGroupDialogComponent,
    CreateGroupDialogComponent,
    CreateItemDialogComponent,
    CreateCategoryDialogComponent,
    FilterDialogComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthGuard, SingletonService, CookieService],
  bootstrap: [AppComponent],
  entryComponents: [
    JoinGroupDialogComponent,
    CreateGroupDialogComponent,
    CreateItemDialogComponent,
    CreateCategoryDialogComponent,
    FilterDialogComponent,
    ConfirmDialogComponent
  ]
})
export class AppModule { }
