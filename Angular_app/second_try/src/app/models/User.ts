export interface User {
  personId: number;
  name: string;
  userType: 'LAWYER' | 'CUSTOMER';
  bagsIDs: number[];
  isFirstVisit: boolean;
}
