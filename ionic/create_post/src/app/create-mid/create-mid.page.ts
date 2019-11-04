import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { HttpService } from '../http_service_module/http.service';
import { StorageService } from '../storage_service_module/storage.service' 

@Component({
  selector: 'app-create-mid',
  templateUrl: './create-mid.page.html',
  styleUrls: ['./create-mid.page.scss'],
})
export class CreateMidPage implements OnInit{
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response:string;

  post_bigs: Array<{}> = [];

   constructor(
    private loadingCtrl: LoadingController,
    private http: HttpService,
    private alertController : AlertController,
    private navCtrl: NavController,
    private storage:StorageService
  ) { 
    storage.get_uid().then(val=>{
      this.body.MidAuthor = val;
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
    BigID       :'',
    MidLevel    :'',
    MidTitle    :'',
    MidStart    :'',
    MidEnd      :'',
    MidDesc     :'',
    MidAttach   :new Set(),
    MidStatus   :0,
    MidAuthor   :'',
    MidCreated  :''
  }

    
  attached : string = "";
  setFiles(val){
    this.attached += val + "\n";
    this.body.MidAttach.add(val);
    console.log(this.body.MidAttach);
  }
  create_task(){
    console.log(this.post_bigs);
    this.body.MidStart = this.body.MidStart.substr(0,10) + " " +this.body.MidStart.split('T')[1].substr(0,8);
    this.body.MidEnd = this.body.MidEnd.substr(0,10) + " " +this.body.MidEnd.split('T')[1].substr(0,8);
    this.body.MidCreated = new Date().toISOString(); 
    this.body.MidCreated = this.body.MidCreated.substr(0,10) + " " +this.body.MidCreated.split('T')[1].substr(0,8);
     console.log(this.body);
    

    let ret = this.http.create_mid_task(this.body);
    if(ret){
      this.alertController.create({
        header: 'Confirm!',
        subHeader: '작업 추가 성공!',
        message: '업무리스트로 이동합니다.',
        buttons: [{
          text: '확인',
          handler:() =>{
            this.navCtrl.navigateForward('/task-list');
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

 
  

  customAlertPostBig: any = {
    header: '대분류',
    subHeader: '대분류를 선택하세요',
    message: '',
    translucent: true
  };
}
