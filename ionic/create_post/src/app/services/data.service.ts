import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private attend_link;
  constructor() { }

  setAttendLink(link){
    this.attend_link = link;
  }
  getLink(){
    return this.attend_link;
  }
}
