import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { contentHeaders } from '../headers';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  @Input() username:string;
  req: any;
	title: string = "Create Group";
	endpoint: string = "http://127.0.0.1:8000/api/pageCreate/";

	constructor(public _router: Router, public _http: Http) { }

	createGroup(event, title, sizeOfGroup, typeOfGroup, description) {

    event.preventDefault();
    let username = this.username;
    let timeCreated = '2015-10-01T00:00';
    let body = JSON.stringify({ title, username, sizeOfGroup, description, timeCreated, typeOfGroup });

    this.req = this._http.post(this.endpoint, body, { headers: contentHeaders})
		.subscribe(
			response => {
				this._router.navigate(['/']);
			});

	};

  ngOnInit() {
    //this._authenticationService.login(username,password);
  }

}
