import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AppState } from '../app/app.global';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  themes: Array<{ title: string, theme: string, color: string }>;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public global:AppState
  ) {

     // used for an example of ngFor and navigation
        this.themes = [
          { title: 'Default Red Theme', theme: 'theme-red', color:'assets/imgs/FF0000.png' },
          { title: 'Noir Theme', theme: 'theme-noir', color:'assets/imgs/333333.png' }
        ];



    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  changeTheme(theme:any){
    console.log("Now Changing theme to "+ theme);
    this.global.set('theme', theme);
  }
}
