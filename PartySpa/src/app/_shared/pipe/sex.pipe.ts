import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sex'
})
export class SexPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    let retValue: string;
    switch (value) {
      case 1:
        retValue = '男生';
        break;
      case 2:
        retValue = '女生';
        break;
    }
    return retValue;
  }

}
