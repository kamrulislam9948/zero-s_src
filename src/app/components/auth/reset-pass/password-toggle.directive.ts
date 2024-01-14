// password-toggle.directive.ts
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPasswordToggle]'
})
export class PasswordToggleDirective {
  private isPasswordVisible = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') onClick() {
    this.isPasswordVisible = !this.isPasswordVisible;
    const inputType = this.isPasswordVisible ? 'text' : 'password';
    this.renderer.setProperty(this.el.nativeElement.previousElementSibling, 'type', inputType);
  }
}
