import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
//pages
import {
  HomePage, GamePage, ProfilePage, RulesPage, CreditsPage
} from '../pages/index.pages';
//providers
import { GameProvider, UsefulProvider, UserProvider } from '../providers/index.providers';

@NgModule({
  declarations: [
    MyApp,
    HomePage, GamePage, ProfilePage, RulesPage, CreditsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
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
  ]
})
export class AppModule { }
