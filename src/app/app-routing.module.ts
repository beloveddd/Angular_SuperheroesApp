import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./login-page/login/login.component";
import { CreateUserComponent } from "./login-page/create-user/create-user.component";
import { HeroSelectionPageComponent } from "./hero-selection-page/hero-selection-page.component";
import { UserInfoComponent } from "./user-info-page/user-info-page.component";
import { HeroesListComponent } from "./user-info-page/heroes-list/heroes-list.component";
import { BattlesHistoryComponent } from "./user-info-page/battles-history/battles-history.component";
import { PowerUpsComponent } from "./user-info-page/powerups/powerups.component";
import { HeroInfoPageComponent } from "./hero-info-page/hero-info-page.component";
import { HeroesBattlePageComponent } from "./heroes-battle-page/heroes-battle-page.component";
import { BattleGuard } from "./shared/battle.guard";

const routes: Routes = [
  { path: '', component: HeroSelectionPageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'create-user', component: CreateUserComponent},
  { path: 'user-info', component: UserInfoComponent, children: [
      { path: '', redirectTo:'heroes-list', pathMatch:'full'},
      { path: 'heroes-list', component: HeroesListComponent},
      { path: 'battles-history', component: BattlesHistoryComponent},
      { path: 'powerups', component: PowerUpsComponent},
    ]
  },
  { path: 'hero-info', component: HeroInfoPageComponent},
  { path: 'heroes-battle', component: HeroesBattlePageComponent, canActivate: [BattleGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [BattleGuard]
})
export class AppRoutingModule {

}
