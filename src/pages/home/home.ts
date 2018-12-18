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

  difficulty: number = 0; // TODO: Save difficulty chosen in localstorage
  arrayDificulties: string[] = ['BEGINNER','EASY', 'NORMAL', 'HARD','EXTREME'];
  constructor(public navCtrl: NavController) {

  }
  changeDifficulty() {
    this.difficulty ++;
    if (this.difficulty === 5)   this.difficulty = 0;
  }
}
