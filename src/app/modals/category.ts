import { Item } from './item';
import { BaseBean } from './baseBean';

export interface Category extends BaseBean {
    id: number;
	name: string;
	items: Item[];
}