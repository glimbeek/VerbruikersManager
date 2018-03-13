import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CountriesProvider { // https://www.djamware.com/post/58e657b680aca764ec903c2d/ionic-3-and-angular-4-mobile-app-example

  constructor(public http: Http) {
    console.log('Hello CountriesProvider Provider');
  }

  getCountries(){ 
    return this.http.get('https://restcountries.eu/rest/v2/all').map(res => res.json());
  }  
  
}