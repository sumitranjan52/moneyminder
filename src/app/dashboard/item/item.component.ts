import { Addition } from './../../modals/addition';
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
import { CreateCategoryDialogComponent } from 'src/app/dialog/create-category-dialog/create-category-dialog.component';
import { UpdateMemberComponent } from 'src/app/dialog/update-member/update-member.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(private dialog: MatDialog,
    private service: ItemService,
    private groupService: GroupService,
    public singleton: SingletonService,
    private snackBar: MatSnackBar,
    private router: Router) { }

  items: Item[] = [];
  message: string;
  total: number = 0.0;
  average: number = 0.0;
  groupData: Group;

  groupMemSum: Addition[] = [];

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

  getDateString(date: number) {
    return new Date(date).toDateString();
  }

  calculateTotal() {
    for (let item of this.items) {
      this.total += item.amount;
    }
  }

  calculateAvg() {
    if (this.singleton.group.members) {
      this.average = Math.floor((this.total / this.singleton.group.members.length)*100)/100;
      this.groupMemSum = [];
      for (let member of this.singleton.group.members) {
        let addition = {
          user: member,
          contribute: 0,
          pay: 0
        } as Addition;
        this.groupMemSum.push(addition);
      }
    } else {
      this.average = 0.0;
    }
    if (this.groupMemSum.length > 0) {
      for (let item of this.items) {
        this.groupMemSum.forEach((addition) => {
          if (addition.user.id === item.purchaser.id) {
            addition.contribute = addition.contribute + item.amount;
            addition.pay = addition.contribute - this.average;
          } else {
            addition.pay = addition.contribute - this.average;
          }
        });
      }
    }
  }

  openCreateItemDialog(): void {
    const dialogRef = this.dialog.open(CreateItemDialogComponent, {
      panelClass: "mm-panelClass"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result != undefined) {
        if (this.singleton.group.id) {
          this.loadGroupData();
        } else {
          this.loadItems();
        }
      }
    });
  }

  openFilterDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      panelClass: "mm-panelClass"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == null) {
        this.message = "No result found";
        return;
      }
      this.items = result;
      this.total = 0;
      this.calculateTotal();
      if (this.singleton.group != undefined && this.singleton.group.members) {
        this.calculateAvg();
      }
    });
  }

  loadItems() {
    this.service.getAll().subscribe(response => {
      if (response == null) {
        this.message = "Something went wrong";
        return;
      }
      this.singleton.setToken(response);
      if (this.service.isResponseObj(response.body)) {
        this.message = (<ResponseObject>response.body).message;
      } else {
        this.items = <Item[]>response.body;
        this.total = 0;
        this.calculateTotal();
      }
    }, (error: HttpErrorResponse) => {
      this.singleton.setToken(error);
      this.message = error.error.message;
      if (error.status === 401) {
        this.singleton.genLogout();
      }
    });
  }

  loadGroupData() {
    if (this.singleton.group.id) {
      this.groupService.get(this.singleton.group.id).subscribe(response => {
        if (response == null) {
          this.message = "Something went wrong";
          return;
        }
        this.singleton.setToken(response);
        if (this.service.isResponseObj(response.body)) {
          this.message = (<ResponseObject>response.body).message;
        } else {
          this.singleton.groupData = <Group>response.body;
          this.items = (<Group>response.body).items;
          this.total = 0;
          this.calculateTotal();
          this.calculateAvg();
        }
      }, (error: HttpErrorResponse) => {
        this.singleton.setToken(error);
        this.message = error.error.message;
        if (error.status === 401) {
          this.singleton.genLogout();
        }
      });
    }
  }

  editItem(data: Item) {
    this.singleton.itemEdit = data;
    this.openCreateItemDialog();
  }

  editCategory(data: Category) {
    this.singleton.categoryEdit = data;
    this.openCreateCategoryDialog();
  }

  openCreateCategoryDialog(): void {
    const dialogRef = this.dialog.open(CreateCategoryDialogComponent, {
      panelClass: "mm-panelClass",
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != null) {
        this.items.forEach((item) => {
          if (item.category.id === result.id) {
            item.category.name = result.name;
          }
        });
      }
    });
  }

  deleteItem(data: Item) {
    this.singleton.deleteData = data;
    this.openConfirmDialog();
  }

  deleteCategory(data: Category) {
    this.singleton.deleteData = data;
    this.openConfirmDialog();
  }

  openConfirmDialog(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px'
    });

    dialogRef.afterClosed().subscribe((result: ResponseObject) => {
      if (result != undefined && result != null) {
        if (result.code == 'DELETED') {
          if (result.message.indexOf("Item") > -1) {
            this.items.splice(this.items.indexOf(this.singleton.deleteData), 1);
          } else {
            this.items.forEach((item) => {
              if (item.category.id === this.singleton.deleteData.id) {
                item.category = null;
              }
            });
          }
          this.singleton.deleteData = {};
          this.snackBar.open(result.message, "Cool!", {
            duration: 3000
          });
        }
      }
    });
  }

  updateMem() {
    const updateMem = this.dialog.open(UpdateMemberComponent, {
      panelClass: "mm-panelClass",
    });

    updateMem.afterClosed().subscribe(resp => {
      if (resp != null && resp != undefined) {
        this.loadGroupData();
      }
    });
  }
}