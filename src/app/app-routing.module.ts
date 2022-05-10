import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { HomeComponent } from './home/home.component';
import { RedirectComponent } from './redirect/redirect.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'auth',
    component: AuthComponent ,
    canActivate: [GuestGuard]
  },
  { path: 'redirect', component: RedirectComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'categories', component:  CategoriesComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
