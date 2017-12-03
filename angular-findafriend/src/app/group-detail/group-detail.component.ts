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
  updateSee=null;

  constructor(private http: HttpClient) { }

  ngOnInit(){

  }

  updateClicked(){
    if (this.updateSee==null){
      this.updateSee=true;
    }
    else{
      this.updateSee=null;
    }
  }


  seeMembers(){
  	if (this.showMembers == null){
  		this.showMembers = true;
      document.getElementById("memButton").innerHTML = " Members (Hide)";
  	}
  	else{
  		this.showMembers = null;
  		document.getElementById("memButton").innerHTML = " Members (Show)";
  	}
  }

  leaveGroup(){
    this.http.get("api/leaveGroup/"+this.group.title +"/"+ this.username+"/").subscribe();
    this.inGroup=false;

  }

  joinGroup(){
    this.http.get("api/joinGroup/"+this.group.title +"/"+ this.username+"/").subscribe();
    this.inGroup=true;
  }

  deleteGroup(){
    this.http.get("api/deleteGroup/"+this.group.title).subscribe();
    setTimeout(() => {
    	window.location.reload();
    }, 100);
  }

  updateGroup(event, typeOfGroup, description) {
    this.http.get("api/updateGroup/"+this.group.title +"/"+ description+"/"+typeOfGroup).subscribe();
  }

}



















