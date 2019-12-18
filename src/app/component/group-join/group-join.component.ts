import { GroupService } from './../../dashboard/services/group.service';
import { SingletonService } from './../../services/singleton.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/modals/group';

@Component({
  selector: 'app-group-join',
  templateUrl: './group-join.component.html',
  styleUrls: ['./group-join.component.css']
})
export class GroupJoinComponent implements OnInit {

  constructor(private singleton: SingletonService,
    private activated: ActivatedRoute,
    private service: GroupService) { }

  message: string;
  success: boolean = false;
  error: boolean = false;
  group = {} as Group;

  record: boolean = false;
  disabled: boolean = false;

  ngOnInit() {
    this.activated.queryParams.subscribe(param => {
      const token = param["token"];
      console.log(token);
      if (token != null && token != undefined) {
        let group = {} as Group;
        group.encId = token;
        this.service.getGroup(group).subscribe(resp => {
          if (resp != null && resp != undefined) {
            if (this.service.isGroup(resp)) {
              this.group = resp;
              this.record = true;
            } else {
              this.message = resp.message;
              this.error = true;
            }
          }
        });
      }
    });
  }

  joinGroup() {
    this.record = false;
    this.disabled = true;
    this.service.join(this.group).subscribe(response => {
      console.log(response);
      this.message = response.message;
      if (response.code === "JOINED") {
        this.success = true;
      } else {
        this.error = true;
      }
      this.record = true;
    });
  }
}
