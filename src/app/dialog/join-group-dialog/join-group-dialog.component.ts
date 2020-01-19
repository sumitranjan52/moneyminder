import { HttpErrorResponse } from '@angular/common/http';
import { SingletonService } from './../../services/singleton.service';
import { GroupService } from './../../dashboard/services/group.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Group } from 'src/app/modals/group';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-join-group-dialog',
  templateUrl: './join-group-dialog.component.html',
  styleUrls: ['./join-group-dialog.component.css']
})
export class JoinGroupDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<JoinGroupDialogComponent>,
    private fb: FormBuilder,
    private service: GroupService,
    private singleton: SingletonService) { }

  joinForm: FormGroup;

  message: string;

  ngOnInit() {
    this.joinForm = this.fb.group({
      code: [null, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  join(value: any) {
    let group = {} as Group;
    group.encId = value.code;
    if (!this.joinForm.invalid) {
      this.service.join(group).subscribe(response => {
        this.singleton.setToken(response);
        if (response.body.code === "JOINED") {
          this.dialogRef.close(response.body);
        } else {
          this.message = response.body.message;
        }
      }, (error: HttpErrorResponse) => {
        this.singleton.setToken(error);
        if (error.status === 401) {
          this.message = error.error.message;
          this.singleton.genLogout();
        } else if (error.status === 406) {
          this.message = error.error.message;
        }
      });
    }
  }
}