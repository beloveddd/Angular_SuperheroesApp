import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() onDelete: EventEmitter<void> = new EventEmitter();

  constructor(
    private _heroSelectionService: HeroSelectionService
  )
  { }

  public select(): void {
    this.heroItem.isSelected = true;
    this._heroSelectionService.createHero(this.heroItem);
  }

  public delete(): void {
    this._heroSelectionService.deleteHero(this.heroItem);
    this.onDelete.emit();
  }

}
