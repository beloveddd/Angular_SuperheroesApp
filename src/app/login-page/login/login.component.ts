import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AddValidators } from "../../shared/app.validators";
import { UserService } from "../../shared/services/user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  public formLogin!: FormGroup;
  public isAuth: boolean = true;
  public isLogged: boolean = false;

  public get loginControl(): AbstractControl {
    return this.formLogin.controls.login;
  }
  public get passwordControl(): AbstractControl {
    return this.formLogin.controls.password;
  }

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _router: Router
  )
  { }

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

    this.isLogged = this._userService.isLogged;
  }

  public submit(): void {
    if (this.formLogin.invalid) {
      return;
    }

    this.isLogged = true;
    this._userService.login(this.formLogin.value);

    if (!this._userService.login(this.formLogin.value)) {
      this.isAuth = false;
    }

    this.formLogin.reset();
    this._router.navigate(['/']);
  }
}
