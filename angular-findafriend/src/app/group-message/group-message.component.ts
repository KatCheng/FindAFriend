import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-group-message',
  templateUrl: './group-message.component.html',
  styleUrls: ['./group-message.component.css']
})

export class GroupMessageComponent implements OnInit {
	@Input() group: any;
  
  messages:any = [
  { sender: 'akshay', messageContent: 'Mr. Nice' },
  { sender: 'akshay', messageContent: 'hello' },
  { sender: 'akshay', messageContent: 'my' },
  { sender: 'akshay', messageContent: 'name' },
  { sender: 'akshay', messageContent: 'is ' },
  { sender: 'akshay', messageContent: 'akhsya' },
  
];


  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getMessages():void{
  	// let url:string;
  	// url = "/api/messages/?format=json";

   //  console.log(url);

  	// this.http.get(url).subscribe(data => {
   //    // let obj = Group: JSON.parse(data);
   //    // console.log(obj.title);
   //    this.groups = data;
   //    console.log(this.groups);
   //  })
  }

  sentMessage(){
    console.log("here");
  }


}
