import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { SupportPage } from '../support/support';

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');

  }

  swipeEvent(e) {
    console.log('Got swiped!');
    // if(e.direction == '2'){
    //   console.log('Swiped left');
    //   //this.navCtrl.parent.select(1);
    // }
    // else if(e.direction == '4'){
    //   console.log('Swiped right');
    //   this.navCtrl.parent.select(2);
    // }
  }

  openSettingsPage() { 
    console.log('Pusing SettingsPage');
    this.navCtrl.push(SettingsPage);
  }
  
  openSupportPage (){
    console.log('Pushing SupportPage');
    this.navCtrl.push(SupportPage);
  }
}
