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
    public singleton: SingletonService) { }

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
    if (this.singleton.itemEdit.id) {
      const item = this.singleton.itemEdit;
      this.name.setValue(item.name);
      this.form.get("description").setValue(item.description);
      this.amount.setValue(item.amount);
      this.purchasedon.setValue(new Date(item.purchasedOn));
      console.log("category", item.category);
      if (item.category) {
        this.form.get("category").setValue(item.category.id);
      }
      if (this.singleton.group.id) {
        this.purchasedby.setValue(item.purchaser.id);
      }
    }
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
    console.log("post request in item dialog");
    let item = {} as Item;
    if (this.singleton.group.id != null) {
      item.group = this.singleton.group;
    }
    item.name = data.name;
    item.description = data.description;
    item.amount = parseFloat(data.amount);
    item.purchasedOn = data.purchasedon;
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
    console.log(item);
    if (item.name != null && item.amount > 0 && item.purchasedOn != null &&
      this.name.errors == null && this.amount.errors == null && this.purchasedon.errors == null) {
      this.itemService.create(item).subscribe(response => {
        console.log(response);
        if (response == null) {
          this.message = "Something went wrong";
          return;
        }
        this.singleton.setToken(response);
        if (this.itemService.isItem(response.body)) {
          this.snackBar.open("Item created successfully", "Cool!", {
            duration: 3000
          });
          this.dialogRef.close(response.body);
        } else {
          this.message = (<ResponseObject>response.body).message;
        }
      }, (error: HttpErrorResponse) => {
        console.log(error);
        this.singleton.setToken(error);
        this.message = (<ResponseObject>error.error).message;
      });
    }
  }

  onNoClick(): void {
    this.singleton.itemEdit = {} as Item;
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
      this.singleton.setToken(response);
      if (this.categoryService.isResponseObj(response.body)) {
        this.message = (<ResponseObject>response.body).message;
      } else {
        this.categories = <Category[]>response.body;
      }
    }, (error: HttpErrorResponse) => {
      this.singleton.setToken(error);
      this.message = error.error.message;
    });
  }

  updateItem(data: any) {
    console.log("put request in item dialog");
    let item = {
      id: this.singleton.itemEdit.id
    } as Item;
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
    item.purchaser = {
      id: parseInt(data.purchasedby)
    } as User;
    item.purchasedOn = data.purchasedon;
    console.log(item);
    if (item.name != null && item.amount > 0 && item.purchasedOn != null &&
      this.name.errors == null && this.amount.errors == null && this.purchasedon.errors == null) {
      this.itemService.update(item).subscribe(response => {
        if (response == null) {
          this.message = "Something went wrong";
          return;
        }
        this.singleton.setToken(response);
        if (this.itemService.isItem(response.body)) {
          this.singleton.itemEdit = {} as Item;
          this.snackBar.open("Item updated successfully", "Cool!", {
            duration: 3000
          });
          this.dialogRef.close(response.body);
        } else {
          this.message = (<ResponseObject>response.body).message;
        }
      }, (error: HttpErrorResponse) => {
        this.singleton.setToken(error);
        this.message = (<ResponseObject>error.error).message;
      });
    }
  }
}
