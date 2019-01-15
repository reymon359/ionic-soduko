import { Component } from '@angular/core';
import { IonicPage, NavController,ToastController, NavParams, AlertController, Platform } from 'ionic-angular';
// Providers
import { UsefulProvider, GameProvider } from "../../providers/index.providers";
// models
import { Game } from "../../models/index.models";
// Pages
import { HomePage } from "../../pages/index.pages";

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  public game: Game = {
    token: "",
    state: "",
    difficulty: 0,
    dateStart: null,
    datePaused: null, // not used
    dateEnded: null,
    boardSolution: [],
    boardHistory: [],
    moves: 0, // not be used
    time: 0,
  }
  gameBoard: any[] = [];
  numbers = Array(10).fill(1).map((x, i) => i);
  boxSelected = [null, null];
  timeRunning: boolean;
  arrayDificulties: string[] = ['BEGINNER', 'EASY', 'NORMAL', 'HARD', 'EXTREME'];
  beerCount = 0;
  records: any[] = [0, 0, 0, 0, 0];
  usedHint: boolean = false;
  timesHint: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private gameProv: GameProvider,
    private usefulProv: UsefulProvider, public alertCtrl: AlertController, public platform: Platform,
  public toastCtrl: ToastController) {
    if (this.navParams.get('resumeGame')) {
      this.resumeGame();
    } else {
      this.createNewGame();
    }
  }
  ionViewDidLeave() {
    console.log("pausing from ");
    this.timeController(false);
    this.game.state = 'paused';
    this.game.datePaused = this.usefulProv.getDate(new Date());
    this.gameProv.saveCurrentGame(this.game);
  }
  ionViewDidLoad() {
    this.gameProv.loadRecords().then((records: any[]) => {
      console.log(records);
      if (records !== null) {
        this.records = records;
      }
    });
  }

  resumeGame() {
    this.gameProv.loadCurrentGame().then((currentGame: Game) => {
      console.log(currentGame);
      this.game = currentGame;
      let myJSON = JSON.stringify(this.game.boardHistory[this.game.boardHistory.length - 1]);
      let boardAux = JSON.parse(myJSON);
      this.gameBoard = boardAux;
      this.timeController(true);
    });
  }


  createNewGame() {
    let aux = this.newBoard();
    this.game.boardSolution = aux;
    let myJSON = JSON.stringify(aux);
    let newBoard = JSON.parse(myJSON);
    this.game.token = this.usefulProv.generateToken();
    this.game.state = "started";
    this.game.difficulty = this.navParams.get('difficulty');
    this.game.dateStart = this.usefulProv.getDate(new Date());
    this.gameBoard = newBoard;
    this.applyDifficulty();
    this.updateBoardHistory();
    this.timeController(true);
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
  }

  newBoard() {
    let board = [
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

  // Now i am going to apply the difficulty chosen in the homepage that ai got with the params.
  // I will go ver the gameBoard positions and deleting x number of values depending on the difficulty.
  applyDifficulty() {
    // this.gameBoard[0][0] = '';

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

      if (document.getElementsByClassName('selected').length > 0) {
        document.getElementsByClassName('selected')[0].classList.remove('selected');
      }
      insideBoxSelected.classList.add("selected");
      this.boxSelected = [row, col];

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
        this.game.moves++;
        this.checkWin();
      }
    } else {
      if (number == 0) {
        let alert = this.alertCtrl.create({
          title: 'Wait',
          message: `Select before where you want to remove a number`,
          buttons: ['Ok']
        });
        alert.present();

      } else {

        let alert = this.alertCtrl.create({
          title: 'Wait',
          message: `Select before where you want to put the ${number}`,
          buttons: ['Ok']
        });
        alert.present();
      }
    }
  }

  checkWin() {
    let win = true;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.gameBoard[i][j] !== this.game.boardSolution[i][j]) {
          win = false;
        }
      }
    }
    if (win) {
      this.game.dateEnded = this.usefulProv.getDate(new Date());
      this.timeRunning = false;
      this.addRecord();
      let alert = this.alertCtrl.create({
        title: 'CONGRATULATIONS',
        message: `You just won this ${this.arrayDificulties[this.game.difficulty]} game in ${this.game.time} secs !!`,
        buttons: [{
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }]
      });
      alert.present();
    }
  }

  addRecord() {
    if (!this.usedHint) {
      if (this.records[this.game.difficulty] === 0) {
        this.records[this.game.difficulty] = this.game.time;
        this.gameProv.saveRecords(this.records);
      }
      if (this.game.time < this.records[this.game.difficulty]) {
        this.records[this.game.difficulty] = this.game.time;
        this.gameProv.saveRecords(this.records);
      }
    }
  }

  // Bottom buttons ----------------

  // Go back to last move
  goBack() {
    if (this.game.boardHistory.length > 1) {
      this.game.moves++;
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
              this.gameBoard = this.game.boardHistory[0];
              this.game.boardHistory = [];
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

  hint() {
    // If it is not his first position
    if (this.game.boardHistory.length < 2) {
      let alert = this.alertCtrl.create({
        title: 'You cant do that',
        message: 'You have made no moves yet so there is nothing wrong',
        buttons: ['Ok']
      });
      alert.present();
    } else {
      if (!this.usedHint) {
        let alert = this.alertCtrl.create({
          title: 'wait',
          message: 'If you watch your wrong numbers and win, the record will not be registered',
          buttons: [
            {
              text: 'Use clue',
              handler: () => {
                this.usedHint = true;
                this.timesHint++;
                for (let i = 0; i < 9; i++) {
                  for (let j = 0; j < 9; j++) {
                    if (this.gameBoard[i][j] !== this.game.boardSolution[i][j] && this.gameBoard[i][j] != '') {
                      let insideBoxWrong = document.getElementById('box-' + i + j);
                      insideBoxWrong.classList.add("wrong");
                      setTimeout(() => {
                        if (document.getElementsByClassName('wrong').length > 0) {
                          for (let i = 0; i < document.getElementsByClassName('wrong').length; i++) {
                            document.getElementsByClassName('wrong')[i].classList.remove('wrong');
                          }
                        }
                      }, 1600);
                    }
                  }
                }
              }
            },
            {
              text: 'Dont use',
              role: 'cancel',
            }
          ]
        });
        alert.present();
      } else {
        if (this.timesHint === 20) {
          let alert = this.alertCtrl.create({
            title: 'Hey',
            message: 'You already used this 20 times. You should use this if you are really stuck, not all the time. ',
            buttons: ['Ok']
          });
          alert.present();
        }
        if (this.timesHint === 40) {
          let alert = this.alertCtrl.create({
            title: 'Nice...',
            message: '50 now',
            buttons: ['Ok']
          });
          alert.present();
        }
        this.timesHint++;
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (this.gameBoard[i][j] !== this.game.boardSolution[i][j] && this.gameBoard[i][j] != '') {
              let insideBoxWrong = document.getElementById('box-' + i + j);
              insideBoxWrong.classList.add("wrong");
              setTimeout(() => {
                if (document.getElementsByClassName('wrong').length > 0) {
                  for (let i = 0; i < document.getElementsByClassName('wrong').length; i++) {
                    document.getElementsByClassName('wrong')[i].classList.remove('wrong');
                  }
                }
              }, 1600);
            }
          }
        }
      }
    }
  }
  // =================
  // USEFUL FUNCTIONS
  // =================
  timeController(timeOn) {
    this.timeRunning = timeOn;
    setInterval(() => {
      // let platform:Platform;
      // if (this.platform.pause) {
      //     this.pauseGame();
      // }else{
      //   this.timeController(true);
      // }
      if (this.timeRunning) {
        this.game.time = this.game.time + 1;
      }
    }, 1000);
  }
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

  // =================
  // OTHERS
  // =================


  pauseGame() {
    console.log("pausegame");

    // this.timeController(false);
    // this.game.state = 'paused';
    // this.game.datePaused = this.usefulProv.getDate(new Date());
    // this.gameProv.saveCurrentGame(this.game);
    const toast = this.toastCtrl.create({
     message: 'Game paused!, To resume it just press the PLAY button',
     duration: 6000,
     showCloseButton:true
   });
   toast.present();
   this.navCtrl.pop();

    // let alert = this.alertCtrl.create({
    //   title: 'Game paused!',
    //   subTitle: 'To resume it just press the play button',
    //   buttons: [
    //     {
    //       text: 'Ok',
    //       handler: () => {
    //         this.navCtrl.pop();
    //       }
    //     }]
    // });
    // alert.present();
  }

  beer() {
    this.beerCount++;
    if (this.beerCount == 3) {
      let alert = this.alertCtrl.create({
        title: 'You found the beer!!',
        subTitle: 'Drink all you want, its free :D',
        buttons: ['Ok']
      });
      alert.present();
    }
    if (this.beerCount > 3) {
      let insideBoxes = [];
      let circle = document.getElementsByClassName("circle").length > 0 || false;
      for (let i = 0; i < document.getElementsByClassName("insidebox").length; i++) {
        insideBoxes[i] = document.getElementsByClassName("insidebox")[i];
        if (circle) {
          insideBoxes[i].classList.remove('circle');
          insideBoxes[i].classList.add('square');
        } else {
          insideBoxes[i].classList.remove('square');
          insideBoxes[i].classList.add('circle');
        }
      }
    }
  }
}
