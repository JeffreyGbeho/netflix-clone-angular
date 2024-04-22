import { Directive, ElementRef, HostListener } from '@angular/core';
import e from 'express';

@Directive({
  selector: '[movieAnimation]',
  standalone: true,
})
export class MovieCardHoverDirective {
  timeoutId: any;

  constructor(private element: ElementRef) {}

  @HostListener('mouseenter') onEnter() {
    this.timeoutId = setTimeout(() => {
      this.element.nativeElement.classList.add('movie-hover');
    }, 500);
    // this.element.nativeElement.classList.add('movie-hover');
  }

  @HostListener('mouseout', ['$event'])
  onMouseOut(event: MouseEvent) {
    const parent = this.element.nativeElement;
    const target = event.relatedTarget as HTMLElement;

    if (!this.isDescendant(parent, target)) {
      clearTimeout(this.timeoutId);
      parent.classList.remove('movie-hover');
    }
  }

  private isDescendant(parent: HTMLElement, child: any): boolean {
    let node = child;
    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }
}
