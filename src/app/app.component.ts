import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UserService } from "./shared/services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public title: string = 'superHeroesApp';

  constructor(
    private _router: Router,
    private _userService: UserService)
  { }

  public ngOnInit(): void {
    this.checkAuth();
  }

  public checkAuth(): void {
    if (!this._userService.checkAuth()) {
      return;
    }

    this._router.navigate(['/login']);
  }
}
