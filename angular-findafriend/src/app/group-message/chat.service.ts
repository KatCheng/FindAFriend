import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';

// Connecting to django serverside
const CHAT_URL = 'ws://localhost:8000/chat';

// Give JSON file template
export interface Message {
	sender: string,
	recipient: string,
	message: string,
	isRequest: string,
}

// Will be used in group-message.component.ts
@Injectable()
export class ChatService {

	public messages: Subject<Message>;

	// Connect to the server, parse JSON file, return content
	constructor(wsService: WebsocketService) {
		this.messages = <Subject<Message>>wsService
			.connect(CHAT_URL)
			.map((response: MessageEvent): Message => {
				let data = JSON.parse(response.data);
				return {
					sender: data.sender,
					recipient: data.recipient,
					message: data.message,
					isRequest: data.isRequest,
				}
			});
	}
}
