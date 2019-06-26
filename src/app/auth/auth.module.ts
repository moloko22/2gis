import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SignUpComponent } from "../components/sign-up/sign-up.component";

@NgModule({
  declarations: [SignUpComponent],
  exports: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
