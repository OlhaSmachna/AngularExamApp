import { Injectable } from "@angular/core";
import {Observable, Subject} from "rxjs";

@Injectable()
export class UserService {
  private logger = new Subject<boolean>();
  private loggedIn:boolean = false;

  isLoggedIn(): Observable<boolean> {
    return this.logger.asObservable();
  }

  logIn(providerResponse: string) {
    sessionStorage.setItem('token', providerResponse);
    this.loggedIn = true;
    this.logger.next(this.loggedIn);
  }

  logOut() {
    sessionStorage.removeItem('token');
    this.loggedIn = false;
    this.logger.next(this.loggedIn);
  }
}
