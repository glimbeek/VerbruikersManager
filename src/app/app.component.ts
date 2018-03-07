/* ToDo:
 * Chart drawing
 * Proper local storage provider
 * 
 * Shake phone for feedback. 
 * 
 */

import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../pages/tabs/tabs';
import { SplashPage } from '../pages/splash/splash';
import { IntroSlidesPage } from '../pages/introslides/introslides';

import { timer } from 'rxjs/observable/timer' ;

import { Shake } from '@ionic-native/shake';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage = SplashPage;

  showSplash = true;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, modalCtrl: ModalController, private shake: Shake) {
    platform.ready().then(() => {

      console.log("Platform is ready!")

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      const watch = this.shake.startWatch(60).subscribe(() => {
        console.log('Shake it baby');
        });

      //Source: http://tobiasahlin.com/spinkit/
      timer (300).subscribe(() => this.showSplash = false)

    });
    
  }

}