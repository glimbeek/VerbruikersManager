import { Platform, ModalController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { AlertController } from 'ionic-angular';
import { AppRate } from '@ionic-native/app-rate';

import { ChartPage } from '../../pages/chart/chart';

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
      this.storage.get('TimesStarted').then((val) => { // If the key TimesStarted exists in storage, get it's value
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

  swipeEvent(e) {
    console.log('Got swiped!');
    let currentIndex = this.navCtrl.getActive();
    console.log('Current index is', currentIndex);
    if(e.direction == '2'){
      console.log('Swiped left');
      this.navCtrl.parent.select(1); // tab2Root = ChartPage;
    }
    else if(e.direction == '4'){
      console.log('Swiped right');
      // We are already on HOME so no need to respond to swiping right
      //this.navCtrl.parent.select(0);
    }
  }

  // We can remove this button eventually.
  clearCache() {
    this.storage.ready().then(() =>
      this.storage.remove('FirstStart')
    );
    console.log("Cleared FirstStart from storage.");
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();

      this.powerProduced = this.randomInt(12,442);
      this.powerUsed = this.randomInt(122,42);;
      this.gasUsed = this.randomInt(32,12);

      var elements = document.getElementsByName("powerusedbar");
      for (var i = 0; i < elements.length; i++) {
          console.log('Found the bar!');
          elements[i].style.width=(this.powerProduced+"px");
      }
    }, 1000); 

  }
  randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
}

