/* ToDo:
 * Chart drawing
 * Proper local storage provider
 * 
 * Shake phone for feedback. 
 * 
 */

 /* Ionic Git Push command:
  * $ git push ionic master
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
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { ToastController } from 'ionic-angular';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage = SplashPage;

  showSplash = true;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, modalCtrl: ModalController, private shake: Shake, public toastCtrl: ToastController, private screenOrientation: ScreenOrientation) {
    platform.ready().then(() => {

      console.log("Platform is ready!")

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      if (platform.is('cordova')) {
        const watch = this.shake.startWatch(40).subscribe(() => {
          console.log('Shake it baby!');
          this.showToast('Shake it baby!');
          });
      }
      else {
        console.log('Not running on a native device');
      }

      this.screenOrientation.onChange().subscribe(
        () => {
          console.log(this.screenOrientation.type);
        }
     );

      //Source: http://tobiasahlin.com/spinkit/
      timer (300).subscribe(() => this.showSplash = false)

    });
    
  }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
  }

}