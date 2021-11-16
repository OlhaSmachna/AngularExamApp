import {Component, OnDestroy, OnInit} from '@angular/core';
import {ServerService} from "../shared/server.service";
import {Router} from "@angular/router";
import {DataService} from "../shared/subject.service";
import { HostListener } from "@angular/core";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-characters-info',
  templateUrl: './character-info.component.html',
  styleUrls: ['./character-info.component.scss', '../characters/bg.scss']
})
export class CharacterInfoComponent implements OnInit {
  public characters: Array<{id: any; name: any; rarity: any; element_name: any; region_name: any;
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
  }> = [];
  updates: number[] = [];
  character_id:number=0;
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
  // currentChar: any = {id: any; name: any; rarity: any; element_name: any; region_name: any};
  public image_size: string = '';

  constructor(private server: ServerService, private router:Router, private dataService: DataService, private logger:UserService) {
    this.onResize();
  }

  ngOnInit(): void {
    //localStorage.setItem('selected_char', '');
    if(localStorage.getItem('selected_char')=='')
    {
      this.dataService.updates$.subscribe(updates => this.updates = [...updates]);
      if(!this.updates[0]){this.router.navigate(['characters']);}
      else {localStorage.setItem('selected_char', this.updates[0].toString());}
    }
    this.character_id=Number(localStorage.getItem('selected_char'));
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
          this.characters = response.map((ch: { id: any; name: any; rarity: any; element_name: any; region_name: any;
            primary_material: any;
            elemental_stone: any;
            local_material: any;
            secondary_material: any;
            talent_book: any;
            talent_material: any;
            crown: any;
            mora: any;
            total_progress:number;}) => {
            ch.rarity=Array(ch.rarity);
            if(ch.id==19)ch.total_progress=50;
            else ch.total_progress=0;
            return ch;
          });
        }
      }
    });
  }


}




