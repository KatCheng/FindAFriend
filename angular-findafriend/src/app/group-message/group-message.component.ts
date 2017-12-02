import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WebsocketService } from './websocket.service';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-group-message',
  templateUrl: './group-message.component.html',
  styleUrls: ['./group-message.component.css'],
  providers: [ WebsocketService, ChatService ]
})

export class GroupMessageComponent {
	@Input() group: any;
  	@Input() username:string;
	messages: any = [];
	showSelected: boolean;
	private message;

	
	constructor(private chatService: ChatService) {
		this.showSelected = false;
		
		chatService.messages.subscribe(msg=>{
			this.messages.push({
				sender: msg.sender,
				recipient: msg.recipient,
				messageContent: msg.message,
			});
			console.log("Websocket giving response: "+ msg.message);
		});

	}

	ngOnChanges(){
		this.showSelected = false;
		this.messages = [];
		console.log("selected another group");
	}
	
	showChat(){
    	this.showSelected = true;
		console.log("group name: " + this.group.title);
		this.messages = [];
		this.message = {
			sender: this.username,
			recipient: this.group.title,
			message: "connecting",
			isRequest: "True"
		}

		console.log('new request from client to websocket: ', this.message);
		this.chatService.messages.next(this.message);
	}

	closeChat(){
		this.showSelected=false;
	}


  	sendMsg() {
	
		if(document.forms["chatContent"]["textbox"].value != ""){
			this.message = {
	        		sender: this.username,
				recipient: this.group.title,
				message: document.forms["chatContent"]["textbox"].value,
				isRequest: "False"
			}
		}
		console.log('new message from client to websocket: ', this.message);
		this.chatService.messages.next(this.message);
		this.message.message = '';
	}


}

