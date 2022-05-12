import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { HeroSelectionService } from "../../shared/services/hero-selecton.service";
import { HeroItem } from "../../shared/app.interfaces";
import { PowerUpsService } from "../../shared/services/powerUps.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-hero-item',
  templateUrl: './hero-item.component.html',
  styleUrls: ['./hero-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroItemComponent {
  @Input() heroItem!: HeroItem;
  @Output() onDelete: EventEmitter<void> = new EventEmitter();

  public get selectedHero(): HeroItem | undefined {
    const isSelected = this._heroSelectionService.selectedHero && this._heroSelectionService.selectedHero.id === this.heroItem.id;

    if (!isSelected)  {
      return;
    }

    return this._heroSelectionService.selectedHero;
  }

  constructor(
    private _heroSelectionService: HeroSelectionService,
    private _powerUpsService: PowerUpsService,
    private _router: Router,
    public _cd: ChangeDetectorRef
  ) { }

  public select(): void {
    this.heroItem.isSelected = true;
    this._heroSelectionService.createHero(this.heroItem);
  }

  public delete(): void {
    this.heroItem.isSelected = false;
    this._heroSelectionService.deleteHero(this.heroItem);
    this.onDelete.emit();
  }

  public toggleSelection(): void {
    if (this.selectedHero) {
      return;
    }

    this._heroSelectionService.selectedHero = this.heroItem;
    this._heroSelectionService.saveToLocalStorage();
  }

  public searchHeroById(id: number): void {
    this._router.navigate(['/hero-info'], { queryParams: { id } });
  }
}
