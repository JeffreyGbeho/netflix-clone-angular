import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'floatingInput',
  standalone: true
})
export class FloatingInputPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
