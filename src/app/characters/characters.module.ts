import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {CharactersComponent} from "./characters.component";
import {TooltipModule} from "ngx-bootstrap";

const routes:Routes=[
  {path:'',component: CharactersComponent}
]

@NgModule({
  declarations: [CharactersComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        TooltipModule,
    ]
})
export class CharactersModule { }
