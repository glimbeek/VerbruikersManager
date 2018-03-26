import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

/*
  Generated class for the SettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingsProvider {

  theme: any;

  constructor(public http: HttpClient, public storage: Storage) {
    console.log('Hello SettingsProvider Provider');
  }

  getSettingTheme(): Promise<any> {
    return new Promise(resolve => {
      this.storage.ready().then(() => { // Check if the storage ready for accessing   

        this.storage.get('AppTheme')
          .then((value) => {
            console.log("Theme in storage: ", value);
            resolve(value);
          }
        );
        // .catch((errorGet: any) => {
        //   console.error(errorGet);
        //   return;
        // });
      });
    });
  }

  setSettingTheme (value) {
    console.log('We are going to set the theme value:' , value)
    this.storage.ready().then(() => { // Check if the storage ready for accessing      
      this.storage.set('AppTheme', value);  
    });
  }

}
