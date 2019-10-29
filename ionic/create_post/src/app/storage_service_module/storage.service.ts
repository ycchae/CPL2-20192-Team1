import { Injectable } from '@angular/core';
import { Storage } from  '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) { 
    
  }

  save_id(email : string){
    console.log(email);
    this.storage.set("USER_ID", email);
  }

  save_role(role : string){
    this.storage.set("USER_ROLE", role);
  }

  del_id(){
    this.storage.remove("USER_ID");
  }

  del_role(){
    this.storage.remove("USER_ROLE");
  }

  get_uid() {
    return (this.storage.get("USER_ID")); }

  get_role() {
    return this.storage.get("USER_ROLE");
  }
}
