/* ToDo:
 * Chart drawing
 * Proper local storage provider
 * 
 * Shake phone for feedback. 
 * email bug/feedback report with device details in email title and app version
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

import { Push, PushObject, PushOptions } from '@ionic-native/push';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage = SplashPage;

  showSplash = true;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, modalCtrl: ModalController, private shake: Shake, public toastCtrl: ToastController, private screenOrientation: ScreenOrientation, public push: Push) {
    platform.ready().then(() => {

      console.log("Platform is ready!")

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    //   if (platform.is('cordova')) {
    //     const watch = this.shake.startWatch(40).subscribe(() => {
    //       console.log('Shake it baby!');
    //       this.showToast('Shake it baby!');
    //       });
    //   }
    //   else {
    //     console.log('Not running on a native device');
    //   }

    //   this.screenOrientation.onChange().subscribe(
    //     () => {
    //       console.log(this.screenOrientation.type);
    //     }
    //  );

      //Source: http://tobiasahlin.com/spinkit/
      timer (300).subscribe(() => this.showSplash = false)

    });

    this.pushNotifications();
    
  }

  pushNotifications () {
    console.log('We want to push something here...');


    // this.push.hasPermission().then((res: any) => {
    //   if (res.isEnabled) {
    //     console.log('We have permission to send push notifications');
    //   } else {
    //     console.log('We do not have permission to send push notifications');
    //   }
    // });

    // // Return a list of currently configured channels
    // this.push.listChannels().then((channels) => console.log('List of channels', channels))

    // // Create a channel (Android O and above). You'll need to provide the id, description and importance properties.
    // this.push.createChannel({
    // id: "testchannel1",
    // description: "My first test channel",
    // // The importance property goes from 1 = Lowest, 2 = Low, 3 = Normal, 4 = High and 5 = Highest.
    // importance: 3
    // }).then(() => console.log('Channel created'));


    

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