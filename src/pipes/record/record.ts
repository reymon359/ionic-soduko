import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the RecordPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'record',
})
export class RecordPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: number) {
    if (value == 0) {
      return '??';
    }
    else {
      return value;

    }
  }
}
