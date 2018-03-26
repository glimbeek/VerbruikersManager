import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { SettingsProvider } from '../../providers/settings/settings'

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public toggleReceiveNotificationsStatus: boolean;

  themeSaved: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public event: Events, public settings: SettingsProvider) {
    this.themeSaved = "dark-theme";
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage'); 

    this.themeSaved = this.settings.getSettingTheme();
    console.log('SettingsPage settings.ts: Theme gotten from settingsprovider:' , this.themeSaved)

    // We stil need to move this to the SettingsProvider
    this.storage.ready().then(() => { // Check if the storage ready for accessing      
      this.storage.get('ReceiveNotifications').then((val) => {
        this.toggleReceiveNotificationsStatus = val;   // This binds to the [(ngModel)] in the HTML file, so whatever value is pulled from storage will be properly displayed at the front of the app.
      });
    });
  }

  themeChange(val: string) {
    console.log('User changed theme to: ', val)
    // Pass the selected theme to the SettingsProvider
    this.settings.setSettingTheme(val);
    // Toggle the theme change to the app so the app changes the theme
    this.event.publish('theme:toggle');
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