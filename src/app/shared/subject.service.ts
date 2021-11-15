import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class DataService {
  updates$ = new BehaviorSubject<number[]>([]);

  constructor() {}

  postData(value: number): void {
    this.updates$.value.push(value);
    this.updates$.next([...this.updates$.value]);
  }
}
