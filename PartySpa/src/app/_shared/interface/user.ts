import { Photo } from './photo';
// import { UserCondition } from './UserCondition';

export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  birthday: Date;

  sex: number;
  marry: number;
  education: number;
  heights: number;
  weights: number;
  salary: number;

  blood: string;
  star: string;
  city: string;
  jobType: string;
  religion: string;

  school: string;
  subjects: string;
  introduction: string;
  likeCondition: string;
  mainPhotoUrl: string;

  nickName: string;
  pdQuestion: string;
  pdAnswer: string;
  bankName: string;
  bankNumber6: string;
  isCloseData: boolean;
  isClosePhoto: boolean;

  // 計算出來的虛擬欄位
  userName: string;
  age: number;
  photos?: Photo[];
  // userCondition: UserCondition;
}
