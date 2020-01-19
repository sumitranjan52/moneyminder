import { SingletonService } from './../../services/singleton.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { ResponseObject } from './../../modals/responseObject';
import { CategoryService } from './../../dashboard/services/category.service';
import { Category } from './../../modals/category';

@Component({
  selector: 'app-create-category-dialog',
  templateUrl: './create-category-dialog.component.html',
  styleUrls: ['./create-category-dialog.component.css']
})
export class CreateCategoryDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CreateCategoryDialogComponent>,
    private fb: FormBuilder,
    private service: CategoryService,
    private snackBar: MatSnackBar,
    public singleton: SingletonService) { }

  form: FormGroup;

  message: string;

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required,
      Validators.maxLength(150),
      Validators.minLength(3),
      Validators.pattern("^[a-zA-Z ]{3,150}$")])]
    });
    if(this.singleton.categoryEdit.id){
      this.name.setValue(this.singleton.categoryEdit.name);
    }
  }

  get name() {
    return this.form.get("name");
  }

  createCategory(data: any) {
    console.log("create category");
    let category = {} as Category;
    category.name = data.name;
    if (category.name != null && category.name != undefined && this.name.errors == null) {
      this.service.create(category).subscribe(response => {
        if(response == null){
          this.message = "Something went wrong";
          return;
        }
        this.singleton.setToken(response);
        if (this.service.isCategory(response.body)){
          this.snackBar.open("Category created successfully", "Cool!", {
            duration: 3000
          });
          this.dialogRef.close(response.body);
        } else {
          this.message = (<ResponseObject>response.body).message;
        }
      }, (error: HttpErrorResponse) => {
        this.message = (<ResponseObject>error.error).message;
        this.singleton.setToken(error);
      });
    }
  }

  onNoClick(): void {
    this.singleton.categoryEdit = {} as Category;
    this.dialogRef.close();
  }

  updateCategory(data: any) {
    console.log("update category");
    let category = {
      id: this.singleton.categoryEdit.id
    } as Category;
    category.name = data.name;
    if (category.name != null && category.name != undefined && this.name.errors == null) {
      this.service.update(category).subscribe(response => {
        if(response == null){
          this.message = "Something went wrong";
          return;
        }
        this.singleton.setToken(response);
        if (this.service.isCategory(response.body)){
          this.singleton.categoryEdit = {} as Category;
          this.snackBar.open("Category updated successfully", "Cool!", {
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