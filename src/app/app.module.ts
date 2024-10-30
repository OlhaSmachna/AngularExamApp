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
import { Err404Component } from './err404/err404.component';
import { Err500Component } from './err500/err500.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  {path: 'login', loadChildren: () => import('./login/login.module').then(m=>m.LoginModule)},
  {path: 'signup', loadChildren: () => import('./signup/signup.module').then(m=>m.SignupModule)},
  {path: 'characters', loadChildren: () => import('./characters/characters.module').then(m=>m.CharactersModule),canActivate:[AuthGuard],},
  {path: 'character', loadChildren: () => import('./character-info/character-info.module').then(m=>m.CharacterInfoModule),canActivate:[AuthGuard]},
  {path: '', redirectTo: 'characters', pathMatch: 'full'},
  {path: 'err500', component: Err500Component},
  {path: '**', component: Err404Component},
]

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        Err404Component,
        Err500Component,
        FooterComponent,
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
