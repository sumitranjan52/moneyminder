import { Item } from './item';
import { User } from './user';
import { BaseBean } from './baseBean';

export interface Group extends BaseBean {
    id: number;
	name: string;
	description: string;
	encId: string;
	members: User[];
	items: Item[];
}