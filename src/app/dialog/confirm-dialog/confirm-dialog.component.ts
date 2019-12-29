import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

import { CategoryService } from './../../dashboard/services/category.service';
import { GroupService } from './../../dashboard/services/group.service';
import { SingletonService } from './../../services/singleton.service';
import { ItemService } from './../../dashboard/services/item.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  which: number;

  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    public singleton: SingletonService,
    private itemService: ItemService,
    private groupService: GroupService,
    private categoryService: CategoryService) { }

  ngOnInit() {
    this.whichObj();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  whichObj() {
    if (this.itemService.isItem(this.singleton.deleteData)) {
      this.which = 1;
    } else if (this.itemService.isGroup(this.singleton.deleteData)) {
      this.which = 2;
    } else if (this.itemService.isCategory(this.singleton.deleteData)) {
      this.which = 3;
    }
    console.log(this.which);
    return this.which;
  }

  delete() {
    switch (this.which) {
      case 1:
        console.log("Item to delete ", this.singleton.deleteData.name);
        this.itemService.delete(this.singleton.deleteData.id).subscribe(response => {
          console.log(response);
          this.dialogRef.close(response);
        }, (error: HttpErrorResponse) => {
          console.log(error);
        });
        break;
      case 2:
        console.log("group to delete", this.singleton.deleteData.name);
        this.groupService.delete(this.singleton.deleteData.id).subscribe(response => {
          console.log(response);
          this.dialogRef.close(response);
        }, (error: HttpErrorResponse) => {
          console.log(error);
        });
        break;
      case 3:
        console.log("category to delete", this.singleton.deleteData.name);
        this.categoryService.delete(this.singleton.deleteData.id).subscribe(response => {
          console.log(response);
          this.dialogRef.close(response);
        }, (error: HttpErrorResponse) => {
          console.log(error);
        });
        break;
      default:
        console.log("Failed to delete");
        break;
    }
  }
}
