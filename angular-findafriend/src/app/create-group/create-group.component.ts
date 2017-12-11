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

	createGroup(event, title, typeOfGroup, description) {

    event.preventDefault();
    let creator = this.username;

    if(description.length<1){
        description = "None";
    }

    let body = JSON.stringify({ title, creator, description, typeOfGroup });

    this.req = this._http.post(this.endpoint, body, { headers: contentHeaders})
		.subscribe();
		this.blankOut();
	};

	blankOut(){
		var inputs = document.getElementsByTagName('input');
		for (var i = 0; i<inputs.length; i++) {
            inputs[i].value = '';
   		}
	}

	ngOnInit() {

	}

}
