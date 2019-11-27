import { BaseBean } from './baseBean';
import { User } from './user';

export class Token extends BaseBean {
    id: number;
	token: string;
	user: User;
}