import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignInComponent } from '../components/sign-in/sign-in.component';
import {SignUpComponent} from "../components/sign-up/sign-up.component";

const routes: Routes = [
  {path: 'registration', component: SignUpComponent},
  {path: 'auth', component: SignInComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
