import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AddValidators } from "../../shared/app.validators";
import { UserService } from "../../shared/user.service";

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

  constructor(
    private _fb: FormBuilder,
    public _userService: UserService
  )
  { }

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

    this._userService.createUser(this.formCreate.value);
  }
}
