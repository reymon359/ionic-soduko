import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Pages
import { HomePage } from '../pages/home/home';
import { GamePage } from '../pages/game/game';

// Providers
import { UsefulProvider, GameProvider } from "../providers/index.providers";

import { AppState } from '../app/app.global';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  platform: Platform;
  gamePage: GamePage;
  // themes: Array<{ title: string, theme: string, color: string }>;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public global: AppState,
    private gameProv: GameProvider, private usefulProv: UsefulProvider,
  ) {

    // used for an example of ngFor and navigation
    // this.themes = [
    //   { title: 'Default Red Theme', theme: 'theme-red', color:'assets/imgs/FF0000.png' },
    //   { title: 'Noir Theme', theme: 'theme-noir', color:'assets/imgs/333333.png' }
    // ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      if (platform.is('cordova')) {

        //Subscribe on pause
        this.platform.pause.subscribe(() => {
          console.log("pause");
          this.gamePage.timeController(false);
          this.gamePage.game.state = 'paused';
          this.gamePage.game.datePaused = this.usefulProv.getDate(new Date());
          this.gameProv.saveCurrentGame(this.gamePage.game);
          this.rootPage = HomePage;
        });

        //Subscribe on resume
        this.platform.resume.subscribe(() => {
          window['paused'] = 0;
          this.rootPage = HomePage;
        });
      }
    });

  }
  // changeTheme(theme:any){
  //   // console.log("Now Changing theme to "+ theme);
  //   this.global.set('theme', theme);
  // }
}
