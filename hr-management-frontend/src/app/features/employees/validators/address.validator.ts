import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const isFilled = (value: unknown): boolean =>
  value !== null && value !== undefined && String(value).trim() !== '';

/**
 * L'adresse est facultative, mais si on en saisit une partie
 * il faut la saisir en entier (rue, ville, pays, code postal).
 */
export const addressAllOrNothing: ValidatorFn = (group: AbstractControl): ValidationErrors | null => {
  const values = Object.values((group as any).getRawValue?.() ?? group.value);
  const filled = values.filter(isFilled).length;
  return filled === 0 || filled === values.length ? null : { incomplete: true };
};
