import { Component, OnInit, Input } from '@angular/core';
import {Group} from '../group';
import {GROUPS} from '../list-of-groups';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  @Input() username:string;
  groups :any;
  displayGroups: any = [];
  selectedGroup:any;
  selectedGroupCreator:any;
  searchTerm = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  	this.getGroups();
  }


  /* GET GROUPS FROM BACKEND */
  getGroups():void{

    let url :string;
    url = "/api/pages/?format=json";

  	this.http.get(url).subscribe(data => {
      this.groups = data;
    })


  }

  onSelect(group:any):void{


    this.selectedGroup = group;

  }

  removefromList(g){
    var i:number = 0;
    for(i ; i < this.displayGroups.length;i++){
      if (this.displayGroups[i].title == g.title){
         this.displayGroups.splice(i,1);
      }
    } 
    i=0;
    for(i ; i < this.groups.length;i++){
      if (this.groups[i].title == g.title){
         this.groups.splice(i,1);
      }
    } 

  }



  /* SEARCH BAR */
  onKey(value:String):void{
    this.searchTerm = value;
    this.displayGroups = [];
    var notSelected: any = [];
    var notSelected2: any = [];
    console.log(this.groups[1].creator);
    var i:number = 0;

    for(i ; i < this.groups.length;i++){         //Search for title match first
      if((this.groups[i].title.toLowerCase()).search(value.toLowerCase()) != -1){
        this.displayGroups.push(this.groups[i]);
      }
      else{
        notSelected.push(this.groups[i]);
      }
    }

    i =0;
    for(i ; i < notSelected.length;i++){       //Search for typeOfGroup next
      if((notSelected[i].typeOfGroup.toLowerCase()).search(value.toLowerCase()) != -1){
        this.displayGroups.push(notSelected[i]);
      }
      else{
        notSelected2.push(notSelected[i]);
      }
    }

    notSelected = [];
    i=0;
    for(i ; i < notSelected2.length;i++){      //Search for creator next
      if((notSelected2[i].creator.toLowerCase()).search(value.toLowerCase()) != -1){
        this.displayGroups.push(notSelected2[i]);
      }
      else{
        notSelected.push(notSelected2[i]);
      }
    }

    i=0;

    for(i ; i < notSelected.length;i++){         //Search for description next
      if((notSelected[i].description.toLowerCase()).search(value.toLowerCase()) != -1){
        this.displayGroups.push(notSelected[i]);
      }
    }

  }

}
