import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http_service_module/http.service'
import { StorageService } from '../storage_service_module/storage.service'
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { DataService } from '../services/data.service'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
  isPM: boolean;
  project_id: string;
  project_name: string;

  notiIsOpen: boolean;
  notis: Array<{}> = [];

  taskIsOpen: boolean;
  tasks: Array<{}> = [];

  public bigIsOpen: Array<Map<string, boolean>> = [];
  public midIsOpen: Array<Map<string, boolean>> = [];

  constructor(
    private http: HttpService,
    private storage: StorageService,
    private navCtrl : NavController,
    private alertCtrl: AlertController,
    private dataService : DataService
  ) {

  }

  async ngOnInit() {
    await this.storage.get_proj_id().then(
      val => {
        this.project_id = val;
      },
      error=>{
        console.log(error);
      }
    );
    // this.project_id = '6';

    this.http.get_proj_name(this.project_id).then(
      res => {
        this.project_name = res["PROJ_NAME"];
      },
      error=>{
        console.log(error);
      }
    );
    this.isPM = false;
    await this.storage.get_uid().then(
      async uid => {
        await this.storage.get_mgr_id().then(
          mgr => {
            this.isPM = uid === mgr;
          },
          error=>{
            console.log(error);
          }
        );
      },
      error=>{
        console.log(error);
      }
    );

    await this.http.get_noti_list(this.project_id).then(
      (res: any[]) => {
        console.log(res);
        let tmp: Array<{}> = [];
        res.forEach(function (val, idx, arr) {
          tmp.push({
            id: val["NOTI_ID"],
            title: val["NOTI_TITLE"],
          });
        });
        this.notis = tmp;
      },
      error=>{
        console.log(error);
      }
    );



    await this.http.get_task_big_listp(this.project_id).then(
      (res: any[]) => {
        let tmp: Array<{}> = [];
        res.forEach(function (val, idx, arr) {
          tmp.push({
            id: val["BIG_ID"],
            title: val["BIG_TITLE"],
            mids: []
          });
        });
        this.tasks = tmp;
      },
      error=>{
        console.log(error);
      });

    for (let i = 0; i < this.tasks.length; ++i) {
      await this.http.get_task_mid_listp(this.tasks[i]["id"]).then(
        (res: any[]) => {
          let tmp: Array<{}> = [];
          res.forEach(function (val, idx, arr) {
            tmp.push({
              id: val["MID_ID"],
              title: val["MID_TITLE"],
              smls: []
            });
          });
          this.tasks[i]["mids"] = tmp;
        },
        error=>{
          console.log(error);
        });

      this.bigIsOpen.push(new Map<string, boolean>().set(this.tasks[i]["id"], false));

      for (let j = 0; j < this.tasks[i]["mids"].length; ++j) {
        await this.http.get_task_sml_listp(this.tasks[i]["mids"][j]["id"]).then(
          (res: any[]) => {
            let tmp: Array<{}> = [];
            res.forEach(function (val, idx, arr) {
              tmp.push({
                id: val["SML_ID"],
                title: val["SML_TITLE"],
                smls: []
              });
            });
            this.tasks[i]["mids"][j]["smls"] = tmp;
          },
          error=>{
            console.log(error);
          });

        this.midIsOpen.push(new Map<string, boolean>().set(this.tasks[i]["mids"][j]["id"], false));
      }
    }

    this.notiIsOpen = false;
    this.taskIsOpen = false;
  }

  toggle(argu: boolean) {
    console.log(argu);
    return argu ? false : true;
  }
  go_board(arg) {
    console.log(arg);
  }

  go_create_big(){
    this.navCtrl.navigateForward('/create-big');
  }
  go_create_mid(){
    this.navCtrl.navigateForward('/create-mid');
  }
  go_create_sml(){
    this.navCtrl.navigateForward('/create-small');
  }
  clipboard_copy(val : string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }
  attend_dialog(){
    let base_url = "54.180.89.180:9010/attend-project/"
    base_url += this.dataService.getLink();
    this.clipboard_copy(base_url);
    this.alertCtrl.create({
      header: '프로젝트 참가 링크',
      subHeader: '클립보드에 복사 되었습니다.',
      message: base_url, 
      buttons: [{
        text: '확인',
        handler:() => {

        }
      }]
    }).then(alert=>{
      alert.present();
    })
  }
  update_status(status: string){
    console.log("update_status");
    this.http.update_project_state(this.project_id,status).then(res=>{});
  }
}
