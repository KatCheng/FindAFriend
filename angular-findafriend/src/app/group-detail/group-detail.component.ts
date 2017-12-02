import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
	@Input() group: any;
  @Input() username:string;
	@Input() inGroup:boolean;
  showMembers=null;

  constructor(private http: HttpClient) { }

  ngOnInit(){

  }


  seeMembers(){
  	if (this.showMembers == null){
  		this.showMembers = true;
      document.getElementById("memButton").innerHTML = this.group.members.length +" Members (Show)";
  	}
  	else{
  		this.showMembers = null;
  		document.getElementById("memButton").innerHTML = this.group.members.length +" Members (Show)";
  	}
  }

  leaveGroup(){
    this.http.get("api/leaveGroup/"+this.group.title +"/"+ this.username+"/").subscribe();
    this.inGroup=false;
    this.group.members.length = this.group.members.length-1;
  }

  joinGroup(){
    this.http.get("api/joinGroup/"+this.group.title +"/"+ this.username+"/").subscribe();
    this.inGroup=true;
    this.group.members.length = this.group.members.length-1;
  }

  deleteGroup(){
    this.http.get("api/deleteGroup/"+this.group.title).subscribe();
  }

}
