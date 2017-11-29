import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { WebsocketService } from './websocket.service';
//import { ChatService } from './chat.service';

@Component({
  selector: 'app-group-message',
  templateUrl: './group-message.component.html',
  styleUrls: ['./group-message.component.css'],
  providers: [ WebsocketService, ChatService ]
})

export class GroupMessageComponent implements OnInit {
	@Input() group: any;
  	@Input() username:string;
 	echoMessage = '';

  	messages:any = [
  		{ sender: 'akshay', messageContent: 'Mr. Nice' },
  		{ sender: 'akshay', messageContent: 'hello' },
  		{ sender: 'akshay', messageContent: 'akhsya' },
  	];
	constructor(private chatService: ChatService) {
		chatService.messages.subscribe(msg=>{
			console.log("Websocket giving response: "+ msg);
		});
	}
	
	constructor(private http: HttpClient) { };

	private message = {
		sender: 'Yeonwoo',
		messageContent: "this is testing messages"
	}

  	sendMsg() {
		console.log('new message from client to websocket: ', this.message);
		this.chatService.messages.next(this.message);
		this.message.message = '';
	}

	ngOnInit() { };

}
