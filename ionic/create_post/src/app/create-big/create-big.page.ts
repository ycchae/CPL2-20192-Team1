import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { HttpService } from '../http_service_module/http.service';
import { StorageService } from '../storage_service_module/storage.service'
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../services/data.service'
@Component({
  selector: 'app-create-big',
  templateUrl: './create-big.page.html',
  styleUrls: ['./create-big.page.scss'],
})

export class CreateBigPage implements OnInit{
  uploadForm: FormGroup;
  attaches = new Set();
  attaches_name = new Set();

  author: string;
  projectID: string;

  formData : FormData;
  constructor(
    private http: HttpService,
    private alertController: AlertController,
    private navCtrl: NavController,
    private storage: StorageService,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    storage.get_uid().then(val => {
      this.author = val;
    });
    this.projectID = this.dataService.getProjectID();
    
    this.formData = new FormData();
  }

  ngOnInit(){
    this.uploadForm = this.formBuilder.group({
      BigTitle: new FormControl(),
      BigLevel: new FormControl(),
      BigStart: new FormControl(),
      BigEnd: new FormControl(),
      BigWeight: new FormControl(),
      BigDesc: new FormControl(),
      userFiles: new FormControl([''])
    });
  }

  setFiles($event) {
    console.log($event);
    let files : FileList;
    files = $event.srcElement.files;
    for(let i=0; i<files.length; ++i){
      this.attaches.add(files[i]);
    } 
  }

  create_task() {    
    let start:string, end:string, created:string;
    start = this.uploadForm.get('BigStart').value;
    start = start.substr(0, 10) + " " + start.split('T')[1].substr(0, 8);
    end = this.uploadForm.get('BigEnd').value;
    end = end.substr(0, 10) + " " + end.split('T')[1].substr(0, 8);
    let now = new Date().toISOString();
    created = now.substr(0, 10) + " " + now.split('T')[1].substr(0, 8);

    let original_names = "";
    this.attaches.forEach((file : File)=>{
      this.formData.append('userFiles', file, file.name);
      original_names += file.name+"*";
    });

    this.formData.append('ProjectID', this.projectID);
    this.formData.append('BigAuthor', this.author);
    this.formData.append('BigStatus', '0');
    this.formData.append('BigProgress', '0');
    this.formData.append('BigTitle', this.uploadForm.get('BigTitle').value);
    this.formData.append('BigLevel', this.uploadForm.get('BigLevel').value);
    this.formData.append('BigStart', start);
    this.formData.append('BigEnd', end);
    this.formData.append('BigWeight', this.uploadForm.get('BigWeight').value);
    this.formData.append('BigDesc', this.uploadForm.get('BigDesc').value);
    this.formData.append('BigCreated', created);
    this.formData.append('BigAttach', original_names);
    
    this.http.create_big_task(this.formData).then(
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

  date_validate() : boolean{
    let valid = this.uploadForm.get('BigStart').value < this.uploadForm.get('BigEnd').value;
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
