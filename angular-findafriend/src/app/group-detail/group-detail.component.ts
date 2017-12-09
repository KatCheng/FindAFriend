import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
  @Output() groupDeleted = new EventEmitter<any>();

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


  seeMembers(element){
  	if (this.showMembers == null){
  		this.showMembers = true;
      element.textContent = "Other Members (Hide)";
  	}
  	else{
  		this.showMembers = null;
      element.textContent = "Other Members (Show)";
  	}
  }

  leaveGroup(){
    this.http.get("api/leaveGroup/"+this.group.title +"/"+ this.username+"/").subscribe(result => {console.log("good");    let i=0;
    for(i ; i < this.group.members.length;i++){ 
      if (this.group.members[i].username == this.username || this.group.members[i] == this.username){
         this.group.members.splice(i,1);
      }
    };}, error => {this.leaveGroup();});

  }

  joinGroup(){
    this.http.get("api/joinGroup/"+this.group.title +"/"+ this.username+"/").subscribe(result => {this.group.members.push(this.username);}, error => {this.joinGroup();});
   
  }

  deleteGroup(){
    this.http.get("api/deleteGroup/"+this.group.title).subscribe();
    this.groupDeleted.emit(this.group);
    this.group = null;
  }

  updateGroup(event, typeOfGroup, description) {
    this.http.get("api/updateGroup/"+this.group.title +"/"+ description+"/"+typeOfGroup).subscribe();
    this.group.description=description;
    this.group.typeOfGroup = typeOfGroup;
  }

  checkInGroup():boolean{
    for (let u of this.group.members){
      if (u.username == this.username || u ==this.username){
        return true;
      }
    }
    return false;  
  }
}



















