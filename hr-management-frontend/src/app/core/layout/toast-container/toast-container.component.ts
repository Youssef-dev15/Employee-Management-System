import { Component, inject } from '@angular/core';

import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.component.html',
  standalone: false
})
export class ToastContainerComponent {
  readonly notifications = inject(NotificationService);
  readonly toasts$ = this.notifications.toasts$;
}
