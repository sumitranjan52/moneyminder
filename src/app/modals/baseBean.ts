import { User } from './user';

export interface BaseBean {
    createdBy: User;
	createdOn: Date;
	lastModifiedBy: User;
	lastModifiedOn: Date;
	rowstate: number;
}