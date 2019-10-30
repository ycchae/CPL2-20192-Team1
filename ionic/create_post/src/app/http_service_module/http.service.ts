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

  SERVER_ADDRESS: string = "http://54.180.89.77:9000";
  header = new HttpHeaders(
    {'Content-Type': 'application/json',
    'Accept': 'application/json',
    'enctype': 'multipart/formdata',
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
  
  create_big_task(info) {
    let URL = `${this.SERVER_ADDRESS}/task/createBIG`;
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
    return this.httpSubject.asObservable();
  }

  create_mid_task(info) {
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
    return this.httpSubject.asObservable();
  }

  create_sml_task(info) {
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
    return this.httpSubject.asObservable();
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

  get_task_big_list(proj_id) : Observable<{}> {
    let URL = `${this.SERVER_ADDRESS}/taskView/Big/select?proj_id=${proj_id}`;
    return this.httpClient.get(URL, {headers: this.header});
  }

  get_task_mid_list(big_id) : Observable<{}> {
    let URL = `${this.SERVER_ADDRESS}/taskView/Mid/select?big_id=${big_id}`;
    return this.httpClient.get(URL, {headers: this.header});
  }


  // save_id
  // save_role
  // logout
  // out_role
  
  // logout(){
  //   this.storage.del_id();
  // }

  // isLogin(){
  //   return this.storage.get_uid() != null ? true : false;
  // }
  
}
