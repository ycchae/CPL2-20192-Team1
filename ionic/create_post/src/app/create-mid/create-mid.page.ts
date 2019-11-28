import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { HttpService } from '../http_service_module/http.service';
import { StorageService } from '../storage_service_module/storage.service'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../services/data.service'

@Component({
  selector: 'app-create-mid',
  templateUrl: './create-mid.page.html',
  styleUrls: ['./create-mid.page.scss'],
})
export class CreateMidPage implements OnInit{
  uploadForm: FormGroup;
  attaches = new Set();

  post_bigs: Array<{}> = [];

  author: string;
  projectID: string;

  formData: FormData;
  constructor(
    private http: HttpService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private storage: StorageService,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    this.formData = new FormData();
  }

  async ngOnInit() {

    this.uploadForm = this.formBuilder.group({
      BigID: new FormControl(),
      MidTitle: new FormControl(),
      MidLevel: new FormControl(),
      MidWeight: new FormControl(),
      MidStart: new FormControl(),
      MidEnd: new FormControl(),
      MidDesc: new FormControl(),
      userFiles: new FormControl([''])
    });

    await this.storage.get_uid().then(val => {
      this.author = val;
    });
    this.projectID = this.dataService.getProjectID();
    this.http.get_task_big_list(this.projectID).subscribe(
      (res: any[])  => {
        let tmp_post_big: Array<{}> = [];
        res.forEach(function (value){
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
    
  setFiles($event) {
    console.log($event);
    let files : FileList;
    files = $event.srcElement.files;
    for(let i=0; i<files.length; ++i){
      this.attaches.add(files[i]);
    } 
  }

  create_task(){
    let start:string, end:string, created:string;
    start = this.uploadForm.get('MidStart').value;
    start = start.substr(0, 10) + " " + start.split('T')[1].substr(0, 8);
    end = this.uploadForm.get('MidEnd').value;
    end = end.substr(0, 10) + " " + end.split('T')[1].substr(0, 8);
    let now = new Date().toISOString();
    created = now.substr(0, 10) + " " + now.split('T')[1].substr(0, 8);

    let original_names = "";
    this.attaches.forEach((file : File)=>{
      this.formData.append('userFiles', file, file.name);
      original_names += file.name+"*";
    });

    this.formData.append('ProjectID', this.projectID);
    this.formData.append('BigID', this.uploadForm.get('BigID').value);
    this.formData.append('MidLevel', this.uploadForm.get('MidLevel').value);
    this.formData.append('MidTitle', this.uploadForm.get('MidTitle').value);
    this.formData.append('MidStart', start);
    this.formData.append('MidEnd', end);
    this.formData.append('MidDesc', this.uploadForm.get('MidDesc').value);    
    this.formData.append('MidStatus', '0');
    this.formData.append('MidAuthor', this.author);
    this.formData.append('MidCreated', created);
    this.formData.append('MidAttach', original_names);

    this.http.create_mid_task(this.formData).then(
      ret => {
        if (ret) {
            this.alertController.create({
              header: 'Confirm!',
              subHeader: '작업 추가 성공!',
              message: '업무리스트로 이동합니다.',
              buttons: [{
                text: '확인',
                handler: () => {
                  this.navCtrl.navigateForward('/task-list');
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
    );
  }

  customAlertPostBig: any = {
    header: '대분류',
    subHeader: '대분류를 선택하세요',
    message: '',
    translucent: true
  };

  date_validate() : boolean{
    let valid = this.uploadForm.get('MidStart').value < this.uploadForm.get('MidEnd').value;
    console.log("vaild: " +valid)

    if(valid)
      return valid;
    
    this.alertController.create({
      header: 'Reject!',
      subHeader: '종료 날짜 오류',
      message: '종료 날짜는 시작 날짜보다 이후여야 합니다',
      buttons: [{
        text: '확인'
      }]
    }).then(alert => {
      alert.present();
    });
  }
}
