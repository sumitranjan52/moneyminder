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
    private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required,
      Validators.maxLength(150),
      Validators.minLength(3)])],
      description: [null]
    });
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
        if(response == null){
          this.message = "Something went wrong";
          return;
        }
        if (response instanceof Group){
          this.snackBar.open("Group created successfully", "Cool!", {
            duration: 3000
          });
          this.dialogRef.close();
        } else {
          this.message = (<ResponseObject>response).message;
        }
      }, (error: HttpErrorResponse) => {
        this.message = (<ResponseObject>error.error).message;
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
