import { Component, ViewChild } from '@angular/core';
import { LoadingController, IonicPage, NavController, NavParams } from 'ionic-angular';

import { RestProvider } from '../../providers/rest/rest';
import { CountriesProvider } from '../../providers/countries/countries';

import { Chart } from 'chart.js';

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
  
  barChart: any;
  doughnutChart: any;
  lineChart: any;

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

  chartOptionsDaily : any;
  chartOptionsMonthly : any;
  chartOptionsYearly : any;
  chartOptionsOverall : any;

  electricityUsed: any = [1, 0, 4];
  electricityProduced: any =[5, 7, 3];
  gasUsed: any;

  
  constructor(public navCtrl: NavController, public navParams: NavParams, public restProvider: RestProvider, public countriesProvider: CountriesProvider, public loadingCtrl: LoadingController) {
    
    this.interval = "day" // We want to start the ChartPage with the "day" segment selected

    // // Start Daily Chart data
    // this.chartOptionsDaily = {
    //   chart: {
    //     type: 'areaspline',
    //     height: '100%'
    //   },
    //   title: {
    //     text: '20-03-2018'
    //   },
    //   // subtitle: {
    //   //     text: ''
    //   // },
    //   xAxis: {
    //       categories: [
    //           '06',
    //           '06:10',
    //           '06:20',
    //           '06:30'
    //       ],
    //       crosshair: true
    //   },
    //   yAxis: {
    //       min: 0,
    //       // title: {
    //       //     text: 'Rainfall (mm)'
    //       // }
    //   },
    //   tooltip: {
    //       headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    //       pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    //           '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
    //       footerFormat: '</table>',
    //       shared: true,
    //       useHTML: true
    //   },
    //   plotOptions: {
    //       column: {
    //           pointPadding: 0.2,
    //           borderWidth: 0
    //       }
    //   },
    //   series: [{
    //     name: 'Electricity used',
    //     data: [49.9, 71.5, 106.4, 33]
    //   }, {
    //     name: 'Eletricity produced',
    //     data: [48.9, 38.8, 39.3, 6]
    //   }, {
    //     name: 'Gas used',
    //     data: [42.4, 33.2, 34.5, 99]
    //   }]
    // } // End Daily Chart data

    // // Start Monthly Chart data
    // this.chartOptionsMonthly = {
    //   chart: {
    //     type: 'column',
    //     height: '100%'
    //   },
    //   title: {
    //     text: '03-2018'
    //   },
    //   // subtitle: {
    //   //     text: ''
    //   // },
    //   xAxis: {
    //       categories: [
    //           '1',
    //           '2',
    //           '3',
    //           '4',
    //           '5',
    //           '6',
    //           '7',
    //           '8',
    //           '9',
    //           '10',
    //           '11',
    //           '12'
    //       ],
    //       crosshair: true
    //   },
    //   yAxis: {
    //       min: 0,
    //       // title: {
    //       //     text: 'Rainfall (mm)'
    //       // }
    //   },
    //   tooltip: {
    //       headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    //       pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    //           '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
    //       footerFormat: '</table>',
    //       shared: true,
    //       useHTML: true
    //   },
    //   plotOptions: {
    //       column: {
    //           pointPadding: 0.2,
    //           borderWidth: 0
    //       }
    //   },
    //   series: [{
    //     name: 'Electricity used',
    //     data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    //   }, {
    //     name: 'Eletricity produced',
    //     data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
    //   }, {
    //     name: 'Gas used',
    //     data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
    //   }]
    // } // End Monthly Chart data

    // // Start Yearly Chart data
    // this.chartOptionsYearly = {
    //   chart: {
    //     type: 'column',
    //     height: '100%'
    //   },
    //   title: {
    //     text: '2018'
    //   },
    //   // subtitle: {
    //   //     text: ''
    //   // },
    //   xAxis: {
    //       categories: [
    //           'Jan',
    //           'Feb',
    //           'Mar',
    //           'Apr',
    //           'May',
    //           'Jun',
    //           'Jul',
    //           'Aug',
    //           'Sep',
    //           'Oct',
    //           'Nov',
    //           'Dec'
    //       ],
    //       crosshair: true
    //   },
    //   yAxis: {
    //       min: 0,
    //       // title: {
    //       //     text: 'Rainfall (mm)'
    //       // }
    //   },
    //   tooltip: {
    //       headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    //       pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    //           '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
    //       footerFormat: '</table>',
    //       shared: true,
    //       useHTML: true
    //   },
    //   plotOptions: {
    //       column: {
    //           pointPadding: 0.2,
    //           borderWidth: 0
    //       }
    //   },
    //   series: [{
    //     name: 'Electricity used',
    //     data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    //   }, {
    //     name: 'Eletricity produced',
    //     data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]
    //   }, {
    //     name: 'Gas used',
    //     data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]
    //   }]
    // } // End Yearly Chart data

    // // Start Overall Chart data
    // this.chartOptionsOverall = {
    //   chart: {
    //     type: 'column',
    //     height: '100%'
    //   },
    //   title: {
    //     text: '2018'
    //   },
    //   // subtitle: {
    //   //     text: ''
    //   // },
    //   xAxis: {
    //       categories: [
    //           '2017',
    //           '2018'
    //       ],
    //       crosshair: true
    //   },
    //   yAxis: {
    //       min: 0,
    //       // title: {
    //       //     text: 'Rainfall (mm)'
    //       // }
    //   },
    //   tooltip: {
    //       headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
    //       pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
    //           '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
    //       footerFormat: '</table>',
    //       shared: true,
    //       useHTML: true
    //   },
    //   plotOptions: {
    //       column: {
    //           pointPadding: 0.2,
    //           borderWidth: 0
    //       }
    //   },
    //   series: [{
    //     name: 'Electricity used',
    //     data: [49.9, 71.5]
    //   }, {
    //     name: 'Eletricity produced',
    //     data: [48.9, 38.8]
    //   }, {
    //     name: 'Gas used',
    //     data: [42.4, 33.2]
    //   }]
    // } // End Yearly Chart data

   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChartPage');

//     this.barChart = new Chart(this.barCanvas.nativeElement, {
 
//         type: 'bar',
//         data: {
//             labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//             datasets: [{
//                 label: '# of Votes',
//                 data: [12, 19, 3, 5, 2, 3],
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)',
//                     'rgba(255, 206, 86, 0.2)',
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(255, 159, 64, 0.2)'
//                 ],
//                 borderColor: [
//                     'rgba(255,99,132,1)',
//                     'rgba(54, 162, 235, 1)',
//                     'rgba(255, 206, 86, 1)',
//                     'rgba(75, 192, 192, 1)',
//                     'rgba(153, 102, 255, 1)',
//                     'rgba(255, 159, 64, 1)'
//                 ],
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             scales: {
//                 yAxes: [{
//                     ticks: {
//                         beginAtZero:true
//                     }
//                 }]
//             }
//         }
  
//     });
  
//     this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
  
//         type: 'doughnut',
//         data: {
//             labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
//             datasets: [{
//                 label: '# of Votes',
//                 data: [12, 19, 3, 5, 2, 3],
//                 backgroundColor: [
//                     'rgba(255, 99, 132, 0.2)',
//                     'rgba(54, 162, 235, 0.2)',
//                     'rgba(255, 206, 86, 0.2)',
//                     'rgba(75, 192, 192, 0.2)',
//                     'rgba(153, 102, 255, 0.2)',
//                     'rgba(255, 159, 64, 0.2)'
//                 ],
//                 hoverBackgroundColor: [
//                     "#FF6384",
//                     "#36A2EB",
//                     "#FFCE56",
//                     "#FF6384",
//                     "#36A2EB",
//                     "#FFCE56"
//                 ]
//             }]
//         }
  
//     });
  
//     this.lineChart = new Chart(this.lineCanvas.nativeElement, {
  
//         type: 'line',
//         data: {
//             labels: ["January", "February", "March", "April", "May", "June", "July"],
//             datasets: [
//                 {
//                     label: "My First dataset",
//                     fill: false,
//                     lineTension: 0.1,
//                     backgroundColor: "rgba(75,192,192,0.4)",
//                     borderColor: "rgba(75,192,192,1)",
//                     borderCapStyle: 'butt',
//                     borderDash: [],
//                     borderDashOffset: 0.0,
//                     borderJoinStyle: 'miter',
//                     pointBorderColor: "rgba(75,192,192,1)",
//                     pointBackgroundColor: "#fff",
//                     pointBorderWidth: 1,
//                     pointHoverRadius: 5,
//                     pointHoverBackgroundColor: "rgba(75,192,192,1)",
//                     pointHoverBorderColor: "rgba(220,220,220,1)",
//                     pointHoverBorderWidth: 2,
//                     pointRadius: 1,
//                     pointHitRadius: 10,
//                     data: [65, 59, 80, 81, 56, 55, 40],
//                     spanGaps: false,
//                 }
//             ]
//         }
  
//     });
  }

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
      this.showLoading()
      this.dataDay = "day BLALALA"
      this.hideLoading();
    }
    switch(value) {
      case "month":
      this.showLoading()
      this.dataDay = "month BLALALA"
      this.getUsers();      
    }
    switch(value) {
      case "year": 
      
      this.dataDay = "year BLALALA"
      this.getCountries(); 
    }   
    switch(value) {
      case "overall": 
      this.showLoading()
      this.dataDay = "overall BLALALA"
      this.hideLoading();
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
