// import { UseExistingWebDriver } from 'protractor/built/driverProviders';
// import { User } from './user';
// import { Party } from './party';

export interface Activity {
  id: number;
  partyId: number;
  userId: number;
  applyDate: Date;
  actAmt: number;
  bankName: string;
  bankNumber6: string;
  bankDate: string;
  friendsName: string;
  myNo: number;
  checkOver: number;
  notes: string;
  retrunNote: string;

  // user: User;
  // party: Party;
  firstName: string;
  lastName: string;
  sex: number;
  birthYear: number;
  mainPhotoUrl: string;
  education: number;
  marry: number;

  // 以下為活動檔的資料
  partyName: string;
  partyDate: Date;
}
