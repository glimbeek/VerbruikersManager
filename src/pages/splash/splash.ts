import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { IntroSlidesPage } from '../introslides/introslides';
import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');

    this.storage.ready().then(() => {
      console.log('Storage is ready');
      this.storage.get('FirstStart').then((data) => {
          if(!data)
          {
            console.log('App is started for the first time. FirstStart value: ', data)
            this.navCtrl.setRoot(IntroSlidesPage);
          };
          if(data)
          {
            console.log('Firststart value appcomp:', data);
            this.navCtrl.setRoot(TabsPage);
            this.storage.get('TimesStarted').then((val) => {
              console.log('TimesStarted is', val);
              val = val + 1;
              console.log('TimesStarted', val);
              this.storage.set('TimesStarted', val);
            });
          };
        });
    });

  }

}