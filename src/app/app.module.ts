import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpModule} from "@angular/http";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AboutAuthorComponent } from './components/about-author/about-author.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MapComponent } from './components/map/map.component';
import { MapService } from "./map.service";

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    AboutAuthorComponent,
    AuthorizationComponent,
    NavbarComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot([
      {
        path: '',
        component: MainPageComponent
      },
      {
        path:'about',
        component: AboutAuthorComponent
      },
      {
        path:'auth',
        component: AuthorizationComponent
      },
    ])
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
