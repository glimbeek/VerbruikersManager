import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public toggleReceiveNotificationsStatus: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage'); 
    this.storage.ready().then(() => { // Check if the storage ready for accessing      
      this.storage.get('ReceiveNotifications').then((val) => {
        this.toggleReceiveNotificationsStatus = val;   // This binds to the [(ngModel)] in the HTML file, so whatever value is pulled from storage will be properly displayed at the front of the app.
      });
    });
  }

  toggleReceiveNotifications() { // React to the user toggle and save to storage
    if (this.toggleReceiveNotificationsStatus === true) {
      this.storage.ready().then(() => { // Check if the storage ready for accessing      
        this.storage.set('ReceiveNotifications', this.toggleReceiveNotificationsStatus);  
      });
    }
    else {
      this.storage.ready().then(() => { // Check if the storage ready for accessing      
        this.storage.set('ReceiveNotifications', this.toggleReceiveNotificationsStatus);  
      });
    }
  }
}