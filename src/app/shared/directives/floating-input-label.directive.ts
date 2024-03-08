import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[floating]',
  standalone: true
})
export class FloatingInputLabelDirective {
  className: string = "isActive"
  @Input() labelId: string = ""

  constructor(private element: ElementRef) { }

  @HostListener('focus') onClick() {
    document.querySelector("#" + this.labelId)?.classList.add(this.className)
  }

  @HostListener('blur') onFocusOut() {
    if (this.element.nativeElement.value === "") {
      document.querySelector("#" + this.labelId)?.classList.remove(this.className)
    }
  }

}
