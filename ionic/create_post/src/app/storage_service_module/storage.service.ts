import { Injectable } from '@angular/core';
import { Storage } from  '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) {  }

  save_uid(email : string){
    this.storage.set("USER_ID", email);
  }
  save_mgr_id(mgr_id : string){
    this.storage.set("MGR_ID", mgr_id);
  }
  save_proj_id(proj_id : string){
    this.storage.set("PROJ_ID", proj_id);
  }

  del_uid(){
    this.storage.remove("USER_ID");
  }
  del_mgr_id(){
    this.storage.remove("MGR_ID");
  }
  del_proj_id(){
    this.storage.remove("PROJ_ID");
  }

  get_uid() {
    return this.storage.get("USER_ID");
  }
  get_mgr_id() {
    return this.storage.get("MGR_ID");
  }
  get_proj_id(){
    return this.storage.get("PROJ_ID");
  }
}
