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
	descriptionError: [any];
	typeOfGroupError: [any];


	constructor(public _router: Router, public _http: Http) { }

	createGroup(event, title, typeOfGroup, description) {

    event.preventDefault();
    let creator = this.username;

    let body = JSON.stringify({ title, creator, description, typeOfGroup });

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
		this.blankOut();
	};

	blankOut(){
		var inputs = document.getElementsByTagName('input');
		for (var i = 0; i<inputs.length; i++) {
            inputs[i].value = '';
   		}
	}

	ngOnInit() {
	  //this._authenticationService.login(username,password);
	}

}
