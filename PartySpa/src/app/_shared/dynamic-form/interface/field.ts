import { FormGroup } from '@angular/forms';
import { FieldConfig } from './field-config';

export interface Field {
  group: FormGroup;
  config: FieldConfig;
}
