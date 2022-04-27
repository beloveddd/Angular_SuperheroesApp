import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { HeroItem, Response } from "../app.interfaces";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HeroSelectionService {
  public urlAPI: string = `https://superheroapi.com/api.php/${environment.idToken}/search/`;
  public ownedHeroesKey: string = 'ownedHeroes';
  public selectedHeroKey: string = 'selectedHero';
  public recentSearchesKey: string = 'recentSearches';
  public foundedHeroes: HeroItem[] = [];
  public ownedHeroes: HeroItem[] = localStorage.getItem(this.ownedHeroesKey) ? JSON.parse(localStorage.getItem(this.ownedHeroesKey)!) : [];
  public selectedHero: HeroItem = localStorage.getItem(this.selectedHeroKey) ? JSON.parse(localStorage.getItem(this.selectedHeroKey)!) : {};
  public recentSearches: string[] = localStorage.getItem(this.recentSearchesKey) ? JSON.parse(localStorage.getItem(this.recentSearchesKey)!) : [];

  constructor(private _http: HttpClient) { }

  public searchHeroes(searchValue: string | null): Observable<HeroItem[]> {
      return this._http.get<Response>(this.urlAPI + searchValue)
        .pipe(
          map( (response: Response) => {
            const data: HeroItem[] = response.results.filter( (elem: HeroItem) => elem.powerstats.power !== 'null');

            return data;
          })
        );
  }

  public createHero(heroItem: HeroItem): void {
    this.ownedHeroes.push(heroItem);
    this.selectedHero = this.ownedHeroes[this.ownedHeroes.length-1];
    this.saveToLocalStorage();
  }

  public saveToLocalStorage(): void {
    localStorage.setItem(this.ownedHeroesKey, JSON.stringify(this.ownedHeroes));
    localStorage.setItem(this.selectedHeroKey, JSON.stringify(this.selectedHero));
  }

  public createRecentSearches(searchValue: string | null): void {
    const matchingRecentSearch: string | undefined = this.recentSearches?.find( (elem: string) => elem === searchValue);

    if (matchingRecentSearch) {
      return;
    }

    if (searchValue != null) {
      this.recentSearches?.push(searchValue);
    }

    localStorage.setItem(this.recentSearchesKey, JSON.stringify(this.recentSearches));
  }
}
