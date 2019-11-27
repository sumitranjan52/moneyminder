import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

import { Category } from './../../modals/category';
import { ConfirmDialogComponent } from './../../dialog/confirm-dialog/confirm-dialog.component';
import { GroupService } from './../services/group.service';
import { SingletonService } from './../../services/singleton.service';
import { ResponseObject } from './../../modals/responseObject';
import { CreateItemDialogComponent } from './../../dialog/create-item-dialog/create-item-dialog.component';
import { Item } from './../../modals/item';
import { ItemService } from './../services/item.service';
import { Group } from './../../modals/group';
import { FilterDialogComponent } from './../../dialog/filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private service: ItemService,
    private groupService: GroupService,
    private singleton: SingletonService,
    private snackBar: MatSnackBar) { }

  items: Item[];
  message: string;
  total: number = 0.0;
  average: number = 0.0;
  groupData: Group;

  ngOnInit() {
    this.singleton.eventEmitter.subscribe((data: Group) => {
      if (data.id) {
        this.loadGroupData();
      } else {
        this.loadItems();
      }
    });
    this.loadItems();
  }

  calculateTotal() {
    for (let item of this.items) {
      this.total += item.amount;
    }
  }

  calculateAvg() {
    this.average = this.total / this.singleton.group.members.length;
  }

  openCreateItemDialog(): void {
    const dialogRef = this.dialog.open(CreateItemDialogComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result != undefined) {
        if (this.singleton.group.id) {
          this.loadGroupData();
        } else {
          this.loadItems();
        }
      }
      console.log('The create dialog dialog was closed');
    });
  }

  openFilterDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The create dialog dialog was closed');
    });
  }

  loadItems() {
    this.service.getAll().subscribe(response => {
      if (response == null) {
        this.message = "Something went wrong";
        return;
      }
      if (this.service.isResponseObj(response)) {
        this.message = (<ResponseObject>response).message;
      } else {
        this.items = <Item[]>response;
        this.total = 0;
        this.calculateTotal();
      }
    }, (error: HttpErrorResponse) => {
      this.message = error.error.message;
    });
  }

  loadGroupData() {
    if (this.singleton.group.id) {
      this.groupService.get(this.singleton.group.id).subscribe(response => {
        if (response == null) {
          this.message = "Something went wrong";
          return;
        }
        if (this.service.isResponseObj(response)) {
          this.message = (<ResponseObject>response).message;
        } else {
          this.singleton.groupData = <Group>response;
          this.items = (<Group>response).items;
          this.total = 0;
          this.calculateTotal();
          this.calculateAvg();
        }
      }, (error: HttpErrorResponse) => {
        this.message = error.error.message;
      });
    }
  }

  editItem(data: Item) {
    console.log(data);
  }

  editCategory(data: Category) {
    console.log(data);
  }

  deleteItem(data: Item) {
    console.log(data);
    this.singleton.deleteData = data;
    this.openConfirmDialog();
  }

  deleteCategory(data: Category) {
    console.log(data);
    this.singleton.deleteData = data;
    this.openConfirmDialog();
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        if(result.code =='DELETED') {
          console.log(result);
          this.items.splice(this.items.indexOf(this.singleton.deleteData), 1);
          this.snackBar.open(result.message, "Cool!", {
            duration: 3000
          });
        }
      }
      console.log('The delete dialog was closed');
    });
  }
}