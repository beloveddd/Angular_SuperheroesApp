import { FormControl, ValidationErrors } from "@angular/forms";

import { User } from "./app.interfaces";
import { validatorFn } from "./app.types";

export class AddValidators {
  public static regEmail: RegExp = new RegExp('^([a-zA-Z]*\\.?){1,3}[^\\.]*@([a-zA-Z]{1,5})(.com|.org|.net|.co|.us)$');
  public static regPassword: RegExp = new RegExp('(.*[A-Z].*)(.*[0-9].*)(.*[$%.&!].*)');
  public static regUserName: RegExp = new RegExp('^([a-z][a-z]*)(-[a-z]+)$|^([a-z][a-z]*)([A-Z][a-z]*)$|^([A-Z][a-z]*) ([A-Z][a-z]*)$');
  public static regHeroSearch: RegExp = new RegExp('^([a-zA-Z]+ ?)+$');

  public static checkEmail(control: FormControl): ValidationErrors | null {
    return AddValidators._checkRegExp(control, AddValidators.regEmail);
  }

  public static checkNewEmail(usersList: User[]): validatorFn {
    return function(control: FormControl) {
      const userUniqueness: boolean = usersList.some( (elem: User) => elem.login === control.value );

      return userUniqueness ? { notUniqueEmail: true } : AddValidators._checkRegExp(control, AddValidators.regEmail);
    }
  }

  public static checkPassword(control: FormControl): ValidationErrors | null {
    return AddValidators._checkRegExp(control, AddValidators.regPassword);
  }

  public static checkUserName(control: FormControl): ValidationErrors | null {
    return AddValidators._checkRegExp(control, AddValidators.regUserName);
  }

  public static checkHeroInput(control: FormControl): ValidationErrors | null {
    return AddValidators._checkRegExp(control, AddValidators.regHeroSearch);
  }

  private static _checkRegExp(control: FormControl, re: RegExp): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    if (!control.value.match(re)) {
      switch (true) {
        case re === AddValidators.regEmail:
          return { invalidEmail: true };
        case re === AddValidators.regPassword:
          return { invalidPassword: true };
        case re === AddValidators.regUserName:
          return { invalidUserName: true };
        case re === AddValidators.regHeroSearch:
          return { invalidInputValue: true };
      }
    }

    return null;
  }
}
