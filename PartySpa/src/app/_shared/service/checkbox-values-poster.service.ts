import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckboxValuesPosterService {
  valuePoster = new BehaviorSubject(null);
  vals = {};

  constructor() {}

  postValue(valObj) {
    const contorlName = Object.keys(valObj)[0];
    this.vals[contorlName] = valObj[contorlName];
    this.valuePoster.next(this.vals);
  }

  clearValue() {
    this.valuePoster.next(null);
  }

  getValue() {
    return this.valuePoster.asObservable();
  }
}
