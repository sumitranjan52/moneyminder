import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef, 
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: any) { }

  ngOnInit() {
  }

  getUrl() {
    return location.host + "/join/?token=" + this.data.encId;
  }

  close() {
    this.bottomSheetRef.dismiss();
  }

  copyText() {
    let textField = document.createElement("textarea");
    textField.style.position = 'fixed';
    textField.style.left = '0';
    textField.style.top = '0';
    textField.style.opacity = '0';
    textField.value = this.getUrl();
    document.body.appendChild(textField);
    textField.focus();
    textField.select();
    document.execCommand('copy');
    document.body.removeChild(textField);
    this.bottomSheetRef.dismiss();
  }
}
