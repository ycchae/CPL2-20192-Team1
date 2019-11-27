import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {
  title : string;
  desc : string;
  author : string;
  start: string;
  end: string;
  created: string;
  attach: string;
  attaches: any;
  constructor(

  )
  { this.title = "title";
    this.desc = "body";
    this.author = "author";
    this.start = "a";
    this.end = "b";
    this.created = "c";
    
    this.attach = "abc*def*ghr";
    this.attaches = this.attach.split("*");
  }

  ngOnInit() {
  }

}
