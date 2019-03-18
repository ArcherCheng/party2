import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'marryCondition'
})
export class MarryConditionPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    let retValue: string;
    switch (value) {
      case 1:
        retValue = '單身未婚';
        break;
      case 2:
        retValue = '晚婚二春';
        break;
    }

    return retValue;
  }

}
