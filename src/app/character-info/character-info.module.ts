import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CharacterInfoComponent} from "../character-info/character-info.component";
import {TooltipModule} from "ngx-bootstrap";

const routes:Routes=[
  {path:'',component: CharacterInfoComponent}
]

@NgModule({
  declarations: [CharacterInfoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TooltipModule,
  ]
})
export class CharacterInfoModule { }
