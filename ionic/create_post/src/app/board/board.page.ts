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
  user: string;

  // board
  type: string;
  title : string;
  desc : string;
  author : string;
  start: string;
  end: string;
  created: string;
  attaches: any;
  id: string;
  
  // comment
  comment: string;
  comments = new Array();
  

  constructor(
    private http: HttpService,
    private dataservice: DataService,
    private storage: StorageService
  )
  { 
    this.type = this.dataservice.getType();
    this.title = this.dataservice.getTitle();
    this.desc = this.dataservice.getDesc();
    this.author = this.dataservice.getAuthor();
    this.start = this.dataservice.getStart();
    this.end = this.dataservice.getEnd();
    this.created = this.dataservice.getCreated();
    this.attaches = this.dataservice.getAttaches();
    this.id = this.dataservice.getBoardID();
  }

  async ngOnInit() {
    let res : any;
    switch(this.type){
      case 'noti':
        res = await this.http.get_comment_noti_list(this.id); break;
      case 'big':
        res = await this.http.get_comment_big_list(this.id); break;
      case 'mid':
        res = await this.http.get_comment_mid_list(this.id); break;
      case 'sml':
        res = await this.http.get_comment_sml_list(this.id); break;
    }
    this.user = await this.storage.get_uid();
    console.log(this.user);

    for(var i=0; i<res.length; ++i){
      var created = this.dateConvertorCreate(res[i]['BIGC_TIME']);
      var owner = res[i]['BIGC_AUTHOR'] == this.user;
      var tmp = {
        id: res[i]['BIGC_ID'],
        author: res[i]['BIGC_AUTHOR'],
        body: res[i]['BIGC_COMMENT'],
        created: created,
        owner: owner
      }
      this.comments.push(tmp);
    }
    console.log(this.comments);
  }

  

  async insertComment(){
    let id = this.id;
    let author = this.user;
    let context = this.comment;
    let now = new Date().toISOString();
    let created = now.substr(0, 10) + " " + now.split('T')[1].substr(0, 8);

    let res : any;
    switch(this.type){
      case 'noti':
        res = await this.http.insert_comment_noti(id, author, context, created, '0'); break;
      case 'big':
        res = await this.http.insert_comment_big(id, author, context, created, '0'); break;
      case 'mid':
        res = await this.http.insert_comment_mid(id, author, context, created, '0'); break;
      case 'sml':
        res = await this.http.insert_comment_sml(id, author, context, created, '0'); break;
    }

    if (res){
      console.log(res);
    }else{
      console.log(res);
    }
  }

  async delComment(comment: any){
    // 세민아.... 니가 해....
  }

  dateConvertor(date: string) : string{
    date = date.substr(0, 10) + " " + date.split('T')[1].substr(0, 5);
    return date;
  }
  dateConvertorCreate(date: string) : string{
    date = date.substr(0, 10) + " " + date.split('T')[1].substr(0, 8);
    return date;
  }
}
