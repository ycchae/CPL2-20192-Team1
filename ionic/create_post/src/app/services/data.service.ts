import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private project_id : string;
  private manager_id : string;
  private project_name : string;
  private attend_link : string;
  constructor() { }

  setAttendLink(link){
    this.attend_link = link;
  }
  getLink(){
    return this.attend_link;
  }

  setProjectID(project_id){
    this.project_id = project_id;
  }
  getProjectID(){
    return this.project_id;
  }

  setManagerID(manager_id){
    this.manager_id = manager_id;
  }
  getManagerID(){
    return this.manager_id;
  }

  setProjectName(project_name){
    this.project_name = project_name;
  }
  getProjectName(){
    return this.project_name;
  }
}
