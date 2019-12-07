import { Injectable, EventEmitter } from '@angular/core';

import { Item } from '../modals/item';
import { Group } from './../modals/group';
import { Category } from './../modals/category';

@Injectable()
export class SingletonService {

  groupData = {} as Group;

  deleteData = {} as any;

  itemEdit = {} as Item;
  groupEdit = {} as Group;
  categoryEdit = {} as Category;

  filterItem = {} as Item;

  eventEmitter = new EventEmitter();

  constructor() { }

  get group(): Group {
    return this.groupData;
  }

  set group(value: Group) {
    this.groupData = value;
    this.filterItem = {} as Item;
    this.eventEmitter.emit(value);
  }
}
