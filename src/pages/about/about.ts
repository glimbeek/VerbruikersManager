import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CountriesProvider } from '../../providers/countries/countries';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  countriesList: any = []
  loading: any;

  date:any = new Date().toString();

  constructor(public navCtrl: NavController, public countriesService: CountriesProvider) {
  }
  
  ionViewDidLoad() {

    this.countriesService.getCountries().subscribe((data) => {
      this.countriesList = data;
      console.log(this.countriesList);
    });

  }
  
}
