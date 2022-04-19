import { User } from "../app.interfaces";
import { Injectable } from "@angular/core";

@Injectable()
export class UserService {
  public static usersKey: string = 'users';
  public static currentUserKey: string = 'currentUser';
  public static sessionTime: number = 3600000;
  public static users: User[] = localStorage.getItem(UserService.usersKey) ? JSON.parse(localStorage.getItem(UserService.usersKey)!) : [];
  public static currentUser: User | undefined = localStorage.getItem(UserService.currentUserKey) ? JSON.parse(localStorage.getItem(UserService.currentUserKey)!) : {};
  public static isLogged: boolean = true;

  public createUser(formLoginValue: Record<string, string>): void {
    const user: User = {
      login: formLoginValue.login,
      password: formLoginValue.password,
      userName: formLoginValue.userName,
    }

    UserService.users?.push(user);
    this.setUsersToLocalStorage(user);
  }

  public setUsersToLocalStorage(user: User): void {
    localStorage.setItem(UserService.usersKey, JSON.stringify(UserService.users));
  }

  public login(formLoginValue: Record<string, string>): boolean {
    const loginUniqueness: boolean = UserService.users.some( (elem: User) => elem.login === formLoginValue.login );
    const passwordMatch: boolean = UserService.users.some( (elem: User) => elem.password === formLoginValue.password );

    if (!loginUniqueness || !passwordMatch) return false;

    UserService.currentUser = UserService.users.find( (elem: User) => elem.login === formLoginValue.login );
    UserService.currentUser!.token = new Date();
    UserService.currentUser!.lifetime = new Date().getTime() + UserService.sessionTime;
    localStorage.setItem(UserService.currentUserKey, JSON.stringify(UserService.currentUser));
    return true;
  }

  public static checkAuth(): boolean | void {
    if ( UserService.currentUser?.lifetime! && (UserService.currentUser?.lifetime! > new Date().getTime()) ) return false;

    if (UserService.currentUser?.lifetime!) {
      UserService.isLogged = false;
      localStorage.removeItem(UserService.currentUserKey);
      return true;
    }
  }
}
