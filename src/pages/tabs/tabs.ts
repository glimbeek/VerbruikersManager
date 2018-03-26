import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { HomePage } from '../home/home';
import { GeolocationPage } from '../geolocation/geolocation';
import { MorePage } from '../more/more';
import { ChartPage } from '../chart/chart';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ChartPage;
  tab3Root = GeolocationPage;
  tab4Root = MorePage;

  tab2Title: string;
  tab3Title: string;
  tab4Title: string;

  constructor(public translate: TranslateService) {
    this.getTabTitles();

  }

  ionViewDidLoad() {
    
  }

  getTabTitles() {
    this.translate.get('TABSNAV.CHARTS').subscribe(
      value => {
        console.log('value: ', value)
        // value is our translated string
        this.tab2Title = value;
      }
    )
    
    this.translate.get('TABSNAV.LOCATION').subscribe(
      value => {
        console.log('value: ', value)
        // value is our translated string
        this.tab3Title = value;
      }
    )

    this.translate.get('TABSNAV.MORE').subscribe(
      value => {
        console.log('value: ', value)
        // value is our translated string
        this.tab4Title = value;
      }
    )

  }
}
