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
  // @Output() chGroup = new EventEmitter<string>();
  // setmembers(val:string){
  //   this.chGroup.emit(val);
  // }
  ingroup;
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
      // document.getElementById("memButton").innerHTML = " Members (Hide)";
  	}
  	else{
  		this.showMembers = null;
      element.textContent = "Other Members (Show)";
  		// document.getElementById("memButton").innerHTML = " Members (Show)";
  	}
  }

  leaveGroup(){
    this.http.get("api/leaveGroup/"+this.group.title +"/"+ this.username+"/").subscribe(result => {console.log("good");    let i=0;
    for(i ; i < this.group.members.length;i++){ 
      if (this.group.members[i].username == this.username || this.group.members[i] == this.username){
         this.group.members.splice(i,1);
      }
    };}, error => {this.leaveGroup();});
    this.inGroup=false;

    console.log("--------------");
    console.log(this.group.members);
    // this.checkInGroup();
    // parent.getGroups();
    // $scope.$parent.selectedGroup.members.push(this.username);
  }

  ngOnChange(){
    this.inGroup=this.inGroup;
    
  }

  joinGroup(){
    this.http.get("api/joinGroup/"+this.group.title +"/"+ this.username+"/").subscribe(result => {console.log("good");this.group.members.push(this.username);}, error => {this.joinGroup();});
    this.inGroup=true;
    // for (let u of this.group.members){
    //   if (u.username == this.username){
    
    console.log("--------------");
    console.log(this.group.members);

      // }
      // this.checkInGroup();
    // }
    // setmembers(this.username);
  }

  deleteGroup(){
    this.http.get("api/deleteGroup/"+this.group.title).subscribe();
    // setTimeout(() => {
    // 	window.location.reload();
    // }, 10);
    this.groupDeleted.emit(this.group);
    this.group = null;
  }

  updateGroup(event, typeOfGroup, description) {
    this.http.get("api/updateGroup/"+this.group.title +"/"+ description+"/"+typeOfGroup).subscribe();
    // setTimeout(() => {
    // 	window.location.reload();
    // }, 100);
    this.group.description=description;
    this.group.typeOfGroup = typeOfGroup;
  }

  checkInGroup():boolean{
    for (let u of this.group.members){
      if (u.username == this.username || u ==this.username){
        console.log("gucci");
        return true;
      }
    }



    return false;  
  }


}



















