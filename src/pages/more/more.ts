import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';

import { EmailComposer } from '@ionic-native/email-composer';
import { AppVersion } from '@ionic-native/app-version'; 
import { Device } from '@ionic-native/device';

import { Platform, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  appName: any;
  appPackageName: any;
  appVersionCode: any;
  appVersionNumber: any;



  deviceManufacturer: any;
  deviceModel: any;
  devicePlatform: any;
  deviceSerial: any;
  deviceUuid: any;
  deviceVersion: any;

  appInfo: any;
  deviceInfo: any;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, public emailComposer: EmailComposer, public appVersion: AppVersion, public device: Device) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');

    if (this.platform.is('cordova')) {
      this.appVersion.getVersionNumber().then((result) => {
        this.appInfo = result;
      });
      console.log('Version:' + this.appInfo);
    }
    else {
      console.log('Not running native');
    }
  }

  openSettingsPage() { 
    console.log('Pusing SettingsPage');
    this.navCtrl.push(SettingsPage);
  }
  
  openSendEmail() {
    if (this.platform.is('cordova')) {
      console.log('Sending feedback');

      // Get the device details:
      
      this.appName = this.appVersion.getAppName;
      this.appPackageName = this.appVersion.getPackageName();
      this.appVersionCode = this.appVersion.getVersionCode();
      this.appVersionNumber = this.appVersion.getVersionNumber();
      console.log(this.appName + this.appPackageName +  this.appVersionCode + this.appVersionNumber);


      this.deviceManufacturer = this.device.manufacturer;
      this.deviceModel = this.device.model   ; 
      this.devicePlatform = this.device.platform;
      this.deviceSerial = this.device.serial;
      this.deviceUuid = this.device.uuid;
      this.deviceVersion = this.device.version;
      console.log(this.deviceManufacturer + this.deviceModel + this.devicePlatform + this.deviceSerial + this.deviceUuid + this.deviceVersion);

      this.appInfo = this.appName + this.appPackageName +  this.appVersionCode + this.appVersionNumber
      this.deviceInfo = this.deviceManufacturer + this.deviceModel + this.devicePlatform + this.deviceSerial + this.deviceUuid + this.deviceVersion

      this.emailComposer.isAvailable().then((available: boolean) =>{
        if(available) {
          //Now we know we can send
        }
      });

      let email = {
        to: 'appVebruikrsmanager@gvanlimbeek.nl',
        // cc: '',
        // bcc: ['', ''],
        // attachments: [
        //   'file://img/logo.png',
        //   'res://icon.png',
        //   'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        //   'file://README.pdf'
        // ],
        subject: this.deviceInfo,
        body: 'Version: ' + this.appInfo,
        isHtml: true
      };
      // Send a text message using default options
      this.emailComposer.open(email);
    }
    else {
      console.log('Not running on a native device');
    }
  }
}
