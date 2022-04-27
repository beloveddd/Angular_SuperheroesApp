import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

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
  public lettersContainer!: HTMLElement | null;

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
    // const evTarget: EventTarget | null = event.target;
    // console.dir(evTarget.textContent)
  }
}
