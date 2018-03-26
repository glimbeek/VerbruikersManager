import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EmailComposer } from '@ionic-native/email-composer';
import { AppVersion } from '@ionic-native/app-version'; 
import { Device } from '@ionic-native/device';

import { Platform, ModalController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {

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
    console.log('ionViewDidLoad SupportPage');

    if (this.platform.is('cordova')) {

      // Get the device details:
      
      this.appName = this.appVersion.getAppName();
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

      //this.appInfo = "appName: " + this.appName + ", appPackageName: " + this.appPackageName + ", appVersionCode: " +  this.appVersionCode + ", appVersionNumber: " + this.appVersionNumber
      this.deviceInfo = "deviceManufacturer: " + this.deviceManufacturer + ", deviceModel: " + this.deviceModel + ", devicePlatform: " + this.devicePlatform + ", deviceSerial: " + this.deviceSerial + ", deviceUuid: " + this.deviceUuid + ", deviceVersion: " + this.deviceVersion

      // this.appVersion.getVersionNumber().then((result) => {
      //   this.appVersionNumber = result;
      // });
      // console.log('Version:' + this.appVersionNumber);

      this.appVersionNumber = this.appVersion.getVersionNumber();

      this.appVersion.getAppName().then((result) => {
        this.appName = result;
      });
      console.log('Version:' + this.appName);


    }
    else {
      console.log('Not running native');
    }
  }

  openSendEmail() {
    if (this.platform.is('cordova')) {
      console.log('Sending feedback');


      this.emailComposer.isAvailable().then((available: boolean) =>{
        if(available) {
          //Now we know we can send
        }
      });

      let email = {
        to: 'appVerbruiksmanager@gvanlimbeek.nl',
        // cc: '',
        // bcc: ['', ''],
        // attachments: [
        //   'file://img/logo.png',
        //   'res://icon.png',
        //   'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        //   'file://README.pdf'
        // ],
        subject: this.deviceInfo,
        body: 'App Name: ' + this.appName + 'Version: ' + this.appVersionNumber,
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
