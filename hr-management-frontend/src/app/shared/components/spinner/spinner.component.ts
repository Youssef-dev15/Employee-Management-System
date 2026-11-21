import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `<div class="spinner-wrap" role="status"><span class="spinner"></span><span>{{ label }}</span></div>`,
  standalone: false
})
export class SpinnerComponent {
  @Input() label = 'Chargement…';
}
