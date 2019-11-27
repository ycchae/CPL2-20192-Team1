import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { tap } from  'rxjs/operators';
import { Observable, BehaviorSubject } from  'rxjs';
import { StorageService } from '../storage_service_module/storage.service'
import { async } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private httpClient : HttpClient,
    private storage: StorageService
  ) { }

  SERVER_ADDRESS: string = "http://54.180.89.180:9000";
  header = new HttpHeaders(
    {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  );

  httpSubject  =  new  BehaviorSubject(false);

  register(info) : Observable<{}> {
    let URL = `${this.SERVER_ADDRESS}/user/register`;
    return this.httpClient.post(URL, info, {headers: this.header})
    .pipe(
      tap(async (res) => {
        console.log("registerservice "+ res["register"]);
        if(res["register"] === "success"){
          this.httpSubject.next(true);
        }else{
          this.httpSubject.next(false);
        }
      })
    );
  }

  login(info) : Observable<{}> {
    let URL = `${this.SERVER_ADDRESS}/user/login`;
    return this.httpClient.post(URL, info, {headers: this.header})
    .pipe(
      tap(async (res) => {
        console.log("loginservice "+ res["login"]);
        if(res["login"] === "success"){
          this.storage.save_uid(info["email"]);
          this.httpSubject.next(true);
        }else{
          this.httpSubject.next(false);
        }
      })
    );
  }
  
  get_project_list(user_id) : Observable<{}> {
    let URL = `${this.SERVER_ADDRESS}/project/select?user_id=${user_id}`;
    return this.httpClient.get(URL, {headers: this.header});
  }
  
  create_big_task(info) : Promise<{}>{
    let URL = `${this.SERVER_ADDRESS}/task/createBIG`;
    this.httpClient.post(URL, info)//, {headers: this.header})
    .subscribe(
       async res => {
        console.log("TASK Create"+ res["create"])
        if(res["cretae"] === "success"){
          this.httpSubject.next(true);
        }else{
          this.httpSubject.next(false);
        }
      },
      async error =>{
        console.log(error.status);
        console.log(error.error);
        console.log(error.headers);
        this.httpSubject.next(false);
      }
    );
    return this.httpSubject.toPromise();
  }

  create_mid_task(info) : Promise<{}>{
    let URL = `${this.SERVER_ADDRESS}/task/createMID`;
    this.httpClient.post(URL, info, {headers: this.header})
    .subscribe(
       tap( async res => {
        console.log("TASK Create"+ res["create"])
        if(res["cretae"] === "success"){
          this.httpSubject.next(true);
        }else{
          this.httpSubject.next(false);
        }
      }),
      async error =>{
        console.log(error.status);
        console.log(error.error);
        console.log(error.headers);
        this.httpSubject.next(false);
      }
    );
    return this.httpSubject.toPromise();
  }

  create_sml_task(info) : Promise<{}> {
    let URL = `${this.SERVER_ADDRESS}/task/createSML`;
    this.httpClient.post(URL, info, {headers: this.header})
    .subscribe(
       tap( async res => {
        console.log("TASK Create"+ res["create"])
        if(res["cretae"] === "success"){
          this.httpSubject.next(true);
        }else{
          this.httpSubject.next(false);
        }
      }),
      async error =>{
        console.log(error.status);
        console.log(error.error);
        console.log(error.headers);
        this.httpSubject.next(false);
      }
    );
    return this.httpSubject.toPromise();
  }



  generate_project(info) : Observable<{}> {
    let URL = `${this.SERVER_ADDRESS}/project/create`;
    return this.httpClient.post(URL, info, {headers: this.header})
    .pipe(
      tap(async (res) => {
        console.log("PROJECT create "+ res["create"]);
        if(res["create"] === "success"){
          this.httpSubject.next(true);
        }else{
          this.httpSubject.next(false);
        }
      })
    );
    
  }

  get_proj_name(proj_id : string) : Promise<{}>{
    let URL = `${this.SERVER_ADDRESS}/projectName/select?proj_id=${proj_id}`;
    return this.httpClient.get(URL, {headers: this.header}).toPromise();
  }

  get_task_big_list(proj_id : string) : Observable<{}> {
    let URL = `${this.SERVER_ADDRESS}/taskView/Big/select?proj_id=${proj_id}`;
    return this.httpClient.get(URL, {headers: this.header});
  }

  get_task_mid_list(big_id : string) : Observable<{}> {
    let URL = `${this.SERVER_ADDRESS}/taskView/Mid/select?big_id=${big_id}`;
    return this.httpClient.get(URL, {headers: this.header});
  }

  get_task_sml_list(mid_id : string) : Observable<{}> {
    let URL = `${this.SERVER_ADDRESS}/taskView/Sml/select?mid_id=${mid_id}`;
    return this.httpClient.get(URL, {headers: this.header});
  }


  get_noti_list(proj_id : string) : Promise<{}> {
    let URL = `${this.SERVER_ADDRESS}/notification/select?proj_id=${proj_id}`;
    return this.httpClient.get(URL, {headers: this.header}).toPromise();
  }

  get_task_big_listp(proj_id : string) : Promise<{}> {
    let URL = `${this.SERVER_ADDRESS}/taskView/Big/select?proj_id=${proj_id}`;
    return this.httpClient.get(URL, {headers: this.header}).toPromise();
  }

  get_task_mid_listp(big_id : string) : Promise<{}> {
    let URL = `${this.SERVER_ADDRESS}/taskView/Mid/select?big_id=${big_id}`;
    return this.httpClient.get(URL, {headers: this.header}).toPromise();
  }

  get_task_sml_listp(mid_id : string) : Promise<{}> {
    let URL = `${this.SERVER_ADDRESS}/taskView/Sml/select?mid_id=${mid_id}`;
    return this.httpClient.get(URL, {headers: this.header}).toPromise();
  }

  update_project_state(proj_id : string, proj_status : string) : Promise<{}>{
    console.log("http");
    let URL = `${this.SERVER_ADDRESS}/update-status/project?proj_id=${proj_id}&proj_status=${proj_status}`;
    return this.httpClient.get(URL, {headers: this.header}).toPromise();
  }
  
}
