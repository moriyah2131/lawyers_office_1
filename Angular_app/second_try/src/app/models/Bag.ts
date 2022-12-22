import { Asset } from './asset';
import { NewUser } from './new-user';

export interface Bag {
  id: number;
  bagName: string;
  bagState: string;
  lastOpen: Date;
  openDate?: Date;
  dateClose?: Date;
  buyers?: NewUser[];
  sellers?: NewUser[];
  agents?: NewUser[];
  asset?: Asset;
}
