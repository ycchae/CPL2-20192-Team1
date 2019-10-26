import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.page.html',
  styleUrls: ['signup.page.scss'],
})
export class SignupPage{
  
  constructor(
      private http: HttpClient,
      private navCtrl: NavController,
      private alertController : AlertController
    ) {}

  user = {
    email: '',
    password: '',
    name: '',
    department: ''
  }
  
  sign_up(form){
    let header = new HttpHeaders(
      {'Content-Type': 'application/json',
      'Accept': 'application/json',
      }
    );

    const URL = "http://54.180.89.77:9000/user/create";
    this.http.post(URL, form.value, {headers: header})
    .subscribe(data=>{
      console.log(data['overlap_examine']);
      this.alertController.create({
        header: 'Confirm!',
        subHeader: '계정 만들기 성공!',
        message: '로그인 화면으로 이동합니다.',
        buttons: [{
          text: '확인',
          handler:() =>{
            this.navCtrl.navigateForward('/login');
          }
        }]
      }).then(alert=>{
        alert.present();
      });
    }, error=>{
      console.log(error.status);
      console.log(error.error);
      console.log(error.headers);
      this.alertController.create({
        header: 'Reject!',
        subHeader: '계정 만들기 실패ㅠ',
        message: '잠시후 다시 시도해주세요.',
        buttons: [{
          text: '확인'
        }]
      }).then(alert=>{
        alert.present();
      });
    })
  }

  // private controller = document.querySelector('ion-alert-controller');
  // sign_up(event){
  //   event.preventDefault();
  //   this.controller.create({
  //     header: 'Account Created',
  //     message: ''
  //   }).then(alert => alert.present());
  // // }
}
