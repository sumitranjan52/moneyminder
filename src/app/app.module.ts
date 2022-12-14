import { GroupService } from './dashboard/services/group.service';
import { GroupJoinComponent } from './component/group-join/group-join.component';
import { AccountService } from './account/services/account.service';
import { LoginGuard } from './services/login-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material-module';
import { AppComponent } from './app.component';
import { AuthGuard } from './services/authguard.service';
import { SingletonService } from './services/singleton.service';
import { CookieService } from './services/cookie.service';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { LoaderComponent } from './component/loader/loader.component';
import { LoaderInterceptor } from './component/loader/loader.intercepter';

@NgModule({
  declarations: [
    AppComponent,
    GroupJoinComponent,
    NotFoundComponent,
    LoaderComponent
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
  providers: [AuthGuard, LoginGuard, SingletonService, CookieService, AccountService, GroupService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
