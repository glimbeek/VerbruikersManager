import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SettingsPage } from '../pages/settings/settings';
import { IntroSlidesPage } from '../pages/introslides/introslides';
import { SplashPage } from '../pages/splash/splash';
import { GeolocationPage } from '../pages/geolocation/geolocation';
import { MorePage } from '../pages/more/more';
import { ChartPage } from '../pages/chart/chart';

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
    ChartPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'glimbeek__dbVebruiksManager',
         driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAr3SZit3mMmAcFbZ3bNKhNMX5DZ_yaeCU' //Google Maps API Key
    }),
    HttpModule
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
    ChartPage
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
