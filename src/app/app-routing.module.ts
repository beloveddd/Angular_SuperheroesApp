import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./login-page/login/login.component";
import { CreateUserComponent } from "./login-page/create-user/create-user.component";
import { HeroSelectionPageComponent } from "./hero-selection-page/hero-selection-page.component";

const routes: Routes = [
  { path: '', component: HeroSelectionPageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'create-user', component: CreateUserComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
