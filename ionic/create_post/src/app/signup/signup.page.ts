import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss'],
})
export class SignupPage{

  constructor(private http: HttpClient, private navCtrl: NavController) {}
  user = {
    email: '',
    password: '',
    name: '',
    department: ''
  }
  
  sign_up(form){
    let headers = new HttpHeaders();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application-json');

    const URL = "http://54.180.89.77:9000/user/create";
    this.http.post(URL, form.value, {headers: headers})
    .subscribe(data=>{
      console.log(data['overlap_examine']);
    }, error=>{
      console.log(error.status);
      console.log(error.error);
      console.log(error.headers);
    })
  }

  // private controller = document.querySelector('ion-alert-controller');
  // sign_up(event){
  //   event.preventDefault();
  //   this.controller.create({
  //     header: 'Account Created',
  //     message: ''
  //   }).then(alert => alert.present());
  // }
}
