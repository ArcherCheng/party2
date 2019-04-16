import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';
import { Router } from '@angular/router';
import { Register } from 'src/app/_shared/interface/register';
import { CheckboxItem } from 'src/app/_shared/dynamic-form/interface/checkbox-item';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerData: Register;
  registerForm: FormGroup;

  bloodOptions = new Array<CheckboxItem>();
  starOptions =  new Array<CheckboxItem>();
  religionOptions = new Array<CheckboxItem>();
  cityOptions = new Array<CheckboxItem>();
  jobOptions = new Array<CheckboxItem>();

  // = this.fb.group({
  //   firstName: ['王', Validators.required],
  //   lastName: ['明生', Validators.required],
  //   phone: ['0931388001', Validators.required],
  //   email: ['aaa001@123.com', Validators.required],
  //   sex: [1, Validators.required],
  //   birthday: ['1977/6/4', Validators.required],
  //   marry: [1, Validators.required],
  //   education: [4, Validators.required],
  //   password: ['password', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
  //   passwordConfirm: ['password', Validators.required]
  // }, {validator: this.passwordMatchValidator});

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertify: AlertifyService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    // this.bsConfig = {
    //   containerClass: 'theme-red'
    // };
    this.loadCheckBoxItem();
    this.createRegisterForm();
    this.authService.setCurrentTitle('新人註冊');

  }
  loadCheckBoxItem() {
    this.authService.getCheckboxItemList('Blood').subscribe(data => this.bloodOptions = data);
    this.authService.getCheckboxItemList('Star').subscribe(data => this.starOptions = data);
    this.authService.getCheckboxItemList('City').subscribe(data => this.cityOptions = data);
    this.authService.getCheckboxItemList('Job').subscribe(data => this.jobOptions = data);
    this.authService.getCheckboxItemList('Religion').subscribe(data => this.religionOptions = data);
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      birthYear: ['', Validators.required],
      sex: ['', Validators.required],
      heights: ['', Validators.required],
      weights: ['', Validators.required],
      salary: ['', Validators.required],
      marry: ['', Validators.required],
      education: ['', Validators.required],
      blood: ['', Validators.required],
      star: ['', Validators.required],
      city: ['', Validators.required],
      jobType: ['', Validators.required],
      religion: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      passwordConfirm: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password').value === g.get('passwordConfirm').value ? null : {mismatch: true};
  }

  register() {
    this.registerData = Object.assign({}, this.registerForm.value);
    // console.log(this.registerData);
    // console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      this.authService.register(this.registerData).subscribe(() => {
        this.alertify.success('註冊成功');
      }, error => {
        this.alertify.error('註冊失敗');
      }, () => {
        this.model = {username: this.registerData.phone, password: this.registerData.password};
        this.authService.login(this.model).subscribe(() => {
          this.router.navigate(['/home']);
        });
      });
    }
  }

  cancel() {
    this.cancelRegister.emit(false);
  }


}
