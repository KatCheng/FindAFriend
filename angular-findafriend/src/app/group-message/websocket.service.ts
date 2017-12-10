import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Injectable()
export class WebsocketService {
  constructor() { }

  // websocket using subject from rxjs
  private socket: Rx.Subject<MessageEvent>;

  // url will be assigned from chat service
  public connect(url): Rx.Subject<MessageEvent> {
    if (!this.socket) {
      this.socket = this.create(url);
    return this.socket;
  }
}

  // websocket defined; connects each websocket functions with observer
  private create(url): Rx.Subject<MessageEvent> {
    let ws = new WebSocket(url);
    // "event listener"
    let observable = Rx.Observable.create(
	(obs: Rx.Observer<MessageEvent>) => {
		ws.onmessage = obs.next.bind(obs);
		ws.onerror = obs.error.bind(obs);
		ws.onclose = obs.complete.bind(obs);
		return ws.close.bind(ws);
	})

    // "event handler"
    let observer = {
		next: (data: Object) => {
			if (ws.readyState === WebSocket.OPEN) {
				ws.send(JSON.stringify(data));
			}
		}
	}
	return Rx.Subject.create(observer, observable);
  }

}
