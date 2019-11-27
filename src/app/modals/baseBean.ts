import { User } from './user';

export class BaseBean {
    createdBy: User;
	createdOn: Date;
	lastModifiedBy: User;
	lastModifiedOn: Date;
	rowstate: number;
}