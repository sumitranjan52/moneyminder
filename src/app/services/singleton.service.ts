import { Injectable, EventEmitter } from '@angular/core';

import { Group } from './../modals/group';

@Injectable()
export class SingletonService {

  groupData = {} as Group;

  deleteData = {} as any;

  eventEmitter = new EventEmitter();

  constructor() { }

  get group(): Group {
    return this.groupData;
  }

  set group(value: Group) {
    this.groupData = value;
    this.eventEmitter.emit(value);
  }
}
