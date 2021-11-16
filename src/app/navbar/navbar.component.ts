import { Component, OnInit } from '@angular/core';
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loggedIn:any=sessionStorage.getItem('token');
  constructor(private logger:UserService) { }

  ngOnInit(): void {
    this.logger.isLoggedIn().subscribe(updates => {this.loggedIn = updates;});
  }

  ev($event: MouseEvent) {
    $event.preventDefault();
  }

  logout() {
    this.logger.logOut();
  }
}
