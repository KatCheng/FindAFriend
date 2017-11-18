import { Component, OnInit } from '@angular/core';
import {Group} from '../group';
import {GROUPS} from '../list-of-groups';
import { GroupServiceService } from '../group-service.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  
  groups :Group[];

  constructor(private groupService:GroupServiceService) { }

  ngOnInit() {
  	this.getGroups();
  }

  getGroups():void{
  	this.groupService.getGroups()
      .subscribe(groups => this.groups = groups);
  }

}
