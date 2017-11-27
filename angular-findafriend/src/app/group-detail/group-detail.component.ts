import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
})
export class GroupDetailComponent implements OnInit {
	@Input() group: any;
  constructor() { }

  ngOnInit() {
  }

}
