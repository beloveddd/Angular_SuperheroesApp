import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alphabet',
  templateUrl: './alphabet.component.html',
  styleUrls: ['./alphabet.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlphabetComponent {
  @Output() onChange: EventEmitter<boolean> = new EventEmitter();

  public arrAlphabetEN: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  public newLetterClass: string = 'newLetter';
  public isToggled: boolean = false;

  public createAlphabet(): void {
    const lettersContainer: HTMLElement | null = document.querySelector('#lettersContainer');

    for (let i: number = 0; i < this.arrAlphabetEN.length; i++) {
      const newLetter: HTMLElement = document.createElement('button');

      newLetter.className = this.newLetterClass;
      newLetter.textContent = this.arrAlphabetEN[i];
      lettersContainer!.append(newLetter);
    }
  }

  public deleteAlphabet(): void {
    const lettersContainer: HTMLElement | null = document.querySelector('#lettersContainer');

    lettersContainer!.innerHTML = '';
  }

  public toggleAlphabet(): void {
    this.isToggled = !this.isToggled;
    this.onChange.emit(this.isToggled);

    this.isToggled ? this.createAlphabet() : this.deleteAlphabet();
  }

  public searchByLetter(): void {

  }
}
