import { Component, OnInit } from '@angular/core';
import { Party } from 'src/app/_shared/interface/party';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_shared/service/auth.service';
import { AdminService } from 'src/app/_shared/service/admin.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_shared/service/alertify.service';

@Component({
  selector: 'app-party-add',
  templateUrl: './party-add.component.html',
  styleUrls: ['./party-add.component.css']
})
export class PartyAddComponent implements OnInit {
  party: Party;
  myFormGroup: FormGroup;
  Today = new Date();
  title = '修改派對活動';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) {
  }

  ngOnInit() {
    this.authService.setCurrentTitle('修改派對活動');
    this.route.data.subscribe((data: {apiResult: Party}) => {
      this.party = data.apiResult;
      if (data.apiResult.partyName === null) {
        this.authService.setCurrentTitle('新增派對活動');
        this.title = '新增派對活動';
        this.setPartyDefault();
      }
      this.createFormGroup();
    });
  }

  createFormGroup() {
    this.myFormGroup = this.fb.group({
      partyId: [this.party.partyId, Validators.required],
      partyName: [this.party.partyName, Validators.required],
      partyDate: [this.party.partyDate, Validators.required],
      beginTime: [this.party.beginTime, Validators.required],
      endTime: [this.party.endTime, Validators.required],
      marry: [this.party.marry, Validators.required],
      persons: [this.party.persons, Validators.required],
      manAmt: [this.party.manAmt, Validators.required],
      manEducaton: [this.party.manEducaton, Validators.required],
      manAge1: [this.party.manAge1, Validators.required],
      manAge2: [this.party.manAge2, Validators.required],
      womanAmt: [this.party.womanAmt, Validators.required],
      womanEducaton: [this.party.womanEducaton, Validators.required],
      womanAge1: [this.party.womanAge1, Validators.required],
      womanAge2: [this.party.womanAge2, Validators.required],
      earlyDate: [this.party.earlyDate, Validators.required],
      earlyManAmt: [this.party.earlyManAmt, Validators.required],
      earlyWomanAmt: [this.party.earlyWomanAmt, Validators.required],
      womenAmt: [this.party.womenAmt, Validators.required],
      restaurant: [this.party.restaurant, Validators.required],
      addressNo: [this.party.addressNo, Validators.required],
      busNote: [this.party.busNote, Validators.required],
      notes: [this.party.notes, Validators.required],
      pictureUrl: [this.party.pictureUrl, Validators.required],
    });
  }

  onSubmit() {
    this.party = Object.assign({}, this.myFormGroup.value);
    this.adminService.partyAdd(this.party).subscribe(next => {
      this.alertify.success('存檔成功');
      this.router.navigate(['admin', 'party']);
    }, error => {
      this.alertify.error(error.error);
    });
  }

  setPartyDefault() {
    this.party.partyId = 0;
    this.party.partyName = '19-001 (複製用) 優質未婚大專青年男女聯誼餐會-台北場';
    this.party.partyDate = this.Today;
    this.party.beginTime = '13:30';
    this.party.endTime = '17:30';
    this.party.marry = 1;
    this.party.persons = 50;
    this.party.manAmt = 650;
    this.party.manEducaton = 4;
    this.party.manAge1 = 25;
    this.party.manAge2 = 40;
    this.party.womanAmt = 400;
    this.party.womanEducaton = 4;
    this.party.womanAge1 = 23;
    this.party.womanAge2 = 38;
    this.party.earlyDate = this.Today;
    this.party.earlyManAmt = 550;
    this.party.earlyWomanAmt = 300;
    this.party.womenAmt = 300;
    this.party.restaurant = '活動前三天公佈';
    this.party.addressNo = '活動前三天公佈';
    this.party.busNote = '活動前三天公佈';
    this.party.notes = '女生二人以上同行300元優待';
    this.party.pictureUrl = '../../assets/p001.png';
  }


}
