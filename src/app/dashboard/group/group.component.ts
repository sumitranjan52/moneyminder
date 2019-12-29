import { ShareComponent } from './../../dialog/share/share.component';
import { ConfirmDialogComponent } from './../../dialog/confirm-dialog/confirm-dialog.component';
import { SingletonService } from './../../services/singleton.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, MatBottomSheet } from '@angular/material';

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
    private singleton: SingletonService,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet) { }

  groups: Group[] = [];
  originalGroupList: Group[] = [];
  message: string;

  grp = {} as Group;

  ngOnInit() {
    this.loadGroups();
  }

  searchGroup(evt) {
    var query: string = evt.target.value;
    if (query.trim().length > 0) {
      this.groups = this.originalGroupList.filter((grp) => {
        if (grp.name.indexOf(query) >= 0) {
          return grp;
        }
      });
    } else {
      this.groups = this.originalGroupList;
    }
  }

  loadGroups() {
    this.service.getAll().subscribe(response => {
      if (response == null) {
        this.message = "Something went wrong";
        return;
      }
      if (this.service.isResponseObj(response)) {
        this.message = (<ResponseObject>response).message;
      } else {
        this.groups = <Group[]>response;
        this.originalGroupList = this.groups;
        console.log(this.groups);
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
      if (result != null && result != undefined) {
        if (result.code === "JOINED") {
          this.loadGroups();
          this.snackBar.open(result.message, "Cool!", {
            duration: 3000
          });
        }
      }
      console.log('The join group dialog was closed');
    });
  }

  openCreateGroupDialog(): void {
    const dialogRef = this.dialog.open(CreateGroupDialogComponent, {
      width: '350px',
      //data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result != undefined) {
        if (result === "CREATED") {
          this.loadGroups();
        } else {
          this.groups.forEach((group) => {
            if (group.id === result.id) {
              group.name = result.name;
              group.description = result.description;
            }
          });
        }
      }
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
      if (result != undefined && result != null) {
        if (result.code == 'DELETED') {
          console.log(result);
          this.groups.splice(this.groups.indexOf(this.singleton.deleteData), 1);
          this.singleton.deleteData = {};
          this.snackBar.open(result.message, "Cool!", {
            duration: 3000
          });
        }
      }
      console.log('The delete dialog dialog was closed');
    });
  }

  edit(group: Group, event: Event) {
    event.stopPropagation();
    console.log(group);
    this.singleton.groupEdit = group;
    this.openCreateGroupDialog();
  }

  share(group: Group, event: Event) {
    event.stopPropagation();
    this.openShareSheet(group);
  }

  openShareSheet(group: Group) {
    const sheet = this.bottomSheet.open(ShareComponent, {
      data: group
    });

    sheet.afterDismissed().subscribe(result => {
      console.log(result);
    });
  }
}