import { Category } from './category';
import { Group } from './group';
import { User } from './user';
import { BaseBean } from './baseBean';

export interface Item extends BaseBean {
    id: number;
	name: string;
	description: string;
	amount: number;
	purchaser: User;
	purchasedOn: Date;
	group: Group;
	category: Category;
}