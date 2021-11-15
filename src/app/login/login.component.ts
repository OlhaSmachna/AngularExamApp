import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ServerService} from "../shared/server.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public validate={
    name: 'test',
    password: 'test'
  };
  public name:string='';
  public password:string='';

  constructor(public  router: Router, private server: ServerService) { }

  ngOnInit(): void {
  }

  public login():void{
    this.server.login(this.name, this.password).then((response: any) => {
      if(response){
        console.log('Response', response);
        if (response.length)
        {
          if(response[0]){
            sessionStorage.setItem('token', response[0]);
            this.router.navigate(['characters']);
          }
          else {
            alert('Incorrect password');
          }
        }
        else {
          alert('Login not found');
        }
      }


    });
  }

}
