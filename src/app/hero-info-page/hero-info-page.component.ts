import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HeroSelectionService } from "../shared/services/hero-selecton.service";
import { HeroItemFullInfo } from "../shared/app.interfaces";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-hero-info-page',
  templateUrl: './hero-info-page.component.html',
  styleUrls: ['./hero-info-page.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroInfoPageComponent implements OnInit {
  public heroItem!: HeroItemFullInfo;

  constructor(
    private _heroSelectionService: HeroSelectionService,
    private _route: ActivatedRoute,
    private _cd: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this._showHero();
  }

  private _showHero(): void {
    this._route.queryParams.subscribe( (params: Params) => {
      this._heroSelectionService.heroItemId = params['id'];
      this._cd.markForCheck();
    } );

    this._heroSelectionService.searchHeroById(this._heroSelectionService.heroItemId)
      .subscribe((item: HeroItemFullInfo) => {
        this.heroItem = item;
        this._cd.markForCheck();
    });
  }
}
