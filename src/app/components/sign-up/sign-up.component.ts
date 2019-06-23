import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from "@angular/forms";
import { MustMatch } from "../../must-match.validator";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public signUp: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {
    this.signUp = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  ngOnInit() {
  }
  get f(){ return this.signUp.controls;}
  checkSignUp(){
    this.submitted = true;
    if(this.signUp.invalid){
      return;
    }
    console.log("good");
  }
}
