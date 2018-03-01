import { Component } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
 } from '@ionic-native/google-maps';


/**
 * Google Maps API Key: AIzaSyAr3SZit3mMmAcFbZ3bNKhNMX5DZ_yaeCU
 */

@IonicPage()
@Component({
  selector: 'page-geolocation',
  templateUrl: 'geolocation.html',
})
export class GeolocationPage {
  
  mapReady: boolean = false;
  map: GoogleMap;

  constructor(public navCtrl: NavController, public navParams: NavParams,private geolocation: Geolocation, private googleMaps: GoogleMaps, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.loadMap();
   }
 
   loadMap() {

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904,
          lng: -89.3809802
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: 43.0741904,
              lng: -89.3809802
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }

  //   // Create a map after the view is loaded.
  //   // (platform is already ready in app.component.ts)
  //   this.map = GoogleMaps.create('map_canvas', {
  //     camera: {
  //       target: {
  //         lat: 43.0741704,
  //         lng: -89.3809802
  //       },
  //       zoom: 18,
  //       tilt: 30
  //     }
  //   });

  //   // Wait the maps plugin is ready until the MAP_READY event
  //   this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
  //     this.mapReady = true;
  //   });
  // }

  // onButtonClick() {
  //   if (!this.mapReady) {
  //     this.showToast('map is not ready yet. Please try again.');
  //     return;
  //   }
  //   this.map.clear();

  //   // Get the location of you
  //   this.map.getMyLocation()
  //     .then((location: MyLocation) => {
  //       console.log(JSON.stringify(location, null ,2));

  //       // Move the map camera to the location with animation
  //       return this.map.animateCamera({
  //         target: location.latLng,
  //         zoom: 17,
  //         tilt: 30
  //       }).then(() => {
  //         // add a marker
  //         return this.map.addMarker({
  //           title: '@ionic-native/google-maps plugin!',
  //           snippet: 'This plugin is awesome!',
  //           position: location.latLng,
  //           animation: GoogleMapsAnimation.BOUNCE
  //         });
  //       })
  //     }).then((marker: Marker) => {
  //       // show the infoWindow
  //       marker.showInfoWindow();

  //       // If clicked it, display the alert
  //       marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
  //         this.showToast('clicked!');
  //       });
  //     });
  // }

  showToast(message: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present(toast);
  }
 }
