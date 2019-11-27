import { BaseBean } from './baseBean';

export class User extends BaseBean{
    id: number;
	name: string;
	username: string;
	email: string;
	mobile: string;
	password: string;
}