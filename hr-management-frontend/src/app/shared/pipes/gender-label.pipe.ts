import { Pipe, PipeTransform } from '@angular/core';

import { GENDER_OPTIONS, Gender } from '../../core/models';

@Pipe({ name: 'genderLabel', standalone: false })
export class GenderLabelPipe implements PipeTransform {
  transform(value: Gender | null | undefined): string {
    return GENDER_OPTIONS.find(g => g.value === value)?.label ?? '—';
  }
}
