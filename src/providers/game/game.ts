import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//models
import { Game } from "../../models/index.models";
// //providers
import { UsefulProvider } from "../useful/useful";

@Injectable()
export class GameProvider {

  constructor(public http: HttpClient, private usefulProv: UsefulProvider) {
    console.log('Hello GameProvider Provider');
  }


}
