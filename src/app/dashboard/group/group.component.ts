import { ConfirmDialogComponent } from './../../dialog/confirm-dialog/confirm-dialog.component';
import { SingletonService } from './../../services/singleton.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { Group } from './../../modals/group';
import { GroupService } from './../services/group.service';
import { JoinGroupDialogComponent } from '../../dialog/join-group-dialog/join-group-dialog.component';
import { CreateGroupDialogComponent } from './../../dialog/create-group-dialog/create-group-dialog.component';
import { HttpErrorResponse } from '@angular/common/http';
import { ResponseObject } from 'src/app/modals/responseObject';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  constructor(public dialog: MatDialog,
    private service: GroupService,
    private singleton: SingletonService) { }

  groups: Group[];
  message: string;

  ngOnInit() {
    this.service.getAll().subscribe(response => {
      if (response == null) {
        this.message = "Something went wrong";
        return;
      }
      if (this.service.isResponseObj(response)) {
        this.message = (<ResponseObject>response).message;
      } else {
        this.groups = <Group[]>response;
      }
    }, (error: HttpErrorResponse) => {
      this.message = error.error.message;
    });
  }

  openJoinGroupDialog(): void {
    const dialogRef = this.dialog.open(JoinGroupDialogComponent, {
      width: '350px',
      //data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The join group dialog was closed');
    });
  }

  openCreateGroupDialog(): void {
    const dialogRef = this.dialog.open(CreateGroupDialogComponent, {
      width: '350px',
      //data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The create dialog dialog was closed');
    });
  }

  loadGroupItem(group: Group) {
    this.singleton.group = group;
  }

  delete(group: Group, event: Event) {
    event.stopPropagation();
    console.log(group);

    this.singleton.deleteData = group;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      //data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The delete dialog dialog was closed');
    });
  }

  edit(group: Group, event: Event) {
    event.stopPropagation();
    console.log(group);
  }
}