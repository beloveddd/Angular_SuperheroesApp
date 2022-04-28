import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./login-page/login/login.component";
import { CreateUserComponent } from "./login-page/create-user/create-user.component";
import { HeroSelectionPageComponent } from "./hero-selection-page/hero-selection-page.component";
import { UserInfoComponent } from "./user-info-page/user-info-page.component";
import { HeroesListComponent } from "./user-info-page/heroes-list/heroes-list.component";
import { BattlesHistoryComponent } from "./user-info-page/battles-history/battles-history.component";
import { PowerupsComponent } from "./user-info-page/powerups/powerups.component";

const routes: Routes = [
  { path: '', component: HeroSelectionPageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'create-user', component: CreateUserComponent},
  { path: 'user-info', component: UserInfoComponent, children: [
      { path: '', redirectTo:'heroes-list', pathMatch:'full'},
      { path: 'heroes-list', component: HeroesListComponent},
      { path: 'battles-history', component: BattlesHistoryComponent},
      { path: 'powerups', component: PowerupsComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
