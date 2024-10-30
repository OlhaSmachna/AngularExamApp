import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServerService} from "../shared/server.service";
import {Router} from "@angular/router";
import {DataService} from "../shared/subject.service";
import { HostListener } from "@angular/core";
import {UserService} from "../shared/user.service";
import {Element} from "@angular/compiler";

@Component({
  selector: 'app-characters-info',
  templateUrl: './character-info.component.html',
  styleUrls: ['./character-info.component.scss', '../characters/bg.scss']
})
export class CharacterInfoComponent implements OnInit {
  updates: number[] = [];
  character_id:number=-1;
  image_size: string = '';
  btn_hidden: string = 'btn_hidden';

  public characters: Array<{
    //"personal info"
    id: any; name: any; rarity: any; element_name: any; region_name: any;

    //materials names
    primary_material: any;
    elemental_stone: any;
    local_material: any;
    secondary_material: any;
    talent_book: any;
    talent_material: any;
    crown: any;
    mora: any;
    exp_book: any;
    total_progress:number;

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

  //template for needed quantity (same for each char)
  //should be stored in db... anyway...
  public materials_count_layout={
    'lvl': {
      'mora': 1672000,
      'exp_books': 432,
    },
    'ascension': {
      'primary_material': {
        'q1': 1,
        'q2': 9,
        'q3': 9,
        'q4': 6,
      },
      'secondary_material': {
        'q1': 18,
        'q2': 30,
        'q3': 36,
      },
      'local_material': 168,
      'elemental_stone': 46,
      'mora': 420000,
    },
    'talents': {
      'talent_book': {
        'q1': 9,
        'q2': 63,
        'q3': 114,
      },
      'talent_material': 18,
      'secondary_material': {
        'q1': 18,
        'q2': 30,
        'q3': 36,
      },
      'crown': 3,
      'mora': 4950000,
    }
  }
  //sum of everything in materials_count_layout
  private max_proggress:number=7043046;

  constructor(private server: ServerService, private router:Router, private dataService: DataService, private logger:UserService) {
    this.onResize();
  }

  ngOnInit(): void {
    //getting id of selected char
    if(sessionStorage.getItem('selected_char')=='')
    {
      this.dataService.updates$.subscribe(updates => this.updates = [...updates]);
      if(!this.updates[0]){this.router.navigate(['characters']);}
      else {sessionStorage.setItem('selected_char', this.updates[0].toString());}
    }
    this.character_id=Number(sessionStorage.getItem('selected_char'));
    //request to server
    this.getCharInfo(this.character_id);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if(window.innerWidth <= 1313){this.image_size = 'full'}
    else {this.image_size = 'cut'}
  }

  private getCharInfo(id:number) {
    this.server.getCharInfo(id).then((response: any) => {
      if(response)
      {
        console.log('Response', response);
        if(response==-1)
        {
          this.logger.logOut();
          this.router.navigate(['/login']);
        }
        else {
          this.characters = response.map((ch: {
            id: any; name: any; rarity: any; element_name: any; region_name: any;
            primary_material: any;
            elemental_stone: any;
            local_material: any;
            secondary_material: any;
            talent_book: any;
            talent_material: any;
            crown: any;
            mora: any;
            total_progress:number;

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

  saveBtnShow($event:any) {
    //validate value here...
    this.btn_hidden='';

  }

  saveUserInfo()
  {
    if(this.characters && this.characters[0])this.server.updateUserCharInfo(this.characters[0]);
    this.btn_hidden='btn_hidden';
    //this.router.navigate(['/character']);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/character']));
  }
}




