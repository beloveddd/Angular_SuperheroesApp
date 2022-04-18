import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppComponent, User} from "../../app.component";
import {AddValidators} from "../../shared/app.validators";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  public formCreate!: FormGroup;

  public get userNameControl(): AbstractControl {
    return this.formCreate.controls.userName;
  }
  public get loginControl(): AbstractControl {
    return this.formCreate.controls.login;
  }
  public get passwordControl(): AbstractControl {
    return this.formCreate.controls.password;
  }

  constructor(private _fb: FormBuilder) { }

  public ngOnInit(): void {
    this._createForm();
  }

  public _createForm(): void {
    this.formCreate = this._fb.group( {
      userName: [
        null, [
        Validators.required,
        AddValidators.checkUserName
        ]
      ],
      login: [null, [
        Validators.required,
        Validators.email,
        AddValidators.checkNewEmail
        ]
      ],
      password: [
        null,[
        Validators.required,
        Validators.minLength(5),
        AddValidators.checkPassword
        ]
      ]
    });
  }

  public submit(): void {
    if (this.formCreate.invalid) {
      return;
    }

    const user: User = {
      userName: this.formCreate.value.userName,
      login: this.formCreate.value.login,
      password: this.formCreate.value.password
    }

    AppComponent.users.push(user);
  }
}
