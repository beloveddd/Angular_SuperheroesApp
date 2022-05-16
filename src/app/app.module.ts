import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login-page/login/login.component';
import { HeroSelectionPageComponent } from './hero-selection-page/hero-selection-page.component';
import { HeroItemComponent } from './hero-selection-page/hero-item/hero-item.component';
import { AlphabetComponent } from "./hero-selection-page/alphabet/alphabet.component";
import { CreateUserComponent } from "./login-page/create-user/create-user.component";
import { UserInfoComponent } from './user-info-page/user-info-page.component';
import { HeroesListComponent } from './user-info-page/heroes-list/heroes-list.component';
import { BattlesHistoryComponent } from './user-info-page/battles-history/battles-history.component';
import { PowerUpsComponent } from "./user-info-page/powerups/powerups.component";
import { HeroInfoPageComponent } from './hero-info-page/hero-info-page.component';
import { HeroesBattlePageComponent } from './heroes-battle-page/heroes-battle-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    HeroSelectionPageComponent,
    HeroItemComponent,
    AlphabetComponent,
    UserInfoComponent,
    HeroesListComponent,
    BattlesHistoryComponent,
    PowerUpsComponent,
    HeroInfoPageComponent,
    HeroesBattlePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
