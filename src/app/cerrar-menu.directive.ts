import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCerrarMenu]'
})
export class CerrarMenuDirective {
  constructor(private elementRef: ElementRef) { }

  @HostListener('document:click', ['$event.target'])
  onClick(target: any) {
    const clickedInside = this.elementRef.nativeElement.contains(target);
    if (!clickedInside) {
      this.toggleHamburguesa();
    }
  }

  private toggleHamburguesa() {
    
  }
}
