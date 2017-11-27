import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-group-message',
  templateUrl: './group-message.component.html',
  styleUrls: ['./group-message.component.css']
})
export class GroupMessageComponent implements OnInit {
	@Input() group: any;

  constructor() { }

  ngOnInit() {
  }

}
