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
	
  	messages:any = [
  		{ sender: 'akshay', messageContent: 'Mr. Nice' },
  		{ sender: 'akshay', messageContent: 'hello' },
  		{ sender: 'akshay', messageContent: 'akhsya' },
  	];
	constructor(private chatService: ChatService) {
		chatService.messages.subscribe(msg=>{
			document.getElementById("#chatmsg")[0].innerHTML = msg; 
			console.log("Websocket giving response: "+ msg);
		});
	}

	private message = {
		sender: this.username,
		recipient: this.group,
		message: "nope"
	
	}
  	sendMsg() {
	
		if(document.forms["chatContent"]["textbox"].value != ""){
			this.message = {
	        		sender: this.username,
				recipient: this.group.title,
				message: document.forms["chatContent"]["textbox"].value
			}
		}
		console.log('new message from client to websocket: ', this.message);
		this.chatService.messages.next(this.message);
		this.message.message = '';
	}

}
