export interface NewUser {
  id?: number;
  firstName?: string;
  lastName?: string;
  phone?: string;
  secondPhone?: string;
  email: string;
  tz?: string;
  livingAddress?: string;
  userType: 'buyer' | 'seller' | 'lawyer';
}
