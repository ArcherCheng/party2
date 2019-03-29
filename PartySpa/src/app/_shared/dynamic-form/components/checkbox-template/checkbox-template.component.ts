import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CheckboxItem } from '../../interface/checkbox-item';

@Component({
  selector: 'app-checkbox-template',
  templateUrl: './checkbox-template.component.html',
  styleUrls: ['./checkbox-template.component.css']
})
export class CheckboxTemplateComponent implements OnInit, OnChanges {
  @Input() options = Array<CheckboxItem>();
  @Input() selectedValues: string[];
  @Output() toggle = new EventEmitter<any[]>();

  constructor() { }

  ngOnInit() {
  }

  onToggle() {
    const checkedOptions = this.options.filter(x => x.checked);
    this.selectedValues = checkedOptions.map(x => x.value);
    this.toggle.emit(this.selectedValues);
  }

  ngOnChanges(): void {
    this.selectedValues.forEach( value => {
      const element = this.options.find(x => x.value === value);
      if (element) {
        element.checked = true;
      }
    });
  }

}
