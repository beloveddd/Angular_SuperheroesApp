import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';

import { HeroSelectionService } from "../../shared/services/hero-selecton.service";
import { HeroItem } from "../../shared/app.interfaces";

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlphabetComponent {
  @Output() onChange: EventEmitter<boolean> = new EventEmitter();
  @Output() onClickButton: EventEmitter<string | null> = new EventEmitter;

  public arrAlphabetEN: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  public newLetterClass: string = 'newLetter';
  public circleValue: string | null = this.arrAlphabetEN[0];
  public isToggled: boolean = false;
  public lettersContainer!: HTMLElement | null;

  constructor(
    private _heroSelectionService: HeroSelectionService,
    private _cd: ChangeDetectorRef
  ) { }

  public toggleAlphabet(): void {
    this.isToggled = !this.isToggled;
    this.onChange.emit(this.isToggled);
  }

  public searchByLetter(letter: string): void {
    this.circleValue = letter;
    this._heroSelectionService.searchHeroes(letter)
      .subscribe( (response: HeroItem[]) => {
        this._heroSelectionService.foundedHeroes = response;
        this._cd.markForCheck();
      });
    this._heroSelectionService.createRecentSearches(letter);
    this.toggleAlphabet();
    this.onClickButton.emit(letter);
  }

  public trackByFn(index: number): number {
    return index;
  }
}
