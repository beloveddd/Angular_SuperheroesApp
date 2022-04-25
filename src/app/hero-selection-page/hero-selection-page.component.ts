import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";

import { HeroSelectionService } from "../shared/services/hero-selecton.service";
import { AddValidators } from "../shared/app.validators";
import { HeroItem } from "../shared/app.interfaces";

@Component({
  selector: 'app-hero-selection-page',
  templateUrl: './hero-selection-page.component.html',
  styleUrls: ['./hero-selection-page.component.css']
})
export class HeroSelectionPageComponent implements OnInit {
  public formHero!: FormGroup;
  public isToggled: boolean = false;
  public results$!: Observable<any>;
  public recentSearches!: string[];

  public get searchInputControl(): AbstractControl {
    return this.formHero.controls.searchInput;
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

  public initRecentSearches(): void {
    this.recentSearches = this._heroSectionService.recentSearches;
  }

  public submit(): void {
    if (this.formHero.invalid) {
      return;
    }

    this.searchHeroes();
    this.createRecentSearches();
    this.formHero.reset();
  }

  public searchHeroes(): void {
      this._heroSectionService.searchHeroes(this.formHero.value.searchInput)
        .subscribe((response: { results: HeroItem[]; }) => {
        this._heroSectionService.foundedHeroes = response.results;
      });

      this.results$ = this._heroSectionService.searchHeroes(this.formHero.value.searchInput);
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
