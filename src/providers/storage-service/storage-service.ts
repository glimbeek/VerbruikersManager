import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the StorageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageServiceProvider {

  constructor(public http: HttpClient, storage: Storage) {
    console.log('Hello StorageServiceProvider Provider');

    // openTabsPage() {
      storage.set('FirstStart', '1');
      console.log(storage.get('FirstStart'));  
      // this.navCtrl.setRoot(TabsPage);
      // this.navCtrl.popToRoot();
    // }
    
  }


}
