import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { User } from './user';

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
  user: User;
}
