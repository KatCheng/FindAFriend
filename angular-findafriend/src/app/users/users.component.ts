import { Component, OnInit, Input } from '@angular/core';
import {User} from '../user';
import {USERS} from '../list-of-users';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @Input() username:string;
  something: string;
  users :any = [];
  userProfile: any = [];
  // selectedUser:any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  	this.getUser();
    console.log(this.username);
  }

  alert(msg?: string)      { window.alert(msg); }
  canSave=true;

  /* GET GROUPS FROM BACKEND */
  getUser():void{

    let url :string;
    url = "/api/users/?format=json";

    console.log(url);

  	this.http.get(url).subscribe(data => {
      // let obj = User: JSON.parse(data);
      // console.log(obj.title);
      this.users = data;
      console.log(this.users);
      this.putUsers();
    })
  }

  // onSelect(user:any):void{
  //   console.log("ayyyy");
  //   this.selectedUser = user;
  // }

  // addUser(user:User){
  //   this.alert(`Join ${user ? user.title : 'this user'}.`);
  // }

  // var i:number = 0;
  // this.displayUsers = [];

  // for(i ; i <this.users.length; i++){         //Search for title match first
  //   // if((this.users[i].title.toLowerCase()).search(value.toLowerCase()) != -1){
  //     this.displayUsers.push(this.users[i]);
  //     // console.log(this.displayUsers);
  //   // }
  //   // else{
  //   //   notSelected.push(this.users[i]);
  //   // }
  // }
  putUsers(): void {
    // this.something = this.users[0].username;
    //something: string = displayUsers.username;
    // console.log("gsfsf");
    var i:number = 0;

    for(i ; i <this.users.length;i++){         //Search for title match first
      if((this.users[i].username.toLowerCase()).search(this.username.toLowerCase()) != -1){
        this.userProfile = this.users[i];
        // this.something = this.userProfile.url;
        // console.log(this.something);
      }
    }
  }


  /* SEARCH BAR */
  // onKey(value:String):void{
  //   this.displayUsers = [];
  //   var notSelected: any = [];
  //   var notSelected2: any = [];


  //   var i:number = 0;

    // for(i ; i <this.users.length;i++){         //Search for title match first
    //   if((this.users[i].title.toLowerCase()).search(value.toLowerCase()) != -1){
    //     this.displayUsers.push(this.users[i]);
    //     console.log(this.displayUsers);
    //   }
    //   else{
    //     notSelected.push(this.users[i]);
    //   }
    // }

  //   i =0;
  //   for(i ; i <notSelected.length;i++){       //Search for typeOfUser next
  //     if((notSelected[i].typeOfUser.toLowerCase()).search(value.toLowerCase()) != -1){
  //       this.displayUsers.push(notSelected[i]);
  //       console.log(this.displayUsers);
  //     }
  //     else{
  //       notSelected2.push(notSelected[i]);
  //     }
  //   }

  //   notSelected = [];
  //   i=0;
  //   for(i ; i <notSelected2.length;i++){      //Search for creator next
  //     if((notSelected2[i].creator.toLowerCase()).search(value.toLowerCase()) != -1){
  //       this.displayUsers.push(notSelected2[i]);
  //       console.log(this.displayUsers);
  //     }
  //     else{
  //       notSelected.push(notSelected2[i]);
  //     }
  //   }

  //   i=0;

  //   for(i ; i <notSelected.length;i++){         //Search for description next
  //     if((notSelected[i].description.toLowerCase()).search(value.toLowerCase()) != -1){
  //       this.displayUsers.push(notSelected[i]);
  //       console.log(this.displayUsers);
  //     }
  //   }




  //   console.log(value);

  // }

}
