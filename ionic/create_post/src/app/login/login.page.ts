import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpService } from '../http_service_module/http.service';


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
    private navCtrl: NavController
  ) { }

  login(form){
    let ret = this.http.login(form.value);
    if(ret){
      console.log("login success");
    }else{
      console.log("login fail");
    }
  }

  goSignUp() {
    this.navCtrl.navigateForward('/signup');
  }

}
