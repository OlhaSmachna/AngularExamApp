import { Component, OnInit } from '@angular/core';
import {ServerService} from "../shared/server.service";
import {Router} from "@angular/router";
import {DataService} from "../shared/subject.service";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss', './bg.scss']
})
export class CharactersComponent implements OnInit {
  public characters: Array<{
    //"personal" info
    id: any; name: any; rarity: any; element_name: any; region_name: any; total_progress:number;
    //user stored quantity of materials
    ascension__elemental_stone: number;
    ascension__local_material: number;
    ascension__mora: number;
    ascension__primary_material__q1: number;
    ascension__primary_material__q2: number;
    ascension__primary_material__q3: number;
    ascension__primary_material__q4: number;
    ascension__secondary_material__q1: number;
    ascension__secondary_material__q2: number;
    ascension__secondary_material__q3: number;
    lvl__exp_book: number;
    lvl__mora: number;
    talents__crown: number;
    talents__mora: number;
    talents__secondary_material__q1: number;
    talents__secondary_material__q2: number;
    talents__secondary_material__q3: number;
    talents__talent_book__q1: number;
    talents__talent_book__q2: number;
    talents__talent_book__q3: number;
    talents__talent_material: number;
  }> = [];
  private max_proggress:number=7043046;

  constructor(private server: ServerService, private router:Router, private dataService: DataService, private logger:UserService) { }

  ngOnInit(): void {
    sessionStorage.setItem('selected_char', '');
    this.getChars();
  }

  private getChars() {
    this.server.getChars().then((response: any) => {
      if(response){
        //console.log('Response', response);
        if(response==-1)
        {
          this.logger.logOut();
          this.router.navigate(['/login']);
        }
        else {
          this.characters = response.map((ch: {
            id: any; name: any; rarity: any; element_name: any; region_name: any; total_progress:number;

            ascension__elemental_stone: number;
            ascension__local_material: number;
            ascension__mora: number;
            ascension__primary_material__q1: number;
            ascension__primary_material__q2: number;
            ascension__primary_material__q3: number;
            ascension__primary_material__q4: number;
            ascension__secondary_material__q1: number;
            ascension__secondary_material__q2: number;
            ascension__secondary_material__q3: number;
            lvl__exp_book: number;
            lvl__mora: number;
            talents__crown: number;
            talents__mora: number;
            talents__secondary_material__q1: number;
            talents__secondary_material__q2: number;
            talents__secondary_material__q3: number;
            talents__talent_book__q1: number;
            talents__talent_book__q2: number;
            talents__talent_book__q3: number;
            talents__talent_material: number;
          }) => {
            //set to 0 anything that doesnt have record in db yet
            ch.ascension__elemental_stone=ch.ascension__elemental_stone??0;
            ch.ascension__local_material=ch.ascension__local_material??0;
            ch.ascension__mora=ch.ascension__mora??0;
            ch.ascension__primary_material__q1=ch.ascension__primary_material__q1??0;
            ch.ascension__primary_material__q2=ch.ascension__primary_material__q2??0;
            ch.ascension__primary_material__q3=ch.ascension__primary_material__q3??0;
            ch.ascension__primary_material__q4=ch.ascension__primary_material__q4??0;
            ch.ascension__secondary_material__q1=ch.ascension__secondary_material__q1??0;
            ch.ascension__secondary_material__q2=ch.ascension__secondary_material__q2??0;
            ch.ascension__secondary_material__q3=ch.ascension__secondary_material__q3??0;
            ch.lvl__exp_book=ch.lvl__exp_book??0;
            ch.lvl__mora=ch.lvl__mora??0;
            ch.talents__crown=ch.talents__crown??0;
            ch.talents__mora=ch.talents__mora??0;
            ch.talents__secondary_material__q1=ch.talents__secondary_material__q1??0;
            ch.talents__secondary_material__q2=ch.talents__secondary_material__q2??0;
            ch.talents__secondary_material__q3=ch.talents__secondary_material__q3??0;
            ch.talents__talent_book__q1=ch.talents__talent_book__q1??0;
            ch.talents__talent_book__q2=ch.talents__talent_book__q2??0;
            ch.talents__talent_book__q3=ch.talents__talent_book__q3??0;
            ch.talents__talent_material=ch.talents__talent_material??0;

            ch.rarity=Array(ch.rarity);
            let sum=ch.ascension__elemental_stone+
              ch.ascension__local_material+
              ch.ascension__mora+
              ch.ascension__primary_material__q1+
              ch.ascension__primary_material__q2+
              ch.ascension__primary_material__q3+
              ch.ascension__primary_material__q4+
              ch.ascension__secondary_material__q1+
              ch.ascension__secondary_material__q2+
              ch.ascension__secondary_material__q3+
              ch.lvl__exp_book+
              ch.lvl__mora+
              ch.talents__crown+
              ch.talents__mora+
              ch.talents__secondary_material__q1+
              ch.talents__secondary_material__q2+
              ch.talents__secondary_material__q3+
              ch.talents__talent_book__q1+
              ch.talents__talent_book__q2+
              ch.talents__talent_book__q3+
              ch.talents__talent_material;
            ch.total_progress=sum/this.max_proggress*100;
            if(ch.total_progress>0 && ch.total_progress<1)ch.total_progress=1;
            else ch.total_progress=Math.round(ch.total_progress);
            return ch;
          });
        }
      }
    });
  }

  cardSelect(id: number) {
    this.dataService.postData(id);
    this.router.navigate(['character']);
  }
}
