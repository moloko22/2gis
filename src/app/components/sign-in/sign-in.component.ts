import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../auth.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  userName;
  public loginForm: FormGroup;
  constructor(private login:AuthService) {
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
    this.login.signIn(object)
      .then(res=>{
        console.log(res);
      })
      .catch(err =>{
        console.log(err);
      })
  }
}
