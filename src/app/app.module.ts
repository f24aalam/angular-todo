import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RedirectComponent } from './redirect/redirect.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    CategoriesComponent,
    DashboardComponent,
    RedirectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
