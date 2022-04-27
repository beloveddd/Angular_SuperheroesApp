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
  public targetClass: string = 'BUTTON';
  public circleValue: string | null = this.arrAlphabetEN[0];
  public isToggled: boolean = false;
  public lettersContainer!: HTMLElement | null;


  constructor(
    private _heroSelectionService: HeroSelectionService,
    private _cd: ChangeDetectorRef
  ) { }

  public createAlphabet(): void {
     this.lettersContainer = document.querySelector('#lettersContainer');

    this.arrAlphabetEN.forEach( (elem: string, index: number) => {
        const newLetter: HTMLElement = document.createElement('button');

        newLetter.className = this.newLetterClass;
        newLetter.textContent = this.arrAlphabetEN[index];
        this.lettersContainer!.append(newLetter);
      }
    )
  }

  public deleteAlphabet(): void {
    this.lettersContainer!.innerHTML = '';
  }

  public toggleAlphabet(): void {
    this.isToggled = !this.isToggled;
    this.onChange.emit(this.isToggled);

    this.isToggled ? this.createAlphabet() : this.deleteAlphabet();
  }

  public searchByLetter(event: Event): void {
    const evTarget: HTMLElement = event.target as HTMLElement;

    if (evTarget.tagName !== this.targetClass) {
      return;
    }

    const buttonValue: string | null = evTarget.textContent;

    this.circleValue = buttonValue;
    this._heroSelectionService.searchHeroes(buttonValue)
      .subscribe( (response: HeroItem[]) => {
        this._heroSelectionService.foundedHeroes = response;
        this._cd.markForCheck();
      });
    this._heroSelectionService.createRecentSearches(buttonValue);
    this.toggleAlphabet();
    this.onClickButton.emit(buttonValue);
  }
}
