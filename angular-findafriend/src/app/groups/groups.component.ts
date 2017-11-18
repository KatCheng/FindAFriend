import { Component, OnInit } from '@angular/core';
import {Group} from '../group';
import {GROUPS} from '../list-of-groups';
import { GroupServiceService } from '../group-service.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  
  groups :string[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
  	this.getGroups();
  }

  getGroups():void{
    console.log("fuck");
  	this.http.get('/api/pages').subscribe(data => {
      this.groups = data['creator']
    })
  }

}
