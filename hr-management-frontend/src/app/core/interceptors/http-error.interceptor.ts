import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

import { NotificationService } from '../services/notification.service';

/** Affiche un message clair pour toute erreur HTTP, puis relaie l'erreur. */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private readonly notifications = inject(NotificationService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        this.notifications.error(this.toMessage(error));
        return throwError(() => error);
      })
    );
  }

  private toMessage(error: HttpErrorResponse): string {
    if (error.status === 0) {
      return 'Impossible de joindre le serveur. Vérifiez que le backend tourne sur le port 8081.';
    }

    const body = error.error;
    const serverMessage =
      typeof body === 'string' ? body : body?.message || body?.detail || body?.error;
    if (serverMessage && typeof serverMessage === 'string') {
      return serverMessage;
    }

    switch (error.status) {
      case 400: return 'Requête invalide : vérifiez les données saisies.';
      case 404: return 'Ressource introuvable.';
      case 409: return 'Conflit : cette donnée existe déjà ou est utilisée ailleurs.';
      case 500: return 'Erreur interne du serveur.';
      default: return `Erreur inattendue (${error.status}).`;
    }
  }
}
