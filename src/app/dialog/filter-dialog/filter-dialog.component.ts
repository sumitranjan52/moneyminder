import { User } from './../../modals/user';
import { Group } from './../../modals/group';
import { ItemService } from './../../dashboard/services/item.service';
import { Item } from './../../modals/item';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SingletonService } from './../../services/singleton.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-filter-dialog',
  templateUrl: './filter-dialog.component.html',
  styleUrls: ['./filter-dialog.component.css']
})
export class FilterDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FilterDialogComponent>,
    public singleton: SingletonService,
    private fb: FormBuilder,
    private service: ItemService) { }

  filterForm: FormGroup;

  ngOnInit() {
    this.filterForm = this.fb.group({
      purchaser: [null],
      start: [null, Validators.required],
      end: [null, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  items: Item[];

  filter(formData: any) {
    let item = {} as Item;
    if (formData.purchaser != undefined && formData.purchaser != null) {
      item.purchaser = {
        id: formData.purchaser
      } as User;
    }
    if (this.singleton.group.id) {
      item.group = {
        id: this.singleton.group.id
      } as Group;
    }
    item.purchasedOn = formData.start;
    item.lastModifiedOn = formData.end;
    if (!this.filterForm.invalid) {
      this.service.search(item).subscribe(response => {
        if (response == null) {
          this.dialogRef.close(null);
          return;
        }
        console.log("items ", response);
        this.items = <Item[]>response;
        this.singleton.filterItem = item;
        this.dialogRef.close(this.items);
      });
    }
  }

}