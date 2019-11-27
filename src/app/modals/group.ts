import { Item } from './item';
import { User } from './user';
import { BaseBean } from './baseBean';

export class Group extends BaseBean {
    id: number;
	name: string;
	description: string;
	members: User[];
	items: Item[];
}