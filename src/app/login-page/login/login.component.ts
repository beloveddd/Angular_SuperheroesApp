import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AppComponent, User} from "../../app.component";
import {AddValidators} from "../../shared/app.validators";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public formLogin!: FormGroup;

  public get loginControl(): AbstractControl {
    return this.formLogin.controls.login;
  }
  public get passwordControl(): AbstractControl {
    return this.formLogin.controls.password;
  }

  constructor(private _fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this._createForm();
  }

  private _createForm(): void {
    this.formLogin = this._fb.group( {
      login: [
        null, [
        Validators.required,
        Validators.email,
        AddValidators.checkEmail
        ]
      ],
      password: [
        null, [
        Validators.required,
        Validators.minLength(5),
        AddValidators.checkPassword
        ]
      ]
    });
  }

  public submit(): void {
    if (this.formLogin.invalid) {
      return;
    }

    const user: User = {
      login: this.formLogin.value.login,
      password: this.formLogin.value.password
    }

    AppComponent.users.push(user);
  }
}
