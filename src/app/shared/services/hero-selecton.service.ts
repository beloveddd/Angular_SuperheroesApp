import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { Battle, HeroItem, HeroItemFullInfo, Response } from "../app.interfaces";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HeroSelectionService {
  public urlAPI: string = `https://superheroapi.com/api.php/${environment.idToken}/`;
  public urlAPISearch: string = `${this.urlAPI}search/`;
  public ownedHeroesKey: string = 'ownedHeroes';
  public selectedHeroKey: string = 'selectedHero';
  public recentSearchesKey: string = 'recentSearches';
  public battlesHistoryKey: string = 'battles';
  public foundedHeroes: HeroItem[] = [];
  public ownedHeroes: HeroItem[] = localStorage.getItem(this.ownedHeroesKey) ? JSON.parse(localStorage.getItem(this.ownedHeroesKey)!) : [];
  public selectedHero: HeroItem = localStorage.getItem(this.selectedHeroKey) ? JSON.parse(localStorage.getItem(this.selectedHeroKey)!) : {};
  public recentSearches: string[] = localStorage.getItem(this.recentSearchesKey) ? JSON.parse(localStorage.getItem(this.recentSearchesKey)!) : [];
  public heroItemId!: number;
  public battlesHistory: Battle[] = localStorage.getItem(this.battlesHistoryKey) ? JSON.parse(localStorage.getItem(this.battlesHistoryKey)!) : [];

  constructor(private _http: HttpClient) { }

  public searchHeroes(searchValue: string): Observable<HeroItem[]> {
    return this._http.get<Response>(this.urlAPISearch + searchValue)
        .pipe(
          map( (response: Response) => {
            const data: HeroItem[] = response.results.filter( (elem: HeroItem) => {
              elem.occupation = elem.work.occupation;

              return elem.powerstats.power !== 'null';
            });

            return this.filterData(data);
          })
        );
  }

  public searchHeroById(id: number): Observable<HeroItemFullInfo> {
    return this._http.get<HeroItemFullInfo>(this.urlAPI + id);
  }

  public createHero(heroItem: HeroItem): void {
    this.ownedHeroes.push(heroItem);
    this.selectedHero = this.ownedHeroes[this.ownedHeroes.length-1];
    this.saveToLocalStorage();
  }

  public deleteHero(heroItem: HeroItem): void {
    this.ownedHeroes = this.ownedHeroes.filter( (elem:HeroItem) => elem.id !== heroItem.id);
    this.selectedHero = this.ownedHeroes[this.ownedHeroes.length-1];
    this.saveToLocalStorage();
  }

  public saveToLocalStorage(): void {
    localStorage.setItem(this.ownedHeroesKey, JSON.stringify(this.ownedHeroes));

    this.ownedHeroes.length ?
      localStorage.setItem(this.selectedHeroKey, JSON.stringify(this.selectedHero)) :
      localStorage.removeItem(this.selectedHeroKey);
  }

  public createRecentSearches(searchValue: string): void {
    const matchingRecentSearch: string | undefined = this.recentSearches?.find( (elem: string) => elem === searchValue);

    if (matchingRecentSearch) {
      return;
    }

    this.recentSearches?.push(searchValue);
    localStorage.setItem(this.recentSearchesKey, JSON.stringify(this.recentSearches));
  }

  public filterData(data: HeroItem[]): HeroItem[]  {
    const selectedHeroes: HeroItem[] = data.filter( (elem: HeroItem) => {
      const selectedItem = this.ownedHeroes.find( (item: HeroItem) => item.id === elem.id);

      return elem.id === selectedItem?.id;
    });

    if (selectedHeroes.length) {
     data.forEach( (elem: HeroItem) => {
       if (selectedHeroes.includes(elem)) {
         elem.isSelected = true;
       }
     });
    }

    return data;
  }

  public getRandomIndex(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
