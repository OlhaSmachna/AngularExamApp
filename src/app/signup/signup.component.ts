import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ServerService} from "../shared/server.service";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../login/login.component.css']
})
export class SignupComponent implements OnInit {
  public alertShow:boolean=false;
  public alertMessage:string='';

  public name:string='';
  public password:string='';
  public confirm:string='';

  public nameValid:boolean=false;
  public passwordValid:boolean=false;
  public confirmValid:boolean=false;

  public invalidNameClass:string='';
  public invalidPasswordClass:string='';
  public invalidConfirmClass:string='';

  constructor(public  router: Router, private server: ServerService, private logger:UserService) { }

  ngOnInit(): void {
  }

  public signup():void{
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

    if(this.password==this.confirm)
    {
      this.confirmValid=true;
      this.invalidConfirmClass='';
    }
    else {
      this.confirmValid=false;
      this.invalidConfirmClass='is-invalid';
    }
    if(this.nameValid && this.passwordValid && this.confirmValid)
    {
      this.server.signup(this.name, this.password).then((response: any) => {
        if(response){
          this.logger.logIn(response);
          this.router.navigate(['characters']);
        }
        else {
          this.myAlert('This login already taken!');
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
