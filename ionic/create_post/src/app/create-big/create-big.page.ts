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
  response: string;


  constructor(
    // private transfer: FileTransfer,
    // private loadingCtrl: LoadingController,
    private http: HttpService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private storage: StorageService
  ) {
    storage.get_uid().then(val => {
      this.body.BigAuthor = val;
    });
    storage.get_proj_id().then(val => {
      this.body.projectID = val;
    });

  }
  attaches = new Set();

  body = {
    projectID: '',
    BigLevel: '',
    BigTitle: '',
    BigStart: '',
    BigEnd: '',
    BigDesc: '',
    BigAttach: '',
    BigStatus: 0,
    BigAuthor: '',
    BigCreated: '',
    BigWeight: '',
    BigProgress: 0
  }

  setFiles(val) {
    this.attaches.add(val);
    console.log(this.attaches);
  }
  create_task() {

    const setValues = Array.from(this.attaches.values());;
    let a = "{";
    for (let i=0; i<setValues.length; ++i) {
      a += `${i}: "${setValues[i]}", `;
    }
    a = a.slice(0, -2);
    a += '}';
    this.body.BigAttach = a;

    this.body.BigStart = this.body.BigStart.substr(0, 10) + " " + this.body.BigStart.split('T')[1].substr(0, 8);
    this.body.BigEnd = this.body.BigEnd.substr(0, 10) + " " + this.body.BigEnd.split('T')[1].substr(0, 8);
    this.body.BigCreated = new Date().toISOString();
    this.body.BigCreated = this.body.BigCreated.substr(0, 10) + " " + this.body.BigCreated.split('T')[1].substr(0, 8);
    console.log(this.body);

    let ret = this.http.create_big_task(this.body);
    if (ret) {
      this.alertController.create({
        header: 'Confirm!',
        subHeader: '작업 추가 성공!',
        message: '메인 화면으로 이동합니다.',
        buttons: [{
          text: '확인',
          handler: () => {
            this.navCtrl.navigateForward('/main');
          }
        }]
      }).then(alert => {
        alert.present();
      });
    } else {
      this.alertController.create({
        header: 'Reject!',
        subHeader: '작업 추가 실패',
        message: '잠시후 다시 시도해주세요.',
        buttons: [{
          text: '확인'
        }]
      }).then(alert => {
        alert.present();
      });
    }
  }

}
