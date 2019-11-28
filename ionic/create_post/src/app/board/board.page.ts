import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http_service_module/http.service';
import { StorageService } from '../storage_service_module/storage.service'
import { DataService } from '../services/data.service'

@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
})
export class BoardPage implements OnInit {
  // board
  title : string;
  desc : string;
  author : string;
  start: string;
  end: string;
  created: string;
  attaches: any;
  
  // comment
  comment: string;

  constructor(
    private http: HttpService,
    private dataservice: DataService
  )
  { 
    this.title = this.dataservice.getTitle();
    this.desc = this.dataservice.getDesc();
    this.author = this.dataservice.getAuthor();
    this.start = this.dataservice.getStart();
    this.end = this.dataservice.getEnd();
    this.created = this.dataservice.getCreated();
    this.attaches = this.dataservice.getAttaches()
  }

  ngOnInit() {
    
  }

}
