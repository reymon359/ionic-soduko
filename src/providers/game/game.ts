import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from "ionic-angular";
import { Storage } from "@ionic/storage";

@Injectable()
export class GameProvider {

  constructor(public http: HttpClient, private platform: Platform, private storage: Storage) {
    console.log('Hello GameProvider Provider');
  }

  saveCurrentGame(game) {
    if (this.platform.is("cordova")) {
      // Mobile
      this.storage.set('currentGame', game);
    } else {
      // PC
      let gameToSave = JSON.stringify(game);
      localStorage.setItem('currentGame', gameToSave);
    }
  }
  loadCurrentGame() {
    let promise = new Promise((resolve, reject) => {
      if (this.platform.is("cordova")) {
        // Mobile
        this.storage.ready()
          .then(() => {
            this.storage.get("currentGame")
              .then(currentGame => {
                if (currentGame) {
                  resolve(currentGame);
                }
                else {
                  resolve(null);
                }
              })
          })
      } else {
        // PC
        if (localStorage.getItem("currentGame")) {
          let currentGame = JSON.parse(window.localStorage.getItem('currentGame'));
          resolve(currentGame);
        } else {
          resolve(null);
        }
      }
    });
    return promise;
  }

}
