import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AboutAuthorComponent } from './components/about-author/about-author.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MapComponent } from './components/map/map.component';
import { AuthModule } from "./auth/auth.module";
import {SignInComponent} from "./components/sign-in/sign-in.component";



@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    AboutAuthorComponent,
    AuthorizationComponent,
    NavbarComponent,
    MapComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        component: MainPageComponent
      },
      {
        path: 'about',
        component: AboutAuthorComponent
      },
      {
        path: 'auth',
        component: AuthorizationComponent
      },
    ]),
    ReactiveFormsModule,
    FormsModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
