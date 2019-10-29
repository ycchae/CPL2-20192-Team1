import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { HttpService } from '../http_service_module/http.service';
import { StorageService } from '../storage_service_module/storage.service' 
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
// import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-create-big',
  templateUrl: './create-big.page.html',
  styleUrls: ['./create-big.page.scss'],
})

export class CreateBigPage {
  // uploader:FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response:string;

  mgr_id : string;

  constructor(
    // private transfer: FileTransfer,
    private loadingCtrl: LoadingController,
    private http: HttpService,
    private alertController : AlertController,
    private navCtrl: NavController,
    private storage:StorageService
  ){
    storage.get_uid().then(val=>{
      this.body.BigAuthor = val;
    });
    storage.get_proj_id().then(val=>{
      this.body.projectID = val;
    });
    storage.get_mgr_id().then(val=>{
       this.mgr_id = val;
    });
  }
  
  body = {
    projectID   : '',
    BigLevel    : '',
    BigTitle    : '',
    BigStart    : '',
    BigEnd      : '',
    BigDesc     : '',
    BigAttach   : new Set(),
    BigStatus   : 0,
    BigAuthor   : '',
    BigCreated  : '',
    BigWeight   : '',
    BigProgress : 0
  }

  attached : string = "";
  setFiles(val){
    this.attached += val + "\n";
    this.body.BigAttach.add(val);
    console.log(this.body.BigAttach);
  }
  create_task(){

    // this.body.BigStart = this.body.BigStart.substr(0,10) + " " +this.body.BigStart.split('T')[1].substr(0,8);
    // this.body.BigEnd = this.body.BigEnd.substr(0,10) + " " +this.body.BigEnd.split('T')[1].substr(0,8);
    // this.body.BigCreated = new Date().toISOString(); 
    // this.body.BigCreated = this.body.BigCreated.substr(0,10) + " " +this.body.BigCreated.split('T')[1].substr(0,8);
    console.log(this.body);

    /*let ret = this.http.generate_task(this.task);
    if(ret){
      this.alertController.create({
        header: 'Confirm!',
        subHeader: '작업 추가 성공!',
        message: '메인 화면으로 이동합니다.',
        buttons: [{
          text: '확인',
          handler:() =>{
            this.navCtrl.navigateForward('/generate-task');
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
    }*/
  }

}