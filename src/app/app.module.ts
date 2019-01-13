import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { HttpClientModule } from '@angular/common/http';
// import { SocialSharing } from '@ionic-native/social-sharing';

//pages
import {
  HomePage, GamePage, ProfilePage, RulesPage, CreditsPage
} from '../pages/index.pages';
//providers
import { UsefulProvider, UserProvider } from '../providers/index.providers';
import { GameProvider } from '../providers/game/game';
//storage
import { IonicStorageModule } from '@ionic/storage';
// Themes
import { AppState } from '../app/app.global';
@NgModule({
  declarations: [
    MyApp,
    HomePage, GamePage, ProfilePage, RulesPage, CreditsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, GamePage, ProfilePage, RulesPage, CreditsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GameProvider, UsefulProvider, UserProvider,
    AppState
    // SocialSharing
  ]
})
export class AppModule { }
