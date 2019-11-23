import { Component } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  user = {
    name: 'Simon Grimm',
    website: 'www.ionicacademy.com',
    address: {
      zip: 48149,
      city: 'Muenster',
      country: 'DE'
    },
    interests: [
      'Ionic', 'Angular', 'YouTube', 'Sports'
    ]
  };

  constructor(
    private router: Router, 
    private dataService: DataService
  ) { }

  // openDetailsWithService() {
  //   this.dataService.setData(42, this.user);
  //   this.router.navigateByUrl('/details/42');
  // }

  openDetailsWithState() {
    let navigationExtras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    this.router.navigate(['details'], navigationExtras);
  }
}
