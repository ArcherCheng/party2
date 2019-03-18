export interface Party {
  partyId: number;
  partyName: string;
  partyDate: Date;
  beginTime: string;
  endTime: string;
  marry: number;
  persons: number;

  manAmt: number;
  manEducaton: number;
  manOlds1: number;
  manOlds2: number;
  womanAmt: number;
  womanEducaton: number;
  womanOlds1: number;
  womanOlds2: number;
  earlyDate?: Date;
  earlyManAmt?: number;
  earlyWomanAmt?: number;
  womenAmt?: number;

  restaurant: string;
  addressNo: string;
  busNote: string;
  notes: string;
  pictureUrl: string;
}
