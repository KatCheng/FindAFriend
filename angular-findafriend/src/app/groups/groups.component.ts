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
  groups = ["dsf"];

  constructor(private http: HttpClient) { }

  ngOnInit() {
  	this.getGroups();
  }

  getGroups():void{
    console.log("fuck");


    let url :string;
    url = "/api/pages/?format=json";

   



    console.log(url);

  	this.http.get(url).subscribe(data => {
      // let obj = Group: JSON.parse(data);
      // console.log(obj.title);
      this.groups = data;
      console.log(this.groups);
    })
  }

}
