import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { ToastContainerComponent } from './layout/toast-container/toast-container.component';

/** Importé une seule fois, dans AppModule : layout global + HttpClient + intercepteurs. */
@NgModule({
  declarations: [NavbarComponent, ToastContainerComponent],
  imports: [CommonModule, RouterModule],
  exports: [NavbarComponent, ToastContainerComponent],
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parent: CoreModule | null) {
    if (parent) {
      throw new Error('CoreModule est déjà chargé : importez-le uniquement dans AppModule.');
    }
  }
}
