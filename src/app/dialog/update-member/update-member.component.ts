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
    private singleton: SingletonService,
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
    console.log(this.members);
    let group = {} as Group;
    group.id = this.singleton.group.id;
    group.members = this.members;
    console.log("new group ", group);
    if (group.members.length > 0) {
      this.service.updateMember(group).subscribe(resp => {
        if (resp != null && resp != undefined) {
          if (this.service.isGroup(resp)) {
            this.success = true;
            this.msg = "Group member updated successfully";
            this.singleton.group = resp;
            this.dialogRef.close(resp);
          } else {
            this.error = true;
            this.msg = resp.message;
          }
        }
      }, (error: HttpErrorResponse) => {
        console.log(error);
      });
    } else {
      this.error = true;
      this.msg = "Atleast one member should be selected while updating.";
    }
  }

}
