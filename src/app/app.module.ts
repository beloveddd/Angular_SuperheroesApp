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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent,
    HeroSelectionPageComponent,
    HeroItemComponent,
    AlphabetComponent
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
