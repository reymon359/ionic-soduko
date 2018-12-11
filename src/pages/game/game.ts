import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {
  title = 'app';
  table: any[] = [];
  table2: any[] = [];
  numbers: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  baseBoard: any[] = [
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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
console.log("enters gamepage")
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
    this.generateTablero2();
  }

  generateTablero2() {
    this.table = this.baseBoard;
    var random10 = Math.floor((Math.random() * 10) + 1);
    for (let r = 0; r < random10; r++) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          this.table[i][j] = this.table[i][j] + 1;
          if (this.table[i][j] == 10) {
            this.table[i][j] = 1;
          }
        }
      }
    }
    this.table = this.shuffleArray(this.table);
  }
  // generateTablero() {
  //   for (let r = 0; r < 9; r++) {
  //     this.table[r] = new Array(9);
  //   }
  //   this.table[0] = this.shuffleArray(this.numbers);
  //   // this.firstColumn();
  //   this.fillPrimerCuadrante();
  //
  //   for (let i = 0; i < 9; i++) {
  //     for (let j = 0; j < 9; j++) {
  //       if (this.table[i][j] == undefined) {
  //         // this.rellenarPos(i, j);
  //       }
  //     }
  //   }
  // }
  // fillPrimerCuadrante() {
  //   let todos = this.numbers.slice();
  //   let resto = todos.slice(3);
  //   let resto2 = todos.slice(0, 3);
  //   let resto22 = todos.slice(6, 9);
  //   resto2 = resto2.concat(resto22);
  //   var resto3 = todos.slice(0, 6);
  //   let resto4 = todos.slice();
  //   let resto5 = todos.slice();
  //   var resto6 = todos.slice();
  //   // let resto = todos.slice(3);
  //   // let resto2 = todos.slice(0, 3);
  //   // let resto22 = todos.slice(6, 9);
  //   // resto2 = resto2.concat(resto22);
  //   // var resto3 = todos.slice(0, 6);
  //   for (let i = 1; i < 9; i++) {
  //     for (let j = 0; j < 9; j++) {
  //       // resto = this.shuffleArray(resto);
  //       if (i < 3) {
  //         if (j < 3) {
  //           this.table[i][j] = resto.pop();
  //         }
  //         if (j >= 3 && j < 6) {
  //           // console.log('posicion ' + i + ' ' + j + ' numero arriba: ', this.table[i - 1][j]);
  //           // console.log('losque quedan', resto2);
  //           var arrayPosibles = resto2.slice(0);
  //           var losDeLaIzq = this.table[i].slice(0, j);;
  //           for (let h = 0; h < j; h++) {
  //             // console.log('los de la izq', losDeLaIzq);
  //             // console.log('arrayposibles', arrayPosibles);
  //             var positionLEFT = arrayPosibles.indexOf(losDeLaIzq[0]);
  //             if (positionLEFT != -1) {
  //               // console.log('el primero de los de la izquierda coincide con la pos ' + positionLEFT + ' de los posibles');
  //               arrayPosibles.splice(positionLEFT, 1);
  //               // console.log(' despues de borrar la posicion ' + positionLEFT + ' de arrayposibles', arrayPosibles);
  //             }
  //             losDeLaIzq.splice(0, 1);
  //             // console.log('quito el primero de los de la izq', losDeLaIzq);
  //           }
  //           // console.log('arrayposibles', arrayPosibles);
  //           // arrayPosibles = this.shuffleArray(arrayPosibles);
  //           // console.log('posibles mezclados', arrayPosibles);
  //           this.table[i][j] = arrayPosibles.pop();
  //           // console.log('pongo el: ', this.table[i][j]);
  //           // console.log(resto2);
  //           var posnumEnRes2 = resto2.indexOf(this.table[i][j]);
  //           // console.log('posicion del num en resto 2', posnumEnRes2);
  //           resto2.splice(posnumEnRes2, 1);
  //         }
  //         if (j >= 6) {
  //           // console.log('posicion ' + i + ' ' + j + ' numero arriba: ', this.table[i - 1][j]);
  //           // console.log('losque quedan', resto3);
  //           var arrayPosibles = resto3.slice(0);
  //           var losDeLaIzq = this.table[i].slice(0, j);;
  //           for (let h = 0; h < j; h++) {
  //             // console.log('los de la izq', losDeLaIzq);
  //             // console.log('arrayposibles', arrayPosibles);
  //             var positionLEFT = arrayPosibles.indexOf(losDeLaIzq[0]);
  //             if (positionLEFT != -1) {
  //               // console.log('el primero de los de la izquierda coincide con la pos ' + positionLEFT + ' de los posibles');
  //               arrayPosibles.splice(positionLEFT, 1);
  //               // console.log(' despues de borrar la posicion ' + positionLEFT + ' de arrayposibles', arrayPosibles);
  //             }
  //             losDeLaIzq.splice(0, 1);
  //             // console.log('quito el primero de los de la izq', losDeLaIzq);
  //           }
  //           // console.log('arrayposibles', arrayPosibles);
  //           // arrayPosibles = this.shuffleArray(arrayPosibles);
  //           // console.log('posibles mezclados', arrayPosibles);
  //           this.table[i][j] = arrayPosibles.pop();
  //           // console.log('pongo el: ', this.table[i][j]);
  //           // console.log(resto3);
  //           var posnumEnRes2 = resto3.indexOf(this.table[i][j]);
  //           // console.log('posicion del num en resto 2', posnumEnRes2);
  //           resto3.splice(posnumEnRes2, 1);
  //         }
  //       }
  //
  //       if (i >= 3 && i < 6) {
  //         if (j < 3) {
  //           // console.log('posicion ' + i + ' ' + j + ' numero arriba: ', this.table[i - 1][j]);
  //           // console.log('losque quedan', resto4);
  //           var arrayPosibles = resto4.slice(0);
  //           var losDeLaIzq = this.table[i].slice(0, j);
  //           var losDeArriba = this.calcularLosDeArriba(i, j);
  //           for (let h = 0; h < j; h++) {
  //             // console.log('los de la izq', losDeLaIzq);
  //             // console.log('arrayposibles', arrayPosibles);
  //             var positionLEFT = arrayPosibles.indexOf(losDeLaIzq[0]);
  //             if (positionLEFT != -1) {
  //               // console.log('el primero de los de la izquierda coincide con la pos ' + positionLEFT + ' de los posibles');
  //               arrayPosibles.splice(positionLEFT, 1);
  //               // console.log(' despues de borrar la posicion ' + positionLEFT + ' de arrayposibles', arrayPosibles);
  //             }
  //             losDeLaIzq.splice(0, 1);
  //             // console.log('quito el primero de los de la izq', losDeLaIzq);
  //           }
  //
  //           for (let h = 0; h < i; h++) {
  //             // console.log('los de arriba', losDeArriba);
  //             // console.log('arrayposibles', arrayPosibles);
  //             var positionUP = arrayPosibles.indexOf(losDeArriba[0]);
  //             if (positionUP != -1) {
  //               // console.log('el primero de los de arriba coincide con la pos ' + positionUP + ' de los posibles');
  //               arrayPosibles.splice(positionUP, 1);
  //               // console.log(' despues de borrar la posicion ' + positionUP + ' de arrayposibles', arrayPosibles);
  //             }
  //             losDeArriba.splice(0, 1);
  //             // console.log('quito el primero de los de arriba', losDeArriba);
  //           }
  //           // console.log('arrayposibles', arrayPosibles);
  //           // arrayPosibles = this.shuffleArray(arrayPosibles);
  //           // console.log('posibles mezclados', arrayPosibles);
  //           this.table[i][j] = arrayPosibles.pop();
  //           // console.log('pongo el: ', this.table[i][j]);
  //           // console.log(resto4);
  //           var posnumEnRes2 = resto4.indexOf(this.table[i][j]);
  //           // console.log('posicion del num en resto 2', posnumEnRes2);
  //           resto4.splice(posnumEnRes2, 1);
  //         }
  //         if (j >= 3 && j < 6) {
  //           console.log('posicion ' + i + ' ' + j + ' numero arriba: ', this.table[i - 1][j]);
  //           console.log('losque quedan', resto5);
  //           var arrayPosibles = resto5.slice(0);
  //           var losDeLaIzq = this.table[i].slice(0, j);
  //           var losDeArriba = this.calcularLosDeArriba(i, j);
  //           for (let h = 0; h < j; h++) {
  //             console.log('los de la izq', losDeLaIzq);
  //             console.log('arrayposibles', arrayPosibles);
  //             var positionLEFT = arrayPosibles.indexOf(losDeLaIzq[0]);
  //             if (positionLEFT != -1) {
  //               console.log('el primero de los de la izquierda coincide con la pos ' + positionLEFT + ' de los posibles');
  //               arrayPosibles.splice(positionLEFT, 1);
  //               console.log(' despues de borrar la posicion ' + positionLEFT + ' de arrayposibles', arrayPosibles);
  //             }
  //             losDeLaIzq.splice(0, 1);
  //             console.log('quito el primero de los de la izq', losDeLaIzq);
  //           }
  //
  //           for (let h = 0; h < i; h++) {
  //             console.log('los de arriba', losDeArriba);
  //             console.log('arrayposibles', arrayPosibles);
  //             var positionUP = arrayPosibles.indexOf(losDeArriba[0]);
  //             if (positionUP != -1) {
  //               console.log('el primero de los de arriba coincide con la pos ' + positionUP + ' de los posibles');
  //               arrayPosibles.splice(positionUP, 1);
  //               console.log(' despues de borrar la posicion ' + positionUP + ' de arrayposibles', arrayPosibles);
  //             }
  //             losDeArriba.splice(0, 1);
  //             console.log('quito el primero de los de arriba', losDeArriba);
  //           }
  //           console.log('arrayposibles', arrayPosibles);
  //           // arrayPosibles = this.shuffleArray(arrayPosibles);
  //           console.log('posibles mezclados', arrayPosibles);
  //           this.table[i][j] = arrayPosibles.pop();
  //           console.log('pongo el: ', this.table[i][j]);
  //           console.log(resto5);
  //           var posnumEnRes2 = resto5.indexOf(this.table[i][j]);
  //           console.log('posicion del num en resto 2', posnumEnRes2);
  //           resto5.splice(posnumEnRes2, 1);
  //
  //
  //
  //         }
  //       }
  //     }
  //
  //   }
  //
  // }
  //     if ((i==0 || i==3 ||i==6) &&(j==0 || j==3 ||j==6)) {
  //         resto = this.shuffleArray(this.numbers);
  //         r++;
  //     }
  //
  //
  //     this.table[i][j]=resto.pop();
  // calcularLosDeArriba(i, j) {
  //   var losDeArriba = [];
  //   for (let r = 0; r < i; r++) {
  //     losDeArriba.push(this.table[r][j]);
  //   }
  //   return losDeArriba;
  // }
  // rellenarPos(i, j) {
  //   console.log('posicion ' + i + ' ' + j + ' numero arriba: ', this.table[i - 1][j]);
  //   var arrayPosibles = this.numbers.slice();
  //   for (let r = 0; r < i; r++) {
  //     // ahora busco la posicion de los de arriba
  //     var positionUP = arrayPosibles.indexOf(this.table[r][j]);
  //     if (positionUP != -1) {
  //       // borro los de arriba de los posibles
  //       arrayPosibles.splice(positionUP, 1);
  //
  //     }
  //   }
  //   console.log('posiblesmenos los de arriba', arrayPosibles);
  //   for (let s = 0; s < j; s++) {
  //     // ahora busco la posicion de los de la izq
  //     var positionLEFT = arrayPosibles.indexOf(this.table[i][s]);
  //     if (positionLEFT != -1) {
  //       // borro los de izq de los posibles
  //       arrayPosibles.splice(positionLEFT, 1);
  //     }
  //   }
  //   console.log('posiblesmenos los de izq', arrayPosibles);
  //
  //   //desordeno los posibles
  //   arrayPosibles = this.shuffleArray(arrayPosibles);
  //   console.log('posibles mezclados', arrayPosibles);
  //
  //   //cojo la primera pos de los posibles
  //   this.table[i][j] = arrayPosibles[0];
  //   // console.log(i,j)
  //   // console.log(this.table[i-1][j]);
  //   // console.log(arrayPosibles);
  //   // var posNumArriba=  arrayPosibles.indexOf(this.table[i-1][j]);
  //   // console.log(posNumArriba);
  //   // console.log(arrayPosibles[posNumArriba]);
  //   // arrayPosibles.splice(posNumArriba,1);
  //   // console.log(arrayPosibles);
  //   //
  //   // var arrayAux = this.table[0].slice();
  //
  // }
  // firstColumn() {
  //   console.log(this.table[0]);
  //   var arrayAux = this.table[0].slice();
  //   console.log('aux', arrayAux);
  //   var primeraPos = this.table[0][0];
  //   console.log('primerapos', primeraPos);
  //
  //   arrayAux.shift();
  //   console.log('aux', arrayAux);
  //   console.log(this.table[0]);
  //   arrayAux = this.shuffleArray(arrayAux);
  //   console.log('aux', arrayAux);
  //
  //   for (let i = 0; i < arrayAux.length; i++) {
  //     this.table[i + 1][0] = arrayAux[i]
  //
  //   }
  //   // this.table[0].splice(0, 0, primeraPos);
  //
  // }


  shuffleArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // console.log('posicion del array, currentindex',currentIndex);

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      // console.log('numero aleatorio entre 0 y la posicion del array',randomIndex);
      currentIndex -= 1;
      // console.log('posicion del array -1, nuevo currentindex',currentIndex);

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      // console.log('nos guardamos en temporaryvalue el valor que hay en current index ',temporaryValue);

      array[currentIndex] = array[randomIndex];
      // console.log('ahora rellenamos la posicion currentindex nueva'+currentIndex+' con el valor que hay en la posicion del random index', array[randomIndex]);

      array[randomIndex] = temporaryValue;
      // console.log('por utimo en la posicion randomIndex'+randomIndex+' ponemos el valor temporal que hemos guardado', temporaryValue);

    }
    // console.log(array);
    return array;
  }
}
