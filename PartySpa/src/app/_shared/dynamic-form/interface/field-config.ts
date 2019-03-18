import {ValidatorFn, FormGroup} from '@angular/forms';
export interface FieldConfig {
  name: string;
  type: string;
  label?: string;
  value?: any;
  placeholder?: string;
  disabled?: boolean;
  validations?: ValidatorFn[];
  options?: string[];
}
