import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-group-message',
  templateUrl: './group-message.component.html',
  styleUrls: ['./group-message.component.css'],
 
})

export class GroupMessageComponent implements OnInit {
  @Input() group: any;
  @Input() username:string;
  
  messages:any = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
  	this.getMessages();
  }

  getMessages():void{



    this.http.get("/api/messages/"+this.group.title).subscribe(data => {
      this.messages = data;
      console.log(this.messages);
    });
  }

}
