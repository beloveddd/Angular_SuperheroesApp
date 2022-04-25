import { Injectable } from "@angular/core";

import { User } from "../app.interfaces";
import { HeroSelectionService } from "./hero-selecton.service";

@Injectable({
  providedIn: 'root'
  })
export class UserService {
  public usersKey: string = 'users';
  public currentUserKey: string = 'currentUser';
  public sessionTime: number = 3600000;
  public users: User[] = localStorage.getItem(this.usersKey) ? JSON.parse(localStorage.getItem(this.usersKey)!) : [];
  public currentUser: User | undefined = localStorage.getItem(this.currentUserKey) ? JSON.parse(localStorage.getItem(this.currentUserKey)!) : {};
  public isLogged: boolean = true;

  constructor(private _heroSelectionService: HeroSelectionService) { }

  public createUser(formLoginValue: Record<string, string>): void {
    const user: User = {
      login: formLoginValue.login,
      password: formLoginValue.password,
      userName: formLoginValue.userName,
    }

    this.users?.push(user);
    this.setUsersToLocalStorage(user);
  }

  public setUsersToLocalStorage(user: User): void {
    localStorage.setItem(this.usersKey, JSON.stringify(this.users));
  }

  public login(formLoginValue: Record<string, string>): boolean {
    const loginUniqueness: boolean = this.users.some( (elem: User) => elem.login === formLoginValue.login );
    const passwordMatch: boolean = this.users.some( (elem: User) => elem.password === formLoginValue.password );

    if (!loginUniqueness || !passwordMatch) {
      return false;
    }

    this.currentUser = this.users.find( (elem: User) => elem.login === formLoginValue.login );
    this.currentUser!.token = new Date();
    this.currentUser!.lifetime = new Date().getTime() + this.sessionTime;
    localStorage.setItem(this.currentUserKey, JSON.stringify(this.currentUser));
    return true;
  }

  public checkAuth(): boolean {
    if ( this.currentUser?.lifetime! && (this.currentUser?.lifetime! > new Date().getTime()) ) {
      return false;
    }

    if (this.currentUser?.lifetime!) {
      this.isLogged = false;
      localStorage.removeItem(this.currentUserKey);
      localStorage.removeItem(this._heroSelectionService.selectedHeroKey);
      localStorage.removeItem(this._heroSelectionService.ownedHeroesKey);
      localStorage.removeItem(this._heroSelectionService.recentSearchesKey);
      return true;
    }

    return true;
  }
}
