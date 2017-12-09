import { Component, OnInit, Input } from '@angular/core';
import {User} from '../user';
import {USERS} from '../list-of-users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http } from '@angular/http';
import { contentHeaders } from '../headers';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public _router: Router;
  public _authenticationService: AuthenticationService;
  username: string;
  usersView:boolean = true;
  groupsView:boolean = null;
  creategroupsView: boolean = null;

  users :any = [];
  userProfile: any = [];
  num: number;
  picture: string;
  yes: number = 0;

  constructor(private http: HttpClient, public _http: Http) { }

  ngOnInit() {
    let cUser = JSON.parse(localStorage.getItem('cUser'));
    if (cUser) {
      this.username = cUser['username'];
    } else {
      this.username = null;
    }
    this.getUser();
  }

  ngOnDestroy() { }

  logout() {
    this._authenticationService.logout();
  }

  showGroups(){
    this.usersView=null;
    this.groupsView=true;
    this.creategroupsView=null;
  }

  showUsers(){
    this.usersView=true;
    this.groupsView=null;
    this.creategroupsView=null;
  }

  createGroups(){
    this.usersView=null;
    this.groupsView=null;
    this.creategroupsView=true;
  }

  alert(msg?: string)      { window.alert(msg); }
  canSave=true;

  /* GET GROUPS FROM BACKEND */
  getUser():void{

    let url :string;
    url = "/api/users/?format=json";

    this.http.get(url).subscribe(data => {
      this.users = data;
      this.putUsers();
    })

  }

  updateProfile(event, first_name, last_name, hometown, university, picture) {
    if(first_name == '') {
      first_name = "None";
    }
    if(last_name == '') {
      last_name = "None";
    }
    if(hometown == '') {
      hometown = "None";
    }
    if(university == '') {
      university = "None";
    }

    switch (this.num) {
      case 0:
        this.picture = "myAvatar(0).png";
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

    this.userProfile.profile[this.userProfile.profile.length-1].first_name = first_name;
    this.userProfile.profile[this.userProfile.profile.length-1].last_name = last_name;
    this.userProfile.profile[this.userProfile.profile.length-1].university = university;
    this.userProfile.profile[this.userProfile.profile.length-1].hometown = hometown;

    this.http.get("api/updateProfile/"+this.userProfile.url.substring(this.userProfile.url.length-14, this.userProfile.url.length-13)+"/"+ first_name+"/"+last_name+"/"+hometown+"/"+university+"/"+this.num).subscribe();
  }

  deleteUser(){
    this.http.get("api/deleteUser/"+this.username).subscribe();
  }


  putUsers(): void {
    var i:number = 0;

    for(i ; i <this.users.length;i++){         //Search for title match first
      if((this.users[i].username.toLowerCase()).search(this.username.toLowerCase()) != -1){
        this.userProfile = this.users[i];
        if(this.userProfile.email == '') {
          this.userProfile.email = "None";
        }
        this.num = this.userProfile.profile[this.userProfile.profile.length-1].picture;

        switch (this.num) {
          case 0:
            this.picture = "myAvatar(0).png";
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

        };

        if(this.userProfile.profile[this.userProfile.profile.length-1].first_name.split(' ').join('') == '') {
          this.userProfile.profile[this.userProfile.profile.length-1].first_name = "None";
        };

        if(this.userProfile.profile[this.userProfile.profile.length-1].last_name.split(' ').join('') == '') {
          this.userProfile.profile[this.userProfile.profile.length-1].last_name = "None";
        };

        if(this.userProfile.profile[this.userProfile.profile.length-1].university.split(' ').join('') == '') {
          this.userProfile.profile[this.userProfile.profile.length-1].university = "None";
        };

        if(this.userProfile.profile[this.userProfile.profile.length-1].hometown.split(' ').join('') == '') {
          this.userProfile.profile[this.userProfile.profile.length-1].hometown = "None";
        };

      }
    }
  }
}