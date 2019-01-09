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
  themes: Array<{ title: string, theme: string, color: string }>;

  constructor(public navCtrl: NavController, private gameProv: GameProvider, public alertCtrl: AlertController,
    private global: AppState) {
    this.themes = [
      { title: 'Default Red', theme: 'theme-red', color: 'assets/imgs/FF0000.png' },
      { title: 'Noir', theme: 'theme-noir', color: 'assets/imgs/333333.png' },
      { title: 'Clover', theme: 'theme-clover', color: 'assets/imgs/388E3C.png' },
      { title: 'Blueberry', theme: 'theme-blueberry', color: 'assets/imgs/1e88e5.png' }
    ];
  }

  ionViewWillEnter() {
    this.coolTitle();
  }

  changeTheme(theme:any){
     console.log("Now Changing theme to "+ theme);
     this.global.set('theme', theme);
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
