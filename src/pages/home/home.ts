import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
//pages
import { CreditsPage, GamePage, ProfilePage, RulesPage } from "../index.pages";
// Providers
import { GameProvider } from '../../providers/game/game';

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
  arrayDificulties: string[] = ['BEGINNER', 'EASY', 'NORMAL', 'HARD', 'EXTREME'];
  constructor(public navCtrl: NavController, private gameProv: GameProvider, public alertCtrl: AlertController) {

  }
  changeDifficulty() {
    this.difficulty++;
    if (this.difficulty === 5) this.difficulty = 0;
  }
  playGame() {
    this.gameProv.loadCurrentGame().then(data => {
      if (data === null) {
        this.navCtrl.push(GamePage, { difficulty: this.difficulty });
      } else {
        let alert = this.alertCtrl.create({
          title: 'There is already a game started',
          message: 'You were playing a game some time ago. Do you want to resume it or start a new one?',
          buttons: [
            {
              text: 'Resume',
              handler: () => {
                // TODO: Resume game
              }
            },
            {
              text: 'New one',
              handler: () => {
                this.navCtrl.push(GamePage, { difficulty: this.difficulty });
              }
            }
          ]
        });
        alert.present();
      }
    });
  }
}
