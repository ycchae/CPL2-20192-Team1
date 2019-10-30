import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { HttpService } from '../http_service_module/http.service';
import { StorageService } from '../storage_service_module/storage.service' 

@Component({
  selector: 'app-create-small',
  templateUrl: './create-small.page.html',
  styleUrls: ['./create-small.page.scss'],
})
export class CreateSmallPage implements OnInit {
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response:string;

  post_bigs: Array<{}> = [];
  post_mids: Array<{}> = [];
  BigID: any;

  constructor(
    private loadingCtrl: LoadingController,
    private http: HttpService,
    private alertController : AlertController,
    private navCtrl: NavController,
    private storage:StorageService
  ) {
    storage.get_uid().then(val=>{
      this.body.SmlAuthor = val;
    });
   }

   async ngOnInit() {
    let proj_id : string;
    await this.storage.get_proj_id()
    .then(val => {
      proj_id = val;
    });

    this.http.get_task_big_list(proj_id).subscribe(
      (res: any[])  => {
        console.log(res);
        let tmp_post_big: Array<{}> = [];
        res.forEach(function (value){
          console.log(value);
          tmp_post_big.push({
            BigID: value["BIG_ID"],
            level: value["BIG_LEVEL"],
            title: value["BIG_TITLE"]
          });
        });
        this.post_bigs = tmp_post_big;
      }
    );
  }

  body = {
    MidID       :'',
    SmlTitle    :'',
    SmlStart    :'',
    SmlEnd      :'',
    SmlDesc     :'',
    SmlAttach   :new Set(),
    SmlStatus   :0,
    SmlAuthor   :'',
    SmlCreated  :''
  }

  attached : string = "";
  setFiles(val){
    this.attached += val + "\n";
    this.body.SmlAttach.add(val);
    console.log(this.body.SmlAttach);
  }

  create_task(){
    console.log(this.post_bigs);
    this.body.SmlStart = this.body.SmlStart.substr(0,10) + " " +this.body.SmlStart.split('T')[1].substr(0,8);
    this.body.SmlEnd = this.body.SmlEnd.substr(0,10) + " " +this.body.SmlEnd.split('T')[1].substr(0,8);
    this.body.SmlCreated = new Date().toISOString(); 
    this.body.SmlCreated = this.body.SmlCreated.substr(0,10) + " " +this.body.SmlCreated.split('T')[1].substr(0,8);
     console.log(this.body);
    

    let ret = this.http.create_sml_task(this.body);
    if(ret){
      this.alertController.create({
        header: 'Confirm!',
        subHeader: '작업 추가 성공!',
        message: '메인 화면으로 이동합니다.',
        buttons: [{
          text: '확인',
          handler:() =>{
            this.navCtrl.navigateForward('/main');
          }
        }]
      }).then(alert=>{
        alert.present();
      });
    }else{
      this.alertController.create({
        header: 'Reject!',
        subHeader: '작업 추가 실패',
        message: '잠시후 다시 시도해주세요.',
        buttons: [{
          text: '확인'
        }]
      }).then(alert=>{
        alert.present();
      });
    }
  }

  getMidList(){
    console.log(this.BigID);
    this.http.get_task_mid_list(this.BigID).subscribe(
      (res: any[])  => {
        console.log(res);
        let tmp_post_mid: Array<{}> = [];
        res.forEach(function (value){
          console.log(value);
          tmp_post_mid.push({
            MidID: value["MID_ID"],
            level: value["MID_LEVEL"],
            title: value["MID_TITLE"]
          });
        });
        this.post_mids = tmp_post_mid;
      }
    );
  }
  

  customAlertPostBig: any = {
    header: '대분류',
    subHeader: '대분류를 선택하세요',
    message: '',
    translucent: true
  };

  customAlertPostMiddle: any = {
    header: '중분류',
    subHeader: '중분류를 선택하세요',
    message: '',
    translucent: true
  };


}
