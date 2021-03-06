import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from "@angular/router";

import { HeroSelectionService } from "../../shared/services/hero-selecton.service";
import { Battle } from "../../shared/app.interfaces";

@Component({
  selector: 'app-battles-history',
  templateUrl: './battles-history.component.html',
  styleUrls: ['./battles-history.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BattlesHistoryComponent {
  public tableNames: string[] = ['Battle time', 'Hero name', 'Opponent name', 'Battle result'];

  public get battlesList(): Battle[] {
    return this._heroSelectionService.battlesHistory;
  }

  constructor(
    private _heroSelectionService: HeroSelectionService,
    private _router: Router
  ) { }

  public searchHeroById(id: number): void {
    this._router.navigate(['/hero-info'], { queryParams: { id } });
  }

  public sort(value: string): void {
    switch (true) {
      case value === this.tableNames[0]:
        this.battlesList.sort( (a: Battle, b: Battle) =>  new Date(a.battleTime).getTime() - new Date(b.battleTime).getTime());
        break;
      case value === this.tableNames[1]:
        this.battlesList.sort( (a: Battle, b: Battle) =>  a.myHero.localeCompare(b.myHero));
        break;
      case value === this.tableNames[2]:
        this.battlesList.sort( (a: Battle, b: Battle) =>  a.opponentHero.localeCompare(b.opponentHero));
        break;
      case value === this.tableNames[3]:
        this.battlesList.sort( (a: Battle, b: Battle) =>  b.result.localeCompare(a.result));
        break;
    }
  }
}
