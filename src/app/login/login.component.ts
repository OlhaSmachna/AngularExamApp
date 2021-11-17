import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ServerService} from "../shared/server.service";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public alertShow:boolean=false;
  public alertMessage:string='';
  public name:string='';
  public password:string='';
  public nameValid:boolean=false;
  public passwordValid:boolean=false;
  public invalidNameClass:string='';
  public invalidPasswordClass:string='';

  constructor(public  router: Router, private server: ServerService, private logger:UserService) { }

  ngOnInit(): void {

  }

  public login():void{
    if(this.isEmptyOrSpaces(this.name))
    {
      this.nameValid=true;
      this.invalidNameClass='';
    }
    else {
      this.nameValid=false;
      this.invalidNameClass='is-invalid';
    }
    if(this.isEmptyOrSpaces(this.password))
    {
      this.passwordValid=true;
      this.invalidPasswordClass='';
    }
    else {
      this.passwordValid=false;
      this.invalidPasswordClass='is-invalid';
    }
    if(this.nameValid && this.passwordValid)
    {
      this.server.login(this.name, this.password).then((response: any) => {
        if(response){
          if (response.length)
          {
            if(response[0]){
              this.logger.logIn(response[0]);
              this.router.navigate(['characters']);
            }
            else {
              this.myAlert('Incorrect password');
            }
          }
          else {
            this.myAlert('Login not found');
          }
        }
      });
    }
  }

  isEmptyOrSpaces(str:string){
    return !(str === null || str.match(/^ *$/) !== null) && !str.includes('/');
  }

  myAlert(str:string)
  {
    this.alertShow=true;
    this.alertMessage=str;
  }

  alertClose($event: any) {
    $event.preventDefault();
    this.alertShow=false;
  }
}
