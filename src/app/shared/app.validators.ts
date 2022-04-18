import {FormControl, ValidationErrors} from "@angular/forms";
import {AppComponent, User} from "../app.component";

export class AddValidators {
  private static _checkRegExp(control: FormControl, re: RegExp): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    if (!control.value.match(re)) {
      return { invalidEmail: true };
    }

    return null;
  }

  public static checkEmail(control: FormControl): ValidationErrors | null {
    const regEmail = new RegExp('^([a-zA-Z]*\\.?){1,3}[^\\.]*@([a-zA-Z]{1,5})(.com|.org|.net|.co|.us)$');

    return AddValidators._checkRegExp(control, regEmail);
  }

  public static checkNewEmail(control: FormControl): ValidationErrors | null {
    const regEmail = new RegExp('^([a-zA-Z]*\\.?){1,3}[^\\.]*@([a-zA-Z]{1,5})(.com|.org|.net|.co|.us)$');
    const userUniqueness: boolean = AppComponent.users.some( (elem: User) => elem.login === control.value );

    return userUniqueness ? { notUniqueEmail: true } : AddValidators._checkRegExp(control, regEmail);
  }

  public static checkPassword(control: FormControl): ValidationErrors | null {
    const regPassword = new RegExp('(.*[A-Z].*)(.*[0-9].*)(.*[$%.&!].*)');

    return AddValidators._checkRegExp(control, regPassword);
  }

  public static checkUserName(control: FormControl): ValidationErrors | null {
    const regUserName = new RegExp('^([a-z][a-z]*)(-[a-z]+)$|^([a-z][a-z]*)([A-Z][a-z]*)$|^([A-Z][a-z]*) ([A-Z][a-z]*)$');

    return AddValidators._checkRegExp(control, regUserName);
  }
}


