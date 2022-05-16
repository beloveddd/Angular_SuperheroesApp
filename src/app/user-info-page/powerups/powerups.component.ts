import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { PowerUpsService } from "../../shared/services/powerUps.service";
import { PowerUpsItem } from "../../shared/app.interfaces";
import { HeroSelectionService } from "../../shared/services/hero-selecton.service";

@Component({
  selector: 'app-powerups',
  templateUrl: './powerups.component.html',
  styleUrls: ['./powerups.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PowerUpsComponent implements OnInit {

  public get powerUpsData(): PowerUpsItem[] {
    return this._powerUpsService.powerUpsData;
  }

  constructor(
    private _powerUpsService: PowerUpsService,
    private _heroSelectionService: HeroSelectionService,
  ) { }

  ngOnInit(): void {
    this._checkPowerUps();
  }

  public trackByFn(index: number): number {
    return index;
  }

  private _checkPowerUps(): void {
    if (this._heroSelectionService.ownedHeroes.length) {
      this._powerUpsService.checkPowerUps();
    }
  }
}
