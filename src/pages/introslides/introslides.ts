import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';

import { Storage } from '@ionic/storage';

import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-introslides',
  templateUrl: 'introslides.html',
})
export class IntroSlidesPage { 
  
  slides: any; //Declare slides
  HomePage: any;
  // item : any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage){
      this.HomePage = HomePage;
    }  
  
    openTabsPage() {
      this.storage.ready().then(() => { // Check if the storage ready for accessing
        this.storage.set('FirstStart',true);

        this.storage.get('TimesStarted').then((val) => {
          console.log('TimesStarted is', val);
          val = val + 1;
          console.log('TimesStarted', val);
          this.storage.set('TimesStarted', val);
        });
    });

    this.navCtrl.setRoot(TabsPage);
    this.navCtrl.popToRoot();
  }
 

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroslidesPage');

    this.slides = [
      {
        title: "Welcome to the Docs!",
        description: "The <b>Ionic Component Documentation</b> showcases a number of useful components that are included out of the box with Ionic.",
        image: "assets/img/ica-slidebox-img-1.png",
      },
      {
        title: "What is Ionic?",
        description: "<b>Ionic Framework</b> is an open source SDK that enables developers to build high quality mobile apps with web technologies like HTML, CSS, and JavaScript.",
        image: "assets/img/ica-slidebox-img-2.png",
      },
      {
        title: "Setup",
        description: "The <b>Ionic Cloud</b> is a cloud platform for managing and scaling Ionic apps with integrated services like push notifications, native builds, user auth, and live updating.",
        image: "assets/img/ica-slidebox-img-3.png",
      }
    ];

  }

}
