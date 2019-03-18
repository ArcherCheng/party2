import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckboxValuePosterService {
  valuePoster = new BehaviorSubject(null);
  vals = {};
  constructor() {}

  postValue(valObj) {
    const controlName = Object.keys(valObj)[0];
    this.vals[controlName] = valObj[controlName];
    this.valuePoster.next(this.vals);
  }

  claerValue() {
    this.valuePoster.next(null);
  }

  getValue() {
    return this.valuePoster.asObservable();
  }
}
