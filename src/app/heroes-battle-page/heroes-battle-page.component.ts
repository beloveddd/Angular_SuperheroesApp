import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { Battle, HeroItem, PowerUpsItem } from "../shared/app.interfaces";
import { HeroSelectionService } from "../shared/services/hero-selecton.service";
import { PowerUpsService } from "../shared/services/powerUps.service";

@Component({
  selector: 'app-heroes-battle-page',
  templateUrl: './heroes-battle-page.component.html',
  styleUrls: ['./heroes-battle-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesBattlePageComponent implements OnInit {
  public results: string[] = ['Win', 'Loss', 'In a draw'];
  public myHero!: HeroItem;
  public opponentHero!: HeroItem;
  public isToggled: boolean = false;
  public inProcess: boolean = false;
  public inDraw: boolean = false;
  public winnerHero!: HeroItem;
  public battleTime!: Date;
  public result!: string;

  public get powerUpsData(): PowerUpsItem[] {
    return this._powerUpsService.powerUpsData;
  }

  constructor(
    private _heroSelectionService: HeroSelectionService,
    private _powerUpsService: PowerUpsService,
    private _router: Router,
    private _cd: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this._renderHeroes();
  }

  public searchHeroById(id: number): void {
    this._router.navigate(['/hero-info'], { queryParams: { id } });
  }

  public usePowerUps(benefit: string, value: string, title: string): void {
    const selectedItem = this.powerUpsData.find( (elem: PowerUpsItem) => elem.title === title);

    if (!selectedItem!.usesLeft) {
      return;
    }

    this.myHero.powerstats[benefit] = (+this.myHero.powerstats[benefit] + +value).toString();
    selectedItem!.usesLeft--;
  }

  public fightHeroes(): void {
    let counterMyHero: number = 0;
    let counterOpponentHero: number = 0;
    const myHeroValues: string[] = Object.values(this.myHero.powerstats);
    const opponentHeroValues: string[] = Object.values(this.opponentHero.powerstats);

    myHeroValues.forEach( (value: string, index: number) => {
      if (+value === +opponentHeroValues[index]) {
        return;
      }

      +value > +opponentHeroValues[index] ? counterMyHero++ : counterOpponentHero++;
    });

    this._setResult(counterMyHero, counterOpponentHero);
    this._saveHistory();
  }

  private _setResult(counterMyHero: number, counterOpponentHero: number): void {
    this.battleTime = new Date();

    switch (true) {
      case counterMyHero === counterOpponentHero:
        setTimeout( () => {
          this.inDraw = true;
          this._cd.markForCheck();
        }, 5000);

        this.result = this.results[2];
        this.inProcess = true;
        break;
      case counterMyHero > counterOpponentHero:
        setTimeout(() => {
          this.winnerHero = this.myHero;
          this._cd.markForCheck();
        }, 5000);

        this.result = this.results[0];
        this.isToggled = true;
        break;
      case counterMyHero < counterOpponentHero:
        setTimeout(() => {
          this.winnerHero = this.opponentHero;
          this._cd.markForCheck();
        }, 5000);

        this.result = this.results[1];
        this.isToggled = true;
        break;
    }
  }

  private _saveHistory(): void {
    const battle: Battle = {
      battleTime: this.battleTime,
      myHeroId: this.myHero.id,
      myHero: this.myHero.name,
      opponentHeroId: this.opponentHero.id,
      opponentHero: this.opponentHero.name,
      result: this.result
    }

    this._heroSelectionService.battlesHistory.push(battle);
    localStorage.setItem(this._heroSelectionService.battlesHistoryKey, JSON.stringify(this._heroSelectionService.battlesHistory));
  }

  private _renderHeroes(): void {
    this.myHero = this._heroSelectionService.selectedHero;
    this.opponentHero = this._heroSelectionService.ownedHeroes[this._heroSelectionService.getRandomIndex(0, this._heroSelectionService.ownedHeroes.length-1)];

    while (this.opponentHero.id === this.myHero.id) {
      this.opponentHero = this._heroSelectionService.ownedHeroes[this._heroSelectionService.getRandomIndex(0, this._heroSelectionService.ownedHeroes.length-1)];
    }
  }
}
