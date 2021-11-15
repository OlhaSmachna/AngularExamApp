import { Component, OnInit } from '@angular/core';
import {fromEvent} from "rxjs";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public message$:any;
  constructor() { }

  ngOnInit(): void {
    this.message$ = fromEvent<StorageEvent>(window, "storage").pipe(
      filter(event => event.storageArea === sessionStorage),
      filter(event => event.key === "message"),
      map(event => event.newValue)
    );
  }

  ev($event: MouseEvent) {
    $event.preventDefault();
  }

  logout() {
    sessionStorage.setItem('token', '');
  }
}
