import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: HttpClient) {
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
      //go to err page
    });
  }

  getChars() {
    return this.request('GET', `${environment.serverUrl}/characters`).catch((err: HttpErrorResponse) => {
      console.error('An error occurred:', err.error);
      //go to err page
    });
  }
  getCharInfo(id: number) {
    return this.request('GET', `${environment.serverUrl}/character/${id}`).catch((err: HttpErrorResponse) => {
      console.error('An error occurred:', err.error);
      //go to err page
    });
  }

  // createChars(event: { name: any; description: any; date: any; }) {
  //   return this.request('POST', `${environment.serverUrl}/event`, event);
  // }
  //
  // updateChars(event: { id: any; name?: any; description?: any; date?: any; }) {
  //   return this.request('PUT', `${environment.serverUrl}/event/${event.id}`, event);
  // }
  //
  // deleteChars(event: { id: any; }) {
  //   return this.request('DELETE', `${environment.serverUrl}/event/${event.id}`);
  // }
}
