import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNav]'
})
export class NavDirective {

  constructor(private el:ElementRef) { }

  @HostListener('window:scroll') onScroll(event){
    if(window.pageYOffset > 70) {
      this.el.nativeElement.classList.add('scrolled')
    } else {
      this.el.nativeElement.classList.remove('scrolled')
    }
  }

} 

