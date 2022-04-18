import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login-page/login/login.component';
import { CreateUserComponent } from './login-page/create-user/create-user.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserService } from "./shared/user.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
