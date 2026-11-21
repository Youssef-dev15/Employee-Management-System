import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: false
})
export class NavbarComponent {
  readonly links = [
    { path: '/reports', label: 'Rapports' },
    { path: '/employees', label: 'Employés' },
    { path: '/departments', label: 'Départements' }
  ];
}
