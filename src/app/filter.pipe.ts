import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, sName: string): any {
    if (!value || !sName) {
      return value;
    }else {
      return value.filter(tableName =>
        tableName.name.toLowerCase().indexOf(sName.toLowerCase()) !== -1);
    }
  }
}
