import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SplashPage } from '../pages/splash/splash';
import { IntroSlidesPage } from '../pages/introslides/introslides';
import { HomePage } from '../pages/home/home';
import { ChartPage } from '../pages/chart/chart';
import { GeolocationPage } from '../pages/geolocation/geolocation';
import { MorePage } from '../pages/more/more';
import { SettingsPage } from '../pages/settings/settings';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import { SupportPage } from '../pages/support/support';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from '@agm/core'; // https://angular-maps.com/
import { AppRate } from '@ionic-native/app-rate';
import { Shake } from '@ionic-native/shake';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { EmailComposer } from '@ionic-native/email-composer';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';

import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { RestProvider } from '../providers/rest/rest';
import { CountriesProvider } from '../providers/countries/countries';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { VoteProvider } from '../providers/vote/vote';
import { SettingsProvider } from '../providers/settings/settings';


const config = {
  apiKey: 'AIzaSyDuTs7XL8nHJNf7HpK49Y7oPXQ27EisXQQ',
  authDomain: 'fir-verbruiksmanager.firebaseapp.com',
  databaseURL: 'https://fir-verbruiksmanager.firebaseapp.com',
  projectId: 'firebase-verbruiksmanager',
  storageBucket: 'fir-verbruiksmanager.firebaseapp.com',
  messagingSenderId: '824350061771'
};

export function createTranslateLoader(http: HttpClient) { 
  console.log("TranslateLoader");
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

/*
 * To Do:
 * - Skeleton screens loading:
 *    https://blog.ionicframework.com/improved-perceived-performance-with-skeleton-screens/
 * - Add themes
 * - Complete app translation
 * - Fix version number display
 * - Fix version number in mail
 * - Add functionality to safe meter readings - Or can we get this info from the Domoticz data?
 * - Change loading/splash screen
 * - Add live deploy:
 *    https://ionicframework.com/docs/pro/deploy/
 * - Implement app rating 
 *    Limit ratings prompt up to three times in a 365-day period https://developer.apple.com/app-store/ratings-and-reviews/
 *    Keep track of last prompt date
 *    Keep track of user prompt responce, on canceling we need to ask again after x amount of time.
 */

/*
 * **** CSS Prefixer for cross browser compatiblility:
 * http://prefixr.cloudvent.net/
 * 
 * **** Good place to steal some code: ****
 * https://github.com/ionic-team/ionic/tree/v3
 * https://github.com/ionic-team/ionic-conference-app
 * https://demo.mobiscroll.com
 * http://www.ionicsync.com/
 * 
 * **** Inspiration nation: ****
 * https://market.ionicframework.com 
 * 
 * **** Good tutorial videos ****
 * http://tphangout.com/ionic-3-charts/
 * 
 */


/*
 * **** Common Cordova / Ionic build errors **** 
 * https://docs.buddybuild.com/troubleshooting/frameworks/cordova_ionic.html
 * 
 * Known problem: --livereload not working cordova.js doesn't get loaded: 
 *  - https://github.com/ionic-team/ionic-app-scripts/issues/467
 *  - https://github.com/ionic-team/ionic-app-scripts/issues/1380 
 * 
 * 
 * Unable to uninstall a plugin because of something related to android or ios?
 * - Uninstall the platform: $ ionic cordova platform rm <platform>
 * - Uninstall the plugin
 * - Install the platform
 * 
 * WARNING: (node:8812) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): CordovaError: Cannot find plugin.xml for plugin "cordova-plugin-ionic". Please try adding it again.
 * - npm uninstall -g ionic cordova
 * - npm install -g ionic cordova
 * 
 * In general after doing INSTALLs or UNISTALLs to the PLATFORM, PLUGINS, etc.. 
 * - ionic cordova prepare
 * - .\platforms\android\cordova\clean
 * - npm rebuild node-sass
 * 
 * 
 * Upload changes to GIT, IONIC builds a new version viewable in IONIC VIEW:
 * $ git push -u origin master
 * 
 */

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SettingsPage,
    IntroSlidesPage,
    GeolocationPage,
    SplashPage,
    MorePage,
    ChartPage,
    SupportPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'glimbeek__dbVerbruiksManager',
         driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAr3SZit3mMmAcFbZ3bNKhNMX5DZ_yaeCU' //Google Maps API Key
    }),
    HttpModule,
    HttpClientModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SettingsPage,
    IntroSlidesPage,
    GeolocationPage,
    SplashPage,
    MorePage,
    ChartPage,
    SupportPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CountriesProvider,
    Geolocation,
    Storage,
    StorageServiceProvider,
    Shake,
    AppRate,
    ScreenOrientation,
    EmailComposer,
    AppVersion,
    Device,
    LocalNotifications,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    VoteProvider,
    TranslateService,
    SettingsProvider
  ]
})
export class AppModule {}
