import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { UserService } from "./shared/services/user.service";
import { HeroSelectionService } from "./shared/services/hero-selecton.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public title: string = 'superHeroesApp';

  public get possibleToFight(): boolean {
    if (this._heroSelectionService.ownedHeroes.length > 1) {
      return true;
    }

    return false;
  }

  constructor(
    private _router: Router,
    private _userService: UserService,
    private _heroSelectionService: HeroSelectionService)
  { }

  public ngOnInit(): void {
    this._checkAuth();
  }

  private _checkAuth(): void {
    if (this._userService.checkAuth()) {
      this._router.navigate(['/login']);
    }
  }
}
