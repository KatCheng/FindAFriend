import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	req: any;
	title: string = "Login";
	endpoint: string = "http://127.0.0.1:8000/api/login/";

  constructor(
  	public _router: Router,
	public _http: Http,
	public _authenticationService: AuthenticationService) { };

  ngOnInit() {
  	// This will reset the login status
  	this._authenticationService.logout();
  };

  login(event, username, password) {
	this.req = this._authenticationService.login(username, password)
		.subscribe(result => {
			if (result === true) {
				// login successful
				this._router.navigate(['']);
			} else {
				// login failed
			}
		});

	};

	signup(event) {
		event.preventDefault();
		this._router.navigate(['signup']);
	};

	ngOnDestroy(){
	}

}
