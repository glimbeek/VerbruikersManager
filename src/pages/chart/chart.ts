import { Component, ViewChild } from '@angular/core';
import { LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';
import { CountriesProvider } from '../../providers/countries/countries';

import { Chart } from 'chart.js'
import { VoteProvider } from '../../providers/vote/vote'

@IonicPage()
@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html',
  inputs: ['chartData']
})
export class ChartPage {

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('chartCanvas') chartCanvas;
  
  chartVar: any;

  users: any;
  countries: string[];
  errorMessage: string;

  dataDay: any = "This is some  daily data";
  datamonth: any = "This is some monthly data";
  dataYearly: any = "This is some yearly data";
  dataOverall: any; "This is all the data so far";

  date:any = new Date().toString();

  interval:string;

  loading: any;



  
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public countriesProvider: CountriesProvider, public loadingCtrl: LoadingController) {    
    this.interval = "day" // We want to start the ChartPage with the "day" segment selected
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartPage');

    this.showLoading()

    setTimeout(() => {
      this.dailyChart()
    },250);


    this.hideLoading();
  }

  // Start of dailyChart
  dailyChart() {
    this.chartVar = new Chart(this.chartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['06:10', '06:20', '06:30', '06:40', '06:50', '07:00', '07:10'],
        datasets: [{
            data: [10, 23, 5, 99, 67, 43, 0],
            backgroundColor: [
              'rgba(41, 255, 122, 1)',
              'rgba(255, 148, 12, 1)'
            ]
        }]
      },
      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        }
      }
    })
  } // End of dailyChart

  // Start of monthlyChart
  monthlyChart() {
    this.chartVar = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: ['01-03', '02-03', '03-03', '04-03', '05-03', '06-03', '07-03'],
        datasets: [
          {
            label: "Power Produced",
            backgroundColor: "blue",
            data: [3,7,4,9,3,5,6]
          },
          {
            label: "Power Used",
            backgroundColor: "red",
            data: [4,3,5,9,3,5,6]
          },
          {
            label: "Gas Used",
            backgroundColor: "green",
            data: [7,2,6,9,3,5,6]
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        tooltips: {
          enabled: true
        }
      }
    })
  } // End of monthlyChart

    // Start of yearlyChart
    yearlyChart() {
      this.chartVar = new Chart(this.chartCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul'],
          datasets: [
            {
              label: "Power Produced",
              backgroundColor: "blue",
              data: [3,7,4,9,3,5,6]
            },
            {
              label: "Power Used",
              backgroundColor: "red",
              data: [4,3,5,9,3,5,6]
            },
            {
              label: "Gas Used",
              backgroundColor: "green",
              data: [7,2,6,9,3,5,6]
            }            
          ]
        },
        options: {
          legend: {
            display: true
          },
          tooltips: {
            enabled: true
          }
        }
      })
    } // End of yearlyChart

    // Start of overallChart
    overallChart() {
      this.chartVar = new Chart(this.chartCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: ['2017', '2018'],
          datasets: [
            {
              label: "Power Produced",
              backgroundColor: "blue",
              data: [600,3758]
            },
            {
              label: "Power Used",
              backgroundColor: "red",
              data: [3113,3201]
            },
            {
              label: "Gas Used",
              backgroundColor: "green",
              data: [1167,1131]
            }            
          ]
        },
        options: {
          legend: {
            display: true
          },
          tooltips: {
            enabled: true
          }
        }
      })
    } // End of overallChart



  swipeEvent(e) {
    console.log('Got swiped!');
    // if(e.direction == '2'){
    //   console.log('Swiped left');
    //   this.navCtrl.parent.select(2);
    // }
    // else if(e.direction == '4'){
    //   console.log('Swiped right');
    //   this.navCtrl.parent.select(0);
    // }
  }

  showLoading() {
    console.log('Loading data...')
    
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  
    this.loading.present();

  }

  hideLoading(){
    this.loading.dismiss();
  }

  loadData(value) {
    console.log('Segment clicked: ' + value)
    switch(value) {
      case "day":       
      setTimeout(() => {
        this.showLoading();
        this.dailyChart();
        this.hideLoading();
      },250);      
    }
    switch(value) {
      case "month":
      setTimeout(() => {
        this.showLoading();
        this.monthlyChart();
        this.hideLoading();
      },250);      
    }
    switch(value) {
      case "year": 
      setTimeout(() => {
        this.yearlyChart()
      },250);   
    }   
    switch(value) {
      case "overall": 
      setTimeout(() => {
        this.overallChart()
      },250);   
    }    
    
  }

  getUsers() {
    this.restProvider.getUsers()
    .then(data => {
      this.users = data;
      console.log(this.users);
    });
    this.hideLoading();
  }

  getCountries() {
    this.showLoading()
    this.countriesProvider.getCountries()
       .subscribe(
         countries => this.countries = countries,
         error =>  this.errorMessage = <any>error);
         console.log(this.countries)
      this.hideLoading();
  }

}
