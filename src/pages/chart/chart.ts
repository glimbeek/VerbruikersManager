import { Component } from '@angular/core';
import { LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';


import { RestProvider } from '../../providers/rest/rest';
import { CountriesProvider } from '../../providers/countries/countries'

@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
})
export class ChartPage {

  users: any;
  countries: string[];
  errorMessage: string;

  dataDay: any = "This is some  daily data";
  datamonth: any = "This is some monthly data";
  dataYearly: any = "This is some yearly data";
  dataOverall: any; "This is all the data so far";

  date:any = new Date().toString();

  interval:string;

  loading: any;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public countriesProvider: CountriesProvider, public loadingCtrl: LoadingController) {
    this.interval = "day"
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartPage');
  }

  swipeEvent(e) {
    console.log('Got swiped!');
    // if(e.direction == '2'){
    //   console.log('Swiped left');
    //   this.navCtrl.parent.select(2);
    // }
    // else if(e.direction == '4'){
    //   console.log('Swiped right');
    //   this.navCtrl.parent.select(0);
    // }
  }

  showLoading() {
    console.log('Loading data...')
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    this.loading.present();

  }

  hideLoading(){
    this.loading.dismiss();
  }

  loadData(value) {
    console.log('Segment clicked: ' + value)
    switch(value) {
      case "day": 
      this.showLoading()
      this.dataDay = "day BLALALA"
      this.hideLoading();
    }
    switch(value) {
      case "month":
      this.showLoading()
      this.dataDay = "month BLALALA"
      this.getUsers();      
    }
    switch(value) {
      case "year": 
      
      this.dataDay = "year BLALALA"
      this.getCountries(); 
    }   
    switch(value) {
      case "overall": 
      this.showLoading()
      this.dataDay = "overall BLALALA"
      this.hideLoading();
    }    
    
  }

  getUsers() {
    this.restProvider.getUsers()
    .then(data => {
      this.users = data;
      console.log(this.users);
    });
    this.hideLoading();
  }

  getCountries() {
    this.showLoading()
    this.countriesProvider.getCountries()
       .subscribe(
         countries => this.countries = countries,
         error =>  this.errorMessage = <any>error);
         console.log(this.countries)
      this.hideLoading();
  }

}
