import { HttpErrorResponse } from '@angular/common/http';
import { GroupService } from './../../dashboard/services/group.service';
import { Group } from './../../modals/group';
import { SingletonService } from './../../services/singleton.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { User } from 'src/app/modals/user';

@Component({
  selector: 'app-update-member',
  templateUrl: './update-member.component.html',
  styleUrls: ['./update-member.component.css']
})
export class UpdateMemberComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<UpdateMemberComponent>,
    public singleton: SingletonService,
    private service: GroupService) { }

  ngOnInit() {
    if (this.singleton.group != null && this.singleton.group != undefined) {
      this.members = this.singleton.group.members;
    }
  }

  members = [] as User[];

  error: boolean = false;
  success: boolean = false;
  msg: string;

  close() {
    this.dialogRef.close();
  }

  updateMembers() {
    let group = {} as Group;
    group.id = this.singleton.group.id;
    group.members = this.members;
    if (group.members.length > 0) {
      this.service.updateMember(group).subscribe(resp => {
        if (resp == null) {
          this.error = true;
          this.msg = "Somwthing went wrong";
          return;
        }
        this.singleton.setToken(resp);
        if (resp.body != null && resp.body != undefined) {
          if (this.service.isGroup(resp.body)) {
            this.success = true;
            this.msg = "Group member updated successfully";
            this.singleton.group = resp.body;
            this.dialogRef.close(resp.body);
          } else {
            this.error = true;
            this.msg = resp.body.message;
          }
        }
      }, (error: HttpErrorResponse) => {
        this.singleton.setToken(error);
        if (error.status === 401) {
          this.msg = error.error.message;
          this.error = true;
          this.singleton.genLogout();
        } else if (error.status === 406) {
          this.error = true;
          this.msg = error.error.message;
        }
      });
    } else {
      this.error = true;
      this.msg = "Atleast one member should be selected while updating.";
    }
  }

}
