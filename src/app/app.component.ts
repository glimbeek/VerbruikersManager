import { Component } from '@angular/core';
import { Platform, ModalController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { TabsPage } from '../pages/tabs/tabs';
import { SplashPage } from '../pages/splash/splash';
import { IntroSlidesPage } from '../pages/introslides/introslides';

import { timer } from 'rxjs/observable/timer' ;

import { Shake } from '@ionic-native/shake';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { ToastController } from 'ionic-angular';

import { LocalNotifications } from '@ionic-native/local-notifications';

import { SettingsProvider } from '../providers/settings/settings'
import { Settings } from '@firebase/firestore-types';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage = SplashPage;

  showSplash = true;

  chosenTheme: any;

  constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, modalCtrl: ModalController,
              private shake: Shake, public toastCtrl: ToastController, private screenOrientation: ScreenOrientation, 
              private localNotifications: LocalNotifications, private translate: TranslateService, public event: Events, public settings: SettingsProvider, public storage: Storage) {

    platform.ready().then(() => {

      console.log("Platform is ready!")

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      /* **** This is the splashcreen magic **** */
      // Source: http://tobiasahlin.com/spinkit/
      timer (300).subscribe(() => this.showSplash = false)

      /* **** Here we start the language magic **** */
      // Add the custom languages
      translate.addLangs(["en", "nl"]);
      // This language will be used as a fallback when a translation isn't found in the current language
      translate.setDefaultLang('en');

      // If we are running on a desktop PC, we check the browser language
      if (this.platform.is('core')) { 
        console.log('Running on Windows');
        this.translate.use(translate.getBrowserLang());
      }
      else {
        this.translate.use(platform.lang());
      }


      /* **** App theming going on here **** */
      // Set the default app theme
      this.chosenTheme = "light-theme";
      // Check if there is a theme in local storage
      this.settings.getSettingTheme().then((value) => {
        console.log('Did we get the return1? :', value);
        // If there is, set it!
        this.chosenTheme = value;
      })

      // Change the app theme
      event.subscribe('theme:toggle', () => {
        this.toggleAppTheme();
      });    

    });

    this.pushNotifications();

    //this.shakeMe();
    
  } 


  toggleAppTheme() {
    if (this.chosenTheme === 'light-theme') {
      this.chosenTheme = ('dark-theme');
    } else {
      this.chosenTheme = ('light-theme');
    }
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