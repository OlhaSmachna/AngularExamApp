import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CharacterInfoComponent} from "../character-info/character-info.component";
import {TooltipModule} from "ngx-bootstrap";
import {FormsModule} from "@angular/forms";

const routes:Routes=[
  {path:'',component: CharacterInfoComponent}
]

@NgModule({
  declarations: [CharacterInfoComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TooltipModule,
        FormsModule,
    ]
})
export class CharacterInfoModule { }
