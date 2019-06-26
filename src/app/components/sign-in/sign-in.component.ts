import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public loginForm: FormGroup;
  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ])),
      password: new FormControl("", this.passwordValidation),
    })
  }
  ngOnInit() {
  }
  passwordValidation(formcontrol){
    if(formcontrol.value.length < 6) {
      return {password: true}
    }
  }
  public checkAuth(object){
    console.log(object);
  }
}
