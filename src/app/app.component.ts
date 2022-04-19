import { Component } from '@angular/core';
import { User } from "./shared/app.interfaces";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title: string = 'superHeroesApp';
}
