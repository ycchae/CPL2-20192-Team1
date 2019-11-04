import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http_service_module/http.service'
import { StorageService } from '../storage_service_module/storage.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  projects: Array<{}> = [];

  constructor(
    private httpService : HttpService,
    private storage : StorageService,
    private navCtrl : NavController
  ) { }

  async ngOnInit() {
    let user_id : string;
    await this.storage.get_uid()
    .then(val => {
      user_id = val;
    });

    this.httpService.get_project_list(user_id).subscribe(
      (res: any[])  => {
        console.log(res);
        let tmp_projects: Array<{}> = [];
        res.forEach(function (value){
          console.log(value);
          tmp_projects.push({
            id: value["PROJ_ID"],
            name: value["PROJ_NAME"],
            progress: value["PROJ_PROGRESS"],
            start: value["PROJ_START"],
            end: value["PROJ_END"],
            desc: value["PROJ_DESC"],
            mgr_id: value["PROJ_MGR_UID"]
          });
        });
        this.projects = tmp_projects;
      }
    );
  }

  project_click(project){
    this.storage.save_proj_id(project.id);
    this.storage.save_mgr_id(project.mgr_id);
    this.navCtrl.navigateForward("/task-list");
  }
  goGenerateProject(){
    this.navCtrl.navigateForward("/generate-project");
  }

}
