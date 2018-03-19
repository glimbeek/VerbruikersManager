import { Platform, ModalController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { AlertController } from 'ionic-angular';
import { AppRate } from '@ionic-native/app-rate';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  /*
   * To Do:
   * Limit ratings prompt up to three times in a 365-day period https://developer.apple.com/app-store/ratings-and-reviews/
   * Keep track of last prompt date
   * Keep track of user prompt responce, on canceling we need to ask again after x amount of time.
   */
 
  x: number = 71;

  powerProduced: any = "5.9";
  powerUsed: any = "39.1";
  gasUsed: any = "7.3";

  constructor(public platform: Platform, public navCtrl: NavController, public storage: Storage, public alertCtrl: AlertController, public appRate: AppRate) {
  }
  
  ionViewDidLoad() {
    this.storage.ready().then(() => { // Check if storage is ready
      this.storage.get('TimesStarted').then((val) => { // If the key TimesStarted excists in storage, get it's value
        if(val == this.x ) { // If the value is equal to x, show the rating pop-ups
          if (this.platform.is('cordova')) { // Show the cordova/native pop-up
            this.appRate.preferences.storeAppURL = {
              ios: '< my_app_id >',
              android: 'market://details?id=< package_name >',
              windows: 'ms-windows-store://review/?ProductId=< Store_ID >'
              };          
              this.appRate.promptForRating(true); // Show the pop-up          
          }
          else { // For testing purposes we show a non-native browser compatible pop-up
            let alert = this.alertCtrl.create({
              title: 'How do you rate this app?',
              message: '',
              buttons: [
                {
                  text: 'Close',
                  handler: () => {
                    console.log('Close clicked');
                  }
                },
                {
                  text: 'Submit',
                  handler: () => {
                    console.log('Submit clicked');
                  }
                }
              ]
            });        
            alert.present(); // Show the pop-up
          } // End of ELSE
        } // End of IF
       }); // End of Storage READY
    }); // End of Storage GET
  } // End of ionViewDidLoad

  // We can remove this button eventually.
  clearCache() {
    this.storage.ready().then(() =>
      this.storage.remove('FirstStart')
    );
    console.log("Cleared FirstStart from storage.");
  }
  
}

