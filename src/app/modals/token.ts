import { BaseBean } from './baseBean';
import { User } from './user';

export interface Token extends BaseBean {
    id: number;
	token: string;
	user: User;
}