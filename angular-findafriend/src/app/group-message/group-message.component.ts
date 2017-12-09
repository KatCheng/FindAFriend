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

	// Using ChatService to retrieve chat message form server	
	constructor(private chatService: ChatService) {
		this.showSelected = false;
		
		chatService.messages.subscribe(msg=>{
			this.messages.push({
				sender: msg.sender,
				recipient: msg.recipient,
				messageContent: msg.message,
			});
			// Websocket is giving response with the message of msg
		});

	}

	// Scroll goes down when typing new chats
	updateScroll(){
		var e = document.getElementById("historyBox");
		e.scrollTop = e.scrollHeight;
	}

	// Detect change of the different group selection
	ngOnChanges(){
		this.showSelected = false;
		this.messages = [];
	}
	
	// openChat button is clicked.
	// Chat is opened and shows the chat history
	showChat(){
	// First message = requesting for the connection is sent
    	this.showSelected = true;
		this.messages = [];
		this.message = {
			sender: this.username,
			recipient: this.group.title,
			message: "connecting",
			isRequest: "True"
		}
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
		// Client is sending new message to websocket
		this.chatService.messages.next(this.message);
		this.message.message = '';
		document.forms["chatContent"]["textbox"].value = "";
		this.updateScroll();
	}


}

