import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit } from '@angular/core';
import { FieldConfig } from '../_shared/dynamic-form/interface/field-config';
import { Validators } from '@angular/forms';
import { DynamicFormComponent } from '../_shared/dynamic-form/container/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-test-dynamic-form',
  templateUrl: './test-dynamic-form.component.html',
  styleUrls: ['./test-dynamic-form.component.css']
})
export class TestDynamicFormComponent implements OnInit, AfterViewInit {
  @ViewChild('dynamicForm') dynamicForm: DynamicFormComponent;
  groupvalue: any;
  // formsPool: { [formType: string]: FieldConfig[] } = {}
    music: FieldConfig[] = [
      {
        type: 'input',
        label: '喜欢的音乐人',
        name: 'singerName',
        placeholder: '泽野弘之',
        disabled: false,
        validations: [Validators.required, Validators.minLength(2)]
      },
      {
        type: 'input',
        label: '音乐人生日',
        inputType: 'date',
        name: 'singerDate',
        placeholder: '生日',
        disabled: false,
        validations: [Validators.required, Validators.minLength(2)]
      },
      {
        type: 'input',
        label: '音乐人產量',
        inputType: 'number',
        name: 'singerDate',
        placeholder: '產量',
        disabled: false,
        validations: [Validators.required, Validators.minLength(2)]
      },
      {
        type: 'input',
        label: '喜欢的歌',
        name: 'song',
        placeholder: '等你下课',
        disabled: false,
        validations: [Validators.required]
      },
      {
        type: 'select',
        label: '喜欢的食物种类',
        name: 'foodType',
        options: ['西式快餐', '川菜', '粤菜', '烧烤麻辣烫'],
        disabled: false,
        placeholder: '请选择',
        validations: [Validators.required]
      },
      {
        type: 'checkbox',
        label: '感兴趣的音乐种类',
        name: 'musicTypeLike',
        options: ['说唱', '爵士', '嘻哈', '古典', '蓝调'],
        disabled: false,
        placeholder: '选择你感兴趣的种类',
        validations: [Validators.required]
      },
      {
        type: 'checkbox',
        label: '讨厌的音乐种类',
        name: 'musicTypeHate',
        options: ['说唱', '爵士', '嘻哈', '古典', '蓝调'],
        disabled: false,
        placeholder: '选择你感兴趣的种类',
        validations: [Validators.required]
      },
      {
        label: '喜欢的等级',
        name: 'like',
        options: ['喜欢', '非常喜欢', '特别喜欢', '超级喜欢'],
        type: 'radio',
        disabled: false,
      },
      {
        label: 'Submit',
        name: 'submit',
        type: 'button',
        disabled: false,
      }
    ];


  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    console.log(3);
    let previousValid = this.dynamicForm.valid;
    this.dynamicForm.Changes.subscribe(val => {
      if (previousValid !== this.dynamicForm.valid) {
        previousValid = this.dynamicForm.valid;
        this.dynamicForm.setDisabled('submit', !previousValid);
      }
    });
    setTimeout(() => {
      this.dynamicForm.setDisabled('submit', true);
    });
  }

  onSubmit(event) {
    console.log(event);
    this.groupvalue = event;
  }

}
