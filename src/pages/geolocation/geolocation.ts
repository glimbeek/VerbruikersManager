import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

@IonicPage()
@Component({
  selector: 'page-geolocation',
  templateUrl: 'geolocation.html',
})
export class GeolocationPage {
  
  // map: GoogleMap;

  title: string = 'My first AGM project';
  errorMessage: string = "";
  lat: number = 52.370216;
  lng: number = 4.895168;

  // constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, public googleMaps: GoogleMaps, public toastCtrl: ToastController) {
    constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, public toastCtrl: ToastController) {
      this.geolocation.getCurrentPosition().then((resp) => {
        this.lat = resp.coords.latitude
        this.lng = resp.coords.longitude
       }).catch((error) => {
         this.errorMessage = 'Error getting location' + error + ' Please try again.';
         console.log('Error getting location:', error);
         this.showToast(this.errorMessage);
       });
  }

  ionViewDidLoad() {
    console.log('Loaded geolocation.ts');
   }

 // google maps zoom level
 zoom: number = 16;  

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
  }
}
