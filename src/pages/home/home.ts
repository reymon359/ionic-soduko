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
  title: string[] = [];
  constructor(public navCtrl: NavController, private gameProv: GameProvider, public alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.coolTitle();
  }
  coolTitle() {
    let titleAux = ['S', 'O', 'D', 'U', 'K', 'O'];
    for (let i = 0; i < 3; i++) {
      let randomPos = Math.floor(Math.random() * titleAux.length + i) + 1;
      titleAux.splice(randomPos, 0, "");
    }
    this.title = titleAux;
  }
  changeDifficulty() {
    this.difficulty++;
    if (this.difficulty === 5) this.difficulty = 0;
  }
  playGame() {
    this.gameProv.loadCurrentGame().then(data => {
      console.log(data);
      if (data == "There is no game saved") {
        this.navCtrl.push(GamePage, { difficulty: this.difficulty });
      } else {
        let alert = this.alertCtrl.create({
          title: 'There is already a game started',
          message: 'You were playing a game some time ago. Do you want to resume it or start a new one?',
          buttons: [
            {
              text: 'Resume',
              handler: () => {
                this.navCtrl.push(GamePage, { resumeGame: true });
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
