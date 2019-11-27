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
    private snackBar: MatSnackBar) { }

  form: FormGroup;

  message: string;

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, Validators.compose([Validators.required,
      Validators.maxLength(150),
      Validators.minLength(3),
      Validators.pattern("^[a-zA-Z ]{3,150}$")])]
    });
  }

  get name() {
    return this.form.get("name");
  }

  createCategory(data: any) {
    let category = {} as Category;
    category.name = data.name;
    if (category.name != null && category.name != undefined && this.name.errors == null) {
      this.service.create(category).subscribe(response => {
        if(response == null){
          this.message = "Something went wrong";
          return;
        }
        if (this.service.isCategory(response)){
          this.snackBar.open("Category created successfully", "Cool!", {
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

}