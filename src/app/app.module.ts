import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./shared/auth.guard";
import {HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './navbar/navbar.component';
import {DataService} from "./shared/subject.service";
import {ComponentLoaderFactory, PositioningService, TooltipConfig} from "ngx-bootstrap";
import {UserService} from "./shared/user.service";

const routes: Routes = [
  {path: 'login', loadChildren: () => import('./login/login.module').then(m=>m.LoginModule)},
  {path: 'signup', loadChildren: () => import('./signup/signup.module').then(m=>m.SignupModule)},
  {path: 'characters', loadChildren: () => import('./characters/characters.module').then(m=>m.CharactersModule),canActivate:[AuthGuard],},
  {path: 'character', loadChildren: () => import('./character-info/character-info.module').then(m=>m.CharacterInfoModule),canActivate:[AuthGuard]},
  {path: '', redirectTo: 'characters', pathMatch: 'full'}
]

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        HttpClientModule,
    ],
    providers: [
      DataService,
      ComponentLoaderFactory,
      PositioningService,
      TooltipConfig,
      UserService
    ],
    exports: [
        NavbarComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
