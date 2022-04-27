import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { HeroSelectionService } from "../../shared/services/hero-selecton.service";
import { HeroItem } from "../../shared/app.interfaces";

@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroItemComponent {
  @Input() heroItem!: HeroItem;

  public isSelected: boolean = false;

  constructor(
    private _heroSelectionService: HeroSelectionService,
    private _http: HttpClient
  )
  { }

  public select(): void {
    this.isSelected = true;
    this._heroSelectionService.createHero(this.heroItem);
  }
}
