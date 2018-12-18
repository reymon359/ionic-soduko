import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// Providers
import { UsefulProvider } from "../../providers/index.providers";
// models
import { Game } from "../../models/index.models";

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
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
    dificulty: "",
    dateStart: null,
    datePaused: null,
    dateEnded: null,
    boardSolution: [],
    boardActual: [],
    boardHistory: [],
    moves: 0,
    time: 0
  }
  gameBoard: any[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, private usefulProv: UsefulProvider) {
    console.log("enters gamepage")
    this.createNewGame();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
    this.startGame();
  }
  createNewGame() {
    let newBoard = this.newBoard();
    this.game.token = this.usefulProv.generateToken();
    this.game.state = "started";
    this.game.dificulty = this.navParams.get('dificulty');
    this.game.dateStart = this.usefulProv.getDate(new Date());
    this.game.boardSolution = newBoard;
    this.game.boardHistory[0] = newBoard;
    console.log(this.game);
    this.gameBoard = newBoard;
  }
  startGame() {
    this.StartTime();
  }

  newBoard() {
    let board = this.boardBase;
    let random10 = Math.floor((Math.random() * 10) + 1);
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
  StartTime() {
    let timer = setInterval(() => {
      this.game.time = this.game.time + 1;
    }, 1000);
  }





}
