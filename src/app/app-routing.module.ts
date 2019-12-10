import { LoginGuard } from './services/login-guard.service';
import { AuthGuard } from './services/authguard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "account",
    pathMatch: "full"
  },
  {
    path: "account",
    loadChildren: "./account/account.module#AccountModule",
    canActivate: [LoginGuard]
  },
  {
    path: "dashboard",
    loadChildren: "./dashboard/dashboard.module#DashboardModule",
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
