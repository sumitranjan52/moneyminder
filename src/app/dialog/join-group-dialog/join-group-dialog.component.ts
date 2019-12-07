import { GroupService } from './../../dashboard/services/group.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Group } from 'src/app/modals/group';

@Component({
  selector: 'app-join-group-dialog',
  templateUrl: './join-group-dialog.component.html',
  styleUrls: ['./join-group-dialog.component.css']
})
export class JoinGroupDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<JoinGroupDialogComponent>,
    private fb: FormBuilder,
    private service: GroupService) { }

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
    console.log(group);
    if (!this.joinForm.invalid) {
      this.service.join(group).subscribe(response => {
        console.log(response);
        if (response.code === "JOINED") {
          this.dialogRef.close();
        } else {
          this.message = response.message;
        }
      });
    }
  }
}