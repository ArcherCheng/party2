export class CheckboxItem {
  keyId: string;
  keyValue: string;
  isChecked: boolean;
  constructor(keyId: any, keyValue: any, isChecked?: boolean) {
    this.keyId = keyId;
    this.keyValue = keyValue,
    this.isChecked = isChecked ? isChecked : false;
  }
}
