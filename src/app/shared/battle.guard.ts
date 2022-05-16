import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { HeroSelectionService } from "./services/hero-selecton.service";

@Injectable({
  providedIn: 'root'
})

export class BattleGuard implements CanActivate {

  constructor(private _heroSelectionService: HeroSelectionService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._heroSelectionService.ownedHeroes.length > 1 ? true : false;
  }

}
