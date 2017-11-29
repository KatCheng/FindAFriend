import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	public loading = false;
  public _router: Router;
  public _authenticationService: AuthenticationService;
	username: string;
  usersView:boolean = null;
  groupsView:boolean = null;

  su: number = 0;

  constructor() { }

  ngOnInit() {
  	let cUser = JSON.parse(localStorage.getItem('cUser'));
	   if (cUser) {
	     this.username = cUser['username'];
	   } else {
		  this.username = null;
	   }  
  }

  ngOnDestroy() {	}

  logout() {
    console.log("heresdsd");
    this._authenticationService.logout();
    // this._router.navigate(['logout']);
  }

  // signup(event) {
  //   this._router.navigate(['signup']);
  // };


  showGroups(){
    this.usersView=null;
    this.groupsView=true;
  }

  showUsers(){
    this.usersView=true;
    this.groupsView=null;
  }

}
