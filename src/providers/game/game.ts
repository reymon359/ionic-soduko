import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
//models
import { Game } from "../../models/index.models";
// //providers
import { UsefulProvider } from "../useful/useful";

@Injectable()
export class GameProvider {
  boardBase: any[] = [
    [2, 8, 6, 7, 5, 4, 9, 3, 1],
    [9, 3, 1, 2, 8, 6, 7, 5, 4],
    [7, 5, 4, 9, 1, 3, 8, 6, 2],
    [8, 9, 2, 6, 7, 5, 4, 1, 3],
    [6, 7, 5, 4, 3, 1, 2, 9, 8],
    [4, 1, 3, 8, 9, 2, 6, 7, 5],
    [5, 6, 9, 3, 4, 8, 1, 2, 7],
    [3, 4, 7, 1, 2, 9, 5, 8, 6],
    [1, 2, 8, 5, 6, 7, 3, 4, 9]
  ];
  public game: Game = {
    token: "",
    state: "",
    dateStart: null,
    datePaused: null,
    dateEnded: null,
    boardSolution: [],
    boardActual: [],
    boardHistory: [],
    moves: 0,
    time: 0
  }
  constructor(public http: HttpClient, private usefulProv: UsefulProvider) {
    console.log('Hello GameProvider Provider');
  }

  createNewGame() {

  }

  newBoard() {
    let board = this.boardBase;
    var random10 = Math.floor((Math.random() * 10) + 1);
    for (let r = 0; r < random10; r++) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          board[i][j] = board[i][j] + 1;
          if (board[i][j] == 10) {
            board[i][j] = 1;
          }
        }
      }
    }
    return this.usefulProv.shuffleArray(board);
  }
}
