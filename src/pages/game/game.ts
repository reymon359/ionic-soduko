import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
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
    difficulty: 0,
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
  numbers = [];
  boxSelected = [null, null];
  constructor(public navCtrl: NavController, public navParams: NavParams, private usefulProv: UsefulProvider, public alertCtrl: AlertController) {
    console.log("enters gamepage")
    this.numbers = Array(10).fill(1).map((x, i) => i); // [0,1,2,3,4]
    // this.numbers = Array(5).fill(4); // [4,4,4,4,4]
    console.log(this.numbers);
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
    this.game.difficulty = this.navParams.get('difficulty');
    this.game.dateStart = this.usefulProv.getDate(new Date());
    this.game.boardSolution = newBoard;
    console.log(this.game);
    this.gameBoard = newBoard;
    this.applyDifficulty();
    this.updateBoardHistory();
  }
  getBoard(board) {
    let aux = board;
    return aux;

  }
  updateBoardHistory() {
    let aux = this.gameBoard;
    let myJSON = JSON.stringify(aux);
    let boardToUpdate = JSON.parse(myJSON);
    let newPos = this.game.boardHistory.length;
    this.game.boardHistory[newPos] = boardToUpdate;
    console.log(this.game.boardHistory);
  }
  startGame() {
    this.StartTime();
  }
  // Here we
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
    return board;
  }
  StartTime() {
    let timer = setInterval(() => {
      this.game.time = this.game.time + 1;
    }, 1000);
  }
  //   function randomIntFromInterval(min, max) // min and max included
  // {
  //   return Math.floor(Math.random() * (max - min + 1) + min);
  // }
  // Now i am going to apply the difficulty chosen in the homepage that ai got with the params.
  // I will go ver the gameBoard positions and deleting x number of values depending on the difficulty.
  applyDifficulty() {
    let min = this.game.difficulty;
    let max = min + 2;
    this.gameBoard.forEach((row) => {
      let toReplace = this.shuffleArray([0, 1, 2, 3, 4, 5, 6, 7, 8]);
      for (let i = 0; i < Math.floor(Math.random() * (max - min + 1) + min); i++) {
        row[toReplace[i]] = '';
      }
    })
  }

  selectBox(row, col) {
    // Check if the place to put the number is diferent than the history board [0]
    let insideBoxSelected = document.getElementById('box-' + row + col);
    if (!insideBoxSelected.classList.contains('fixed')) {
      this.boxSelected = [row, col];
      if (document.getElementsByClassName('selected').length > 0) {
        document.getElementsByClassName('selected')[0].classList.remove('selected');
      }
      insideBoxSelected.classList.add("selected");
    }
  }

  putNumber(number) {
    if (document.getElementsByClassName('selected').length > 0) {
      let row = this.boxSelected[0];
      let col = this.boxSelected[1];

      if (this.boxSelected != [null, null]) {
        // We save the actual board in the history board next position
        if (number == 0) {
          this.gameBoard[row][col] = '';
        } else {
          this.gameBoard[row][col] = number;
        }
        this.updateBoardHistory();
        if (document.getElementsByClassName('selected').length > 0) {
          document.getElementsByClassName('selected')[0].classList.remove('selected');
        }
      }
    } else {
      let alert = this.alertCtrl.create({
        title: 'Wait',
        message: `Select before where you want to put the ${number}`,
        buttons: ['Ok']
      });
      alert.present();
    }
  }

  // Go back to last move
  goBack() {
    if (this.game.boardHistory.length > 1) {
      this.game.boardHistory.splice(-1, 1);
      this.gameBoard = this.game.boardHistory[this.game.boardHistory.length - 1];
    } else {
      // if cant , modal you cant go more back
      let alert = this.alertCtrl.create({
        title: 'You went all the way back',
        message: 'Next time you should use the restart button',
        buttons: ['Ok']
      });
      alert.present();
    }
  }

  restartBoard() {
    if (this.game.boardHistory.length > 1) {
      let alert = this.alertCtrl.create({
        title: 'You will restart the board',
        message: 'Are you sure?',
        buttons: [
          {
            text: 'Confirm',
            handler: () => {
              console.log('restarting board');
              console.log(this.game.boardHistory.shift());
              this.gameBoard=this.game.boardHistory.shift();
              this.game.boardHistory=[];
              this.updateBoardHistory();
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
          }
        ]
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
      title: 'Impossible',
      message: 'The board is already like when you started',
      buttons: ['Ok']
    });
    alert.present();
}

  }






  // =================
  // USEFUL FUNCTIONS
  // =================

  // -------SHUFFLE ARRAY------------
  shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle inside the array
    while (0 !== currentIndex) {
      // Pick a remaining element from the array
      randomIndex = Math.floor(Math.random() * currentIndex);
      // randomIndex is a random number between 0 and the array position
      currentIndex -= 1;
      // We get a new currentIndex and swap it with the current element.
      temporaryValue = array[currentIndex];
      // We save the currentIndex value in temporaryValue
      array[currentIndex] = array[randomIndex];
      // Now we fill the new currentIndex position with the value from the randomIndex
      array[randomIndex] = temporaryValue;
      // Lastly in the randomIndex position we put the temporaryValue we saved before
    }
    return array;
  }

  // -------------MODAL------------
  // PARAMS
  // - Type: The type of the modal.
  //    - default: Just clocse modal.
  //    - choose: Confirm/Cancel.
  //    - multiple: Multiple options.
  // - Title: The modal title.
  // - Text: The modal text.
  // - Color: The modal colour.
  //    - default: Grey.
  //    - success: green.
  //    - warning: yellow.
  //    - error: red.
  modal(title = 'Title', text = 'text', type = 'default', color = 'default') {
    console.log(title, text, type, color);
    let modalBack = document.createElement('div'),
      modal = document.createElement('div'),
      html = '';
    modalBack.appendChild(modal);

    html += '<h2>' + title + '</h2>';
    html += '<p>' + text + '</p>';

    switch (type) {
      case 'restartBoard':
        html += '<button class="modalButton" id="modalButton" onclick="this.parentNode.parentNode.remove();restartBoard()">Restart</button>';
        break;

      default:
      // code block
    }
    html += '<button class="modalButton" id="modalButton" onclick="this.parentNode.parentNode.remove();">Close</button>';


    modal.innerHTML = html;
    modalBack.classList.add('modal-back');
    modal.classList.add('modal');
    document.body.appendChild(modalBack);
    document.getElementById('modalButton').focus();

  }
}
