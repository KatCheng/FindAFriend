import { Component, OnInit, Input } from '@angular/core';
import {User} from '../user';
import {USERS} from '../list-of-users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { contentHeaders } from '../headers';

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
  email : string = "None";
  // selectedUser:any;

  first_name: string = "None";
  last_name: string = "None";
  university: string = "None";
  hometown: string = "None";
  num: number;
  picture: string;

  yes: number = 0;
  //req: any;

  constructor(private http: HttpClient, public _http: Http) { }

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

  updateProfile(event, first_name, last_name, hometown, university, picture) {
    console.log(this.userProfile.url.substring(this.userProfile.url.length-14, this.userProfile.url.length-13))
    if(first_name == '') {
      first_name = "none";
    }
    if(last_name == '') {
      last_name = "none";
    }
    if(hometown == '') {
      hometown = "none";
    }
    if(university == '') {
      university = "none";
    }
    this.http.get("api/updateProfile/"+this.userProfile.url.substring(this.userProfile.url.length-14, this.userProfile.url.length-13)+"/"+ first_name+"/"+last_name+"/"+hometown+"/"+university+"/"+picture).subscribe();
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
        if(this.userProfile.email == '') {
          this.userProfile.email = this.email;
        } 
        this.num = this.userProfile.profile[this.userProfile.profile.length-1].picture;
        switch (this.num) {
          case 0:
            this.picture = "myAvatar.png";
            break;
          case 1:
            this.picture = "myAvatar(1).png";
            break;
          case 2:
            this.picture = "myAvatar(2).png";
            break;
          case 3:
            this.picture = "myAvatar(3).png";
            break;
          case 4:
            this.picture = "myAvatar(4).png";
            break;
          case 5:
            this.picture = "myAvatar(5).png";
            break;
          default:
            this.picture = "myAvatar.png"

        }
        // else {
        //   this.email = this.userProfile.email;
        // }

        this.university = this.userProfile.profile[this.userProfile.profile.length-1].university;

        if(this.userProfile.profile[this.userProfile.profile.length-1].first_name == '') {
          this.userProfile.profile[this.userProfile.profile.length-1].first_name = this.first_name;
        };
        // if(this.userProfile.profile[0].last_name != '') {
        //   this.last_name = this.userProfile.profile[1].last_name;
        // }
        if(this.userProfile.profile[this.userProfile.profile.length-1].university == '') {
          this.userProfile.profile[this.userProfile.profile.length-1].university = this.university;
        };
        if(this.userProfile.profile[this.userProfile.profile.length-1].hometown == '') {
          this.userProfile.profile[this.userProfile.profile.length-1].university = this.hometown;
        };
        // this.something = this.userProfile.url;
        // console.log(this.something);
      }
    }
  }

  update(event, user, first_name, last_name, hometown, university, picture) {
    event.preventDefault();
    //user = this.username;
    //username = this.username;
    user = this.userProfile.url;
    user = user.substring(11, user.length-13);
    console.log(user);
    console.log(first_name);
    console.log(last_name);
    console.log(hometown);
    console.log(university);
    console.log(picture);
    let body = JSON.stringify({ user, first_name, last_name, university, hometown, picture});
    this._http.post("http://127.0.0.1:8000/api/profiles/", body, { headers: contentHeaders})
        .subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log("Error occured");
          }
        );
    // const req = this._http.post("http://127.0.0.1:8000/api/profiles/", {
    //   user: this.userProfile,
    //   first_name: first_name,
    //   last_name: last_name,
    //   university: university,
    //   hometown: hometown,
    //   picture: picture
    // }, { headers: contentHeaders})
    //   .subscribe(
    //     res => {
    //       console.log(res);
    //     },
    //     err => {
    //       console.log("Error occured");
    //     }
    //   );
      // .subscribe(
      //   response => {
      //     //const response = res.text();
      //   }
      // );
  };

  // deleteUser(){
  //   this.http.get("api/deleteUser/"+this.group.username).subscribe();
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, 100);
  // }


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
