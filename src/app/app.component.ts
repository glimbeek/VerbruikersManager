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

import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage = SplashPage;

  showSplash = true;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, modalCtrl: ModalController,
              private shake: Shake, public toastCtrl: ToastController, private screenOrientation: ScreenOrientation, private localNotifications: LocalNotifications) {

    platform.ready().then(() => {

      console.log("Platform is ready!")

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();


      //Source: http://tobiasahlin.com/spinkit/
      timer (300).subscribe(() => this.showSplash = false)

    });

    this.pushNotifications();

    //this.shakeMe();
    
  }

  shakeMe() {
    const watch = this.shake.startWatch(60).subscribe(() => {
      this.showToast('Shake it baby!')
      console.log('Shake it baby!')
      });
    }

  pushNotifications() {
    console.log('Notify me!')
    this.localNotifications.schedule(
      {
        text: 'Your weekly overview is available.'
      }
    )
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