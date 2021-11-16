import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../login/login.component";
import {SignupComponent} from "./signup.component";
import {FormsModule} from "@angular/forms";

const routes:Routes=[
  {path:'',component: SignupComponent}
]

@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})
export class SignupModule { }
