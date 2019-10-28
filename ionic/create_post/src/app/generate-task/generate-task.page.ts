import { Component } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
// import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
// import { FileUploader } from 'ng2-file-upload';


const URL = 'http://54.180.89.77:9000/file/'
@Component({
  selector: 'app-generate-task',
  templateUrl: './generate-task.page.html',
  styleUrls: ['./generate-task.page.scss'],
})
export class GenerateTaskPage {
  // uploader:FileUploader;
  hasBaseDropZoneOver: boolean;
  hasAnotherDropZoneOver: boolean;
  response:string;

  constructor(
    // private transfer: FileTransfer,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
    ) { }


  // uploadHandler(){
  //   this.fileTransfer = this.transfer.create();
  //   let options: FileUploadOptions = {
  //     fileKey: 'file',
  //     chunkedMode: false,
  //     fileName: "Downloadimage.png",

  //   }
  //   this.fileTransfer.upload('SOURCE_FILE_PATH', 'API_ENDPOINT', options, true).then((res) => {
  //     console.log("file uploaded successfully.", res)
  //    // this. = true;
  //   }).catch((error) => {
  //     //here logging an error. 
  //     console.log('upload failed: ' + JSON.stringify(error));
  //   })
  // }
  
  
  
  post_bigs: any[] = [
    {
      id: 1,
      first: 'Alice',
      last: 'Smith',
    },
    {
      id: 2,
      first: 'Bob',
      last: 'Davis',
    },
    {
      id: 3,
      first: 'Charlie',
      last: 'Rosenburg',
    }
  ];


  post_middles: any[] = [
    {
      id: 1,
      first: '채',
      last: '윤창',
    },
    {
      id: 2,
      first: '오',
      last: '세민',
    },
    {
      id: 3,
      first: '박',
      last: '주한',
    }
  ];

  
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
