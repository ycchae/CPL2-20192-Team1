import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { HttpService } from '../http_service_module/http.service';
import { FormGroup } from '@angular/forms';
import { SignupPage } from '../signup/signup.page';
import { Key } from 'protractor';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  private user = {
    email: '',
    password: ''
  }

  constructor(
    private http: HttpService,
    private navCtrl: NavController,
    private navParm: NavParams
  ) { }

  login(form: FormGroup){
    this.http.login(form.value).subscribe(
      res => {
        if(res["login"] === "success"){
          console.log("loginpage success");
          this.goMainPage() ;
        }else{
          console.log("loginpage fail");
        }
      },
      error => {
        console.log(error.status);
        console.log(error.error);
        console.log(error.headers);
      }
    );
  }

  goSignUp() {
    this.navCtrl.navigateForward('/signup');
  }
  goMainPage(){
    this.navCtrl.navigateForward('/main');
  }

}
