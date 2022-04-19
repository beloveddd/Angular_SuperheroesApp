import { Component, OnInit } from '@angular/core';
import { UserService } from "./shared/services/user.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public title: string = 'superHeroesApp';

  constructor(private _router: Router) {
  }

  public ngOnInit(): void {
    this.checkAuth();
  }

  public checkAuth(): void {
    if (!UserService.checkAuth()) return;

    this._router.navigate(['/login']);
  }
}
