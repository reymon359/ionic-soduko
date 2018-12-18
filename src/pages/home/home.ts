import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
//pages
import { CreditsPage, GamePage, ProfilePage, RulesPage } from "../index.pages";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  gamePage = GamePage;
  creditsPage = CreditsPage;
  profilePage = ProfilePage;
  rulesPage = RulesPage;

  difficulty: string = 'EASY'; // TODO: Save difficulty chosen in localstorage
  arrayDificulties: string[] = ['EASY', 'NORMAL', 'HARD'];
  constructor(public navCtrl: NavController) {

  }
  changeDifficulty() {
    let newDifficulty = this.arrayDificulties[this.arrayDificulties.indexOf(this.difficulty) + 1];
    if (newDifficulty === undefined) {
      newDifficulty = this.arrayDificulties[0];
    }
    this.difficulty = newDifficulty;
  }
}
