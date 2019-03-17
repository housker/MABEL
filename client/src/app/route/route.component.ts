import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { GeoService } from '../geo.service';
// import '../../../src/assets/leaflet/leaflet.js';
declare let L;

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
  // , '../../../src/assets/leaflet/leaflet.css'],
  // scripts: ['../../../src/assets/leaflet/leaflet.js']
})
export class RouteComponent implements OnInit {
  @ViewChild('datepicker') datepickerEl: ElementRef;

  constructor(private dashboardService: DashboardService, public geoService: GeoService) { }

  mapboxKey: string;
  userLocation: number[];
  map: any;

  ngOnInit() {
    this.dashboardService.getUserLocation()
    .then(location => {
      this.geoService.setMap(location)
      .then(map => {
        this.map = map;
        this.geoService.placeMarkers(map)
      });
    })
  }

  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    if (value >= 1000) {
      return Math.round(value / 1000);
    }
    return value;
  }

}
