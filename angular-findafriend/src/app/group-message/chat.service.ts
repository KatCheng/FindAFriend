import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { WebsocketService } from './websocket.service';

const CHAT_URL = 'ws://localhost:8000/chat';

export interface Message {
	sender: string,
	recipient: string,
	message: string
}

@Injectable()
export class ChatService {

	public messages: Subject<Message>;

	constructor(wsService: WebsocketService) {
		this.messages = <Subject<Message>>wsService
			.connect(CHAT_URL)
			.map((response: MessageEvent): Message => {
				let data = JSON.parse(response.data);
				return {
					sender: data.sender,
					recipient: data.recipient,
					message: data.message
				}
			});
	}
}
