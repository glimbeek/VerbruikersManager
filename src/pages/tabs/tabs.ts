import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
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

  constructor() {

  }
}
