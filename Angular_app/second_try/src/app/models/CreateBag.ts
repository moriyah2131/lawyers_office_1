import { Asset } from './asset';
import { NewUser } from './new-user';

export interface CreateBag {
  asset: Asset;
  participants: NewUser[];
}
