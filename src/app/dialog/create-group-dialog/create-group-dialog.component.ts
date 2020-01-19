import { SingletonService } from './../../services/singleton.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { ResponseObject } from 'src/app/modals/responseObject';
import { HttpErrorResponse } from '@angular/common/http';

import { GroupService } from './../../dashboard/services/group.service';
import { Group } from './../../modals/group';

@Component({
  selector: 'app-create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
  styleUrls: ['./create-group-dialog.component.css']
})
export class CreateGroupDialogComponent implements OnInit {

  form: FormGroup;

  message: string;

  constructor(public dialogRef: MatDialogRef<CreateGroupDialogComponent>,
    private snackBar: MatSnackBar,
    private service: GroupService,
    private fb: FormBuilder,
    public singleton: SingletonService) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required,
      Validators.maxLength(150),
      Validators.minLength(3)])],
      description: [null]
    });
    if (this.singleton.groupEdit.id) {
      this.name.setValue(this.singleton.groupEdit.name);
      this.form.get("description").setValue(this.singleton.groupEdit.description);
    }
  }

  get name() {
    return this.form.get("name");
  }

  createGroup(data: any) {
    let group = {} as Group;
    group.name = data.name;
    group.description = data.description;
    if (group.name != null && group.name != undefined && this.name.errors == null) {
      this.service.create(group).subscribe(response => {
        if (response == null) {
          this.message = "Something went wrong";
          return;
        }
        this.singleton.setToken(response);
        if (this.service.isGroup(response.body)) {
          this.snackBar.open("Group created successfully", "Cool!", {
            duration: 3000
          });
          this.dialogRef.close("CREATED");
        } else {
          this.message = (<ResponseObject>response.body).message;
        }
      }, (error: HttpErrorResponse) => {
        this.singleton.setToken(error);
        if (error.status === 401) {
          this.singleton.genLogout();
        }
        this.message = (<ResponseObject>error.error).message;
      });
    }
  }

  onNoClick(): void {
    this.singleton.groupEdit = {} as Group;
    this.dialogRef.close();
  }

  updateGroup(data: any) {
    let group = {
      id: this.singleton.groupEdit.id
    } as Group;
    group.name = data.name;
    group.description = data.description;
    if (group.name != null && group.name != undefined && this.name.errors == null) {
      this.service.update(group).subscribe(response => {
        if (response == null) {
          this.message = "Something went wrong";
          return;
        }
        this.singleton.setToken(response);
        if (this.service.isGroup(response.body)) {
          if (this.singleton.group.id) {
            this.singleton.group = response.body;
          }
          this.singleton.groupEdit = {} as Group;
          this.snackBar.open("Group updated successfully", "Cool!", {
            duration: 3000
          });
          this.dialogRef.close(response.body);
        } else {
          this.message = (<ResponseObject>response.body).message;
        }
      }, (error: HttpErrorResponse) => {
        this.singleton.setToken(error);
        if (error.status === 401) {
          this.singleton.genLogout();
        }
        this.message = (<ResponseObject>error.error).message;
      });
    }
  }

}
