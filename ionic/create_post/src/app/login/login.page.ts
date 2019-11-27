import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { HttpService } from '../http_service_module/http.service';
import { FormGroup } from '@angular/forms';
import { StorageService } from '../storage_service_module/storage.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  private user = {
    email: '',
    password: ''
  }

  constructor(
    private http: HttpService,
    private navCtrl: NavController,
    private storage: StorageService
  ) { }

  

  async ngOnInit() {
    let user_id: string;
    await this.storage.get_uid()
    .then(val=>{
      user_id = val;
    });

    if(user_id != null && user_id != "")
      this.navCtrl.navigateForward('/main');
  }

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
