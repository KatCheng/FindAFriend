import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AuthHttp } from 'angular2-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	public loading = false;
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

}
