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
  del_uid(){
    this.storage.remove("USER_ID");
  }
  get_uid() {
    return this.storage.get("USER_ID");
  }
}
