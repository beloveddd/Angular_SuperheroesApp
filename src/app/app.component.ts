import { Component } from '@angular/core';

export interface User {
  login: string,
  password: any,
  userName?: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string = 'superHeroesApp';
  public static users: Array<User> = [];
}
