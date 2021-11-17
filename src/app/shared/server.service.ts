import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from "../../environments/environment";
import {UserService} from "./user.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient, private logger:UserService, private router:Router) {
  }

  private async request(method: string, url: string, data?: any) {

    const result = this.http.request(method, url, {
      body: data,
      responseType: 'json',
      observe: 'body',
      headers: {
      }
    });
    return new Promise((resolve, reject) => {
      result.subscribe(resolve, reject);
    });
  }

  login(login: string, password: string) {
    return this.request('POST', `${environment.serverUrl}/login/${login}&${password}`).catch((err: HttpErrorResponse) => {
      console.error('An error occurred:', err.error);
      this.router.navigate(['err500']);
    });
  }
  signup(login: string, password: string) {
    return this.request('POST', `${environment.serverUrl}/signup/${login}&${password}`).catch((err: HttpErrorResponse) => {
      console.error('An error occurred:', err.error);
      this.router.navigate(['err500']);
    });
  }

  getChars() {
    let token=sessionStorage.getItem('token');
    if(!this.isEmptyOrSpaces(token))
    {
      token='0';
    }
    return this.request('GET', `${environment.serverUrl}/characters/${token}`).catch((err: HttpErrorResponse) => {
      console.error('An error occurred:', err.error);
      this.router.navigate(['err500']);
    });
  }
  getCharInfo(id: number) {
    let token=sessionStorage.getItem('token');
    if(!this.isEmptyOrSpaces(token))
    {
      token='0';
    }
    return this.request('GET', `${environment.serverUrl}/character/info/${id}&${token}`).catch((err: HttpErrorResponse) => {
      console.error('An error occurred:', err.error);
      this.router.navigate(['err500']);
    });
  }

  updateUserCharInfo(char: {
    id: any; name: any; rarity: any; element_name: any; region_name: any;

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
  }) {
    let token=sessionStorage.getItem('token');
    if(!this.isEmptyOrSpaces(token))
    {
      token='0';
    }
    return this.request('PUT', `${environment.serverUrl}/character/${char.id}&${token}`, char).catch((err: HttpErrorResponse)=> {
      console.error('An error occurred:', err.error);
      this.router.navigate(['err500']);
    });
  }

  isEmptyOrSpaces(str:string | null){
    return !(str === null || str.match(/^ *$/) !== null) && !str.includes('/');
  }



}
