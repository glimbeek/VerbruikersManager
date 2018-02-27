import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CountriesProvider {

  constructor(public http: Http) {
    console.log('Hello CountriesProvider Provider');
  }

  getCountries(){ 
    return this.http.get('https://restcountries.eu/rest/v2/all').map(res => res.json());
  }  
  
}