import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { GenderLabelPipe } from './pipes/gender-label.pipe';

const DECLARATIONS = [ConfirmDialogComponent, PaginationComponent, SpinnerComponent, GenderLabelPipe];

/** Éléments réutilisables : importé dans chaque module fonctionnel. */
@NgModule({
  declarations: DECLARATIONS,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  exports: [CommonModule, ReactiveFormsModule, RouterModule, ...DECLARATIONS]
})
export class SharedModule {}
