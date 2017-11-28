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
    this._authenticationService.logout();
    this._router.navigate(['login']);
  }

}
