import { User } from './../../modals/user';
import { SingletonService } from './../../services/singleton.service';
import { Item } from './../../modals/item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { HttpErrorResponse } from '@angular/common/http';

import { Category } from './../../modals/category';
import { CategoryService } from './../../dashboard/services/category.service';
import { ItemService } from './../../dashboard/services/item.service';
import { CreateCategoryDialogComponent } from '../create-category-dialog/create-category-dialog.component';
import { ResponseObject } from 'src/app/modals/responseObject';

@Component({
  selector: 'app-create-item-dialog',
  templateUrl: './create-item-dialog.component.html',
  styleUrls: ['./create-item-dialog.component.css']
})
export class CreateItemDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateItemDialogComponent>,
    private dialog: MatDialog,
    private itemService: ItemService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private singleton: SingletonService) { }

  categories: Category[];
  message: string;

  form: FormGroup;

  ngOnInit() {
    this.loadCategories();
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required,
      Validators.minLength(3),
      Validators.maxLength(150)])],
      description: [null],
      amount: [0, Validators.compose([Validators.required,
      Validators.pattern("[1-9]{1}[0-9]{0,10}")])],
      purchasedon: [null, Validators.required],
      purchasedby: [null, Validators.required],
      category: [null]
    });
  }

  get name() {
    return this.form.get("name");
  }

  get amount() {
    return this.form.get("amount");
  }

  get purchasedon() {
    return this.form.get("purchasedon");
  }

  get purchasedby() {
    return this.form.get("purchasedby");
  }

  createItem(data: any) {
    let date: Date;
    let item = {} as Item;
    if (this.singleton.group.id != null) {
      item.group = this.singleton.group;
    }
    item.name = data.name;
    item.description = data.description;
    item.amount = parseFloat(data.amount);
    if (data.category != null && data.category != undefined) {
      item.category = {
        id: parseInt(data.category)
      } as Category;
    }
    if (data.purchasedby != null && data.purchasedby != undefined) {
      item.purchaser = {
        id: parseInt(data.purchasedby)
      } as User;
    }
    date = <Date>data.purchasedon;
    if (date != null) {
      item.purchasedOn = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }
    console.log(item);
    if (item.name != null && item.amount > 0 && item.purchasedOn != null &&
      this.name.errors == null && this.amount.errors == null && this.purchasedon.errors == null) {
      this.itemService.create(item).subscribe(response => {
        if (response == null) {
          this.message = "Something went wrong";
          return;
        }
        if (this.itemService.isItem(response)) {
          this.snackBar.open("Item created successfully", "Cool!", {
            duration: 3000
          });
          this.dialogRef.close(response);
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

  openCreateCategoryDialog(): void {
    const dialogRef = this.dialog.open(CreateCategoryDialogComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != null) {
        this.loadCategories();
      }
      console.log('The create dialog dialog was closed');
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(response => {
      if (response == null) {
        this.message = "Something went wrong";
        return;
      }
      if (this.categoryService.isResponseObj(response)) {
        this.message = (<ResponseObject>response).message;
      } else {
        this.categories = <Category[]>response;
      }
    }, (error: HttpErrorResponse) => {
      this.message = error.error.message;
    });
  }
}
