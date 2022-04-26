import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";
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
  public results$!: Observable<HeroItem[]>

  public get searchInputControl(): AbstractControl {
    return this.formHero.controls.searchInput;
  }
  public get results(): HeroItem[] {
    return this._heroSectionService.foundedHeroes;
  }

  constructor(
    private _heroSectionService: HeroSelectionService,
    private _http: HttpClient,
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createFormHero();
    this.initRecentSearches();
  }

  public createFormHero(): void {
    this.formHero = this._fb.group({
      searchInput: [
        null, [
          Validators.required,
          AddValidators.checkHeroInput
        ]
      ]
    })
  }

  public trackByFn(index: number, item: HeroItem): number {
    return item.id;
  }

  public initRecentSearches(): void {
    this.recentSearches = this._heroSectionService.recentSearches;
  }

  public submit(): void {
    if (this.formHero.invalid) {
      return;
    }

    this.getStream();
    this.searchHeroes();
    this.createRecentSearches();
    this.formHero.reset();
  }

  public getStream() {
    this.results$ = this._heroSectionService.searchHeroes(this.formHero.value.searchInput);
  }

  public searchHeroes(): Subscription {
      return this.results$
        .subscribe((response: HeroItem[]) => {
        this._heroSectionService.foundedHeroes = response;
        });
  }

  public createRecentSearches(): void {
    this._heroSectionService.createRecentSearches(this.formHero.value.searchInput);
    this.initRecentSearches();
  }

  public toggleAlphabet(): void {
    this.isToggled = !this.isToggled;
    this.isToggled ? this._heroSectionService.createAlphabet() : this._heroSectionService.deleteAlphabet();
  }
}
