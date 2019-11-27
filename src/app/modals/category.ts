import { Item } from './item';
import { BaseBean } from './baseBean';

export class Category extends BaseBean {
    id: number;
	name: string;
	items: Item[];
}