import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsefulProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UsefulProvider Provider');
  }
  shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle inside the array
    while (0 !== currentIndex) {
      // Pick a remaining element from the array
      randomIndex = Math.floor(Math.random() * currentIndex);
      // randomIndex is a random number between 0 and the array position
      currentIndex -= 1;
      // We get a new currentIndex and swap it with the current element.
      temporaryValue = array[currentIndex];
      // We save the currentIndex value in temporaryValue
      array[currentIndex] = array[randomIndex];
      // Now we fill the new currentIndex position with the value from the randomIndex
      array[randomIndex] = temporaryValue;
      // Lastly in the randomIndex position we put the temporaryValue we saved before
    }
    return array;
  }
  generateToken() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  getDate(date) {
    return date.toISOString();
  }
}
