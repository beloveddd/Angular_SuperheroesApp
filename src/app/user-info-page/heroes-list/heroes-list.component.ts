import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { HeroSelectionService } from "../../shared/services/hero-selecton.service";
import { HeroItem } from "../../shared/app.interfaces";

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesListComponent implements OnInit {

  public ownedHeroes: HeroItem[] = [];

  constructor(
    private _heroSelectionService: HeroSelectionService
  ) { }

  public ngOnInit(): void {
    this.renderHeroesList();
  }

  public renderHeroesList(): void {
    this.ownedHeroes = this._heroSelectionService.ownedHeroes;
  }

  public trackByFn(index: number): number {
    return index;
  }

  public handleDelete(): void {
    this.renderHeroesList();
  }
}
