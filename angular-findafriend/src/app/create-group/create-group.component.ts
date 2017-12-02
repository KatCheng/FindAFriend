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
	titleError: [any];
//	creatorError: [any];
	sizeOfGroupError: [any];
	descriptionError: [any];
	typeOfGroupError: [any];


	constructor(public _router: Router, public _http: Http) { }

	createGroup(event, title, sizeOfGroup, typeOfGroup, description) {

    event.preventDefault();
    let creator = this.username;
    // For test purpose only
    //let body2 = '{ "title": "test_group_6", "creator": "test", "sizeOfGroup": "Under 5", "description": "123", "typeOfGroup": "Sport" }';


    let body = JSON.stringify({ title, creator, sizeOfGroup, description, typeOfGroup });

    //let body3 = '{ "title": "test_group_desparate_0", "creator": "test", "sizeOfGroup": "Under 5", "description": "' + body + '", "typeOfGroup": "Sport" }';

    console.log("test");

    let test = "http://127.0.0.1:8080";

    this.req = this._http.post(this.endpoint, body, { headers: contentHeaders})
		.subscribe(
			response => {
				this._router.navigate(['/']);
			},
			error => {
				let createGroupError = error.json();

				if (createGroupError.title) {
					this.titleError = createGroupError.title;
				} else {
					this.titleError = null;
				}

//				if (createGroupError.creator) {
//					this.creatorError = createGroupError.creator;
//				} else {
//					this.creatorError = null;
//				}

				if (createGroupError.sizeOfGroup) {
					this.sizeOfGroupError = createGroupError.sizeOfGroup;
				} else {
					this.sizeOfGroupError = null;
				}

				if (createGroupError.description) {
					this.descriptionError = createGroupError.description;
				} else {
					this.descriptionError = null;
				}

				if (createGroupError.typeOfGroup) {
					this.typeOfGroupError = createGroupError.typeOfGroup;
				} else {
					this.typeOfGroupError = null;
				}

			}
    );

	};

  ngOnInit() {
    //this._authenticationService.login(username,password);
  }

}
