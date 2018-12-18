import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsefulProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UsefulProvider Provider');
  }

  generateToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  getDate(date) {
    return date.toISOString();
  }
}
