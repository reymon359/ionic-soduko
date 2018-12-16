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

  dificulty: string = 'EASY'; // TODO: Save dificulty chosen in localstorage
  arrayDificulties: string[] = ['EASY', 'NORMAL', 'HARD'];
  constructor(public navCtrl: NavController) {

  }
  changeDificulty() {
    let newDificulty = this.arrayDificulties[this.arrayDificulties.indexOf(this.dificulty) + 1];
    if (newDificulty === undefined) {
      newDificulty = this.arrayDificulties[0];
    }
    this.dificulty = newDificulty;
  }
}
