import { Component } from '@angular/core';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrl: './reset-pass.component.css'
})
export class ResetPassComponent {
  togglePasswordVisibility(event: MouseEvent): void {
    event.preventDefault();
  }
}
