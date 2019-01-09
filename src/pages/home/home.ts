import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
//pages
import { CreditsPage, GamePage, ProfilePage, RulesPage } from "../index.pages";
// Providers
import { GameProvider } from '../../providers/game/game';
// models
import { Game } from "../../models/index.models";
// themes
import { AppState } from '../../app/app.global';

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
  title: string[] = ['', '', '', '', '', '', '', '', ''];
  // Themes
  themes: Array<{ title: string, theme: string }>;
  theme: number = 0;

  constructor(public navCtrl: NavController, private gameProv: GameProvider, public alertCtrl: AlertController,
    private global: AppState) {
    this.themes = [
      { title: 'Default Red', theme: 'theme-red' },
      { title: 'dark', theme: 'theme-dark' },
      { title: 'Clover', theme: 'theme-clover' },
      { title: 'Blueberry', theme: 'theme-blueberry' },
      { title: 'Normal', theme: 'theme-normal' }
    ];
  }

  ionViewWillEnter() {
    this.coolTitle();
  }

  changeTheme() {
    this.theme++;
    if (this.theme === 5) this.theme = 0;
    console.log("Now Changing theme to " + this.themes[this.theme].theme);
    this.global.set('theme', this.themes[this.theme].theme);
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
    this.gameProv.loadCurrentGame().then((currentGame: Game) => {
      if (currentGame == null) {
        this.navCtrl.push(GamePage, { difficulty: this.difficulty });
      } else {
        let alert = this.alertCtrl.create({
          title: 'There is already a game started',
          message: `You played it last time the ${this.getdateClean(currentGame.datePaused)}. Do you want to resume it or start a new one?`,
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
  getdateClean(date) {
    let dateAux = new Date(date);
    let day, month, year, hour, minute, second;
    day = dateAux.getDate();
    month = dateAux.getMonth() + 1;
    year = dateAux.getFullYear();
    hour = dateAux.getHours();
    minute = dateAux.getMinutes();
    second = dateAux.getSeconds();
    return `${day}/${month}/${year} at ${hour}:${minute}:${second}`
  }
}
