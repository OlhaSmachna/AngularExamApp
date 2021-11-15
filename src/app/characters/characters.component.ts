import { Component, OnInit } from '@angular/core';
import {ServerService} from "../shared/server.service";
import {Router} from "@angular/router";
import {DataService} from "../shared/subject.service";

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss', './bg.scss']
})
export class CharactersComponent implements OnInit {
  public characters: Array<{id: any; name: any; rarity: any; element_name: any; region_name: any}> = [];
  // currentChar: any = {id: any; name: any; rarity: any; element_name: any; region_name: any};

  constructor(private server: ServerService, private router:Router, private dataService: DataService) { }

  ngOnInit(): void {
    localStorage.setItem('selected_char', '');
    this.getChars();
  }

  private getChars() {
    this.server.getChars().then((response: any) => {
      if(response){
        console.log('Response', response);
        this.characters = response.map((ch: { id: any; name: any; rarity: any; element_name: any; region_name: any }) => {
           ch.rarity=Array(ch.rarity);
           return ch;
        });
      }

    });
  }

  cardSelect(id: number) {
    this.dataService.postData(id);
    this.router.navigate(['character']);
  }
}
