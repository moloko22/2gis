import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MustMatch } from "../../must-match.validator";
import { AuthService } from "../../auth.service";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  public signUp: FormGroup;
  submitted = false;
  @Output() userName: string;
  logic;
  constructor(private formBuilder: FormBuilder, logic: AuthService) {
    this.logic = logic;
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
  get f(){ return this.signUp.controls}
  checkSignUp(form){
    console.log(form);
    this.submitted = true;
    if(this.signUp.invalid){
      return;
    }
    this.logic.signUp(form)
      .then(user=>{
        console.log(user)
      })
      .catch(err=>{
        console.log(err);
      })
  }
}
