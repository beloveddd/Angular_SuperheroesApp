import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { HeroSelectionService } from "../shared/services/hero-selecton.service";
import { AddValidators } from "../shared/app.validators";
import { HeroItem } from "../shared/app.interfaces";

@Component({
  selector: 'app-hero-selection-page',
  templateUrl: './hero-selection-page.component.html',
  styleUrls: ['./hero-selection-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSelectionPageComponent implements OnInit {
  public formHero!: FormGroup;
  public isToggled: boolean = false;
  public recentSearches!: string[];
  public inputValue: string | null = "";

  public get searchInputControl(): AbstractControl {
    return this.formHero.controls.searchInput;
  }
  public get results(): HeroItem[] {
    return this._heroSectionService.foundedHeroes;
  }

  constructor(
    private _heroSectionService: HeroSelectionService,
    private _http: HttpClient,
    private _fb: FormBuilder,
    private _cd: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this._createFormHero();
    this._initRecentSearches();
  }

  public trackByFn(index: number, item: HeroItem): number {
    return item.id;
  }

  public submit(): void {
    if (this.formHero.invalid) {
      return;
    }

    this.searchHeroes();
  }

  public searchHeroes(): void {
    this.results.length = 0;

    this._heroSectionService.searchHeroes(this.formHero.value.searchInput)
        .subscribe((response: HeroItem[]) => {
          this._heroSectionService.foundedHeroes = response;
          this._cd.markForCheck();

          if (this.results.length) {
            this._createRecentSearches();
          }

          this.formHero.reset();
          },
          (error) => {
            console.log(error.message);
          });
  }

  public handleChange(isToggled: boolean): void {
    this.isToggled = isToggled;
  }

  public handleClickButton(buttonValue: string | null): void {
    this.inputValue = buttonValue;
  }

  private _createFormHero(): void {
    this.formHero = this._fb.group({
      searchInput: [
        null, [
          Validators.required,
          AddValidators.checkHeroInput
        ]
      ]
    });
  }

  private _initRecentSearches(): void {
    this.recentSearches = this._heroSectionService.recentSearches;
  }

  private _createRecentSearches(): void {
    this._heroSectionService.createRecentSearches(this.formHero.value.searchInput);
    this._initRecentSearches();
  }
}
