import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
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

import { DayPage } from '../pages/day/day';
import { MonthPage } from '../pages/month/month';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CountriesProvider } from '../providers/countries/countries';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';

import { IonicStorageModule } from '@ionic/storage';

import { ChartsModule } from 'ng2-charts';
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from '@agm/core'; // https://angular-maps.com/

import { AppRate } from '@ionic-native/app-rate';

import { Shake } from '@ionic-native/shake';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { EmailComposer } from '@ionic-native/email-composer';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';

import { LocalNotifications } from '@ionic-native/local-notifications';
import { RestProvider } from '../providers/rest/rest';


/*
 * Good place to steal some code:
 * https://github.com/ionic-team/ionic-conference-app
 * https://demo.mobiscroll.com
 * 
 * Common Cordova / Ionic build errors
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
    DayPage,
    MonthPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'glimbeek__dbVerbruiksManager',
         driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAr3SZit3mMmAcFbZ3bNKhNMX5DZ_yaeCU' //Google Maps API Key
    }),
    HttpModule,
    HttpClientModule
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
    DayPage,
    MonthPage
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
    RestProvider
  ]
})
export class AppModule {}
