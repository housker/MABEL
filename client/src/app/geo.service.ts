import { Injectable, ViewChild, ElementRef } from '@angular/core';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker'; 
import { DashboardService } from './dashboard.service';
import { SUPPLIERS, ALLCOMMODITIES, COLORMAP } from '../mockdata';
// import polygon from '@turf/area';
// import area from '@turf/area';
import * as turf from '@turf/turf'
import { FormControl } from '@angular/forms';
import { filterQueryId } from '@angular/core/src/view/util';
declare let L;

@Injectable({
  providedIn: 'root'
})

export class GeoService {
  @ViewChild('popupEl') popupEl: ElementRef;
  @ViewChild('datepicker') datepickerEl: ElementRef;

  constructor(private dashboardService: DashboardService) { }

  tool = 'none';
  date: any;
  currPlot = [];
  currPolygon: any;
  contains = false;
  map: any;

  round(num) {
    let rounded = Math.round( num * 100) / 100;
    console.log('rounded: ', rounded)
    return rounded;
  }

  erase() {
    this.date = undefined;
    this.tool = this.tool === 'erase' ? 'none' : 'erase';
  }

  addMarker() {
    this.date = undefined;
    this.tool = this.tool === 'marker' ? 'none' : 'marker';
  }

  plotCrops() {
    this.date = undefined;
    this.tool = this.tool === 'plotCrops' ? 'none' : 'plotCrops';
  }

  plotLivestock() {
    this.date = undefined;
    this.tool = this.tool === 'plotLivestock' ? 'none' : 'plotLivestock';
  }

  plotOther() {
    this.date = undefined;
    this.tool = this.tool === 'plotOther' ? 'none' : 'plotOther';
  }

  adjustRoute() {
    this.date = undefined;
    this.tool = this.tool === 'route' ? 'none' : 'route';
  }

  placeMarkers(map) {
    SUPPLIERS.forEach(supplier => new L.marker([supplier.lat, supplier.lng]).addTo(map).on('mouseover', this.onMarkerMouseover));
  }

  onMarkerMouseover() {
    console.log('marker has been moused')
  }

  withinRange(a, b) {
    return a <= b + 0.001 && a >= b - 0.001
  }

  getCenter() {
    let n = this.currPlot.length;
    let sums = this.currPlot.reduce((a, b) => [a[0] + b[0], a[1] + b[1]], [0, 0])
    return [sums[0] / n, sums[1] / n];
  }

  // rad(num) {
  //   return num * (Math.PI / 180);
  // }

//   getArea(coords: any) {
//     let total = 0;
//     if (coords && coords.length > 0) {
//         total += Math.abs(this.ringArea(coords[0]));
//         for (let i = 1; i < coords.length; i++) {
//             total -= Math.abs(this.ringArea(coords[i]));
//         }
//     }
//     return total;
// }

//   ringArea(coords: number[][]) {
//     coords = coords.slice(0, -1); 
//     console.log('coords:', coords) 
//     const RADIUS = 6378137;
//     let p1, p2, p3, lowerIndex, middleIndex, upperIndex, i;
//     let total = 0;
//     const coordsLength = coords.length;

//     if (coordsLength > 2) {
//         for (i = 0; i < coordsLength; i++) {
//             if (i === coordsLength - 2) { // i = N-2
//                 lowerIndex = coordsLength - 2;
//                 middleIndex = coordsLength - 1;
//                 upperIndex = 0;
//             } else if (i === coordsLength - 1) { // i = N-1
//                 lowerIndex = coordsLength - 1;
//                 middleIndex = 0;
//                 upperIndex = 1;
//             } else { // i = 0 to N-3
//                 lowerIndex = i;
//                 middleIndex = i + 1;
//                 upperIndex = i + 2;
//             }
//             p1 = coords[lowerIndex];
//             p2 = coords[middleIndex];
//             p3 = coords[upperIndex];
//             total += (this.rad(p3[0]) - this.rad(p1[0])) * Math.sin(this.rad(p2[1]));
//         }

//         total = total * RADIUS * RADIUS / 2;
//     }
//     // acres
//     console.log('total in meters: ', Math.abs(total));
//     return Math.abs(total / 4046.8564);
// }



  assignZone(e) {
    const designation = e.target.innerText;
    this.currPolygon.options.color = COLORMAP[designation.toUpperCase()];
    this.currPolygon.remove();
    this.currPolygon.addTo(this.map);
    this.map.closePopup();
    this.currPolygon.bindTooltip(`${designation} 
    ${this.date.begin.toLocaleString('en-us', { year: '2-digit', month: 'numeric' })} - ${this.date.end.toLocaleString('en-us', { year: '2-digit', month: 'numeric' })}`);
    this.addPlotRecord(this.currPlot, this.date, designation);
    this.currPlot = []; 
  }

  addPlotRecord(geocoordinates, timeframe, designation) {
    //send the data to the back end to be stored in user's info
    console.log('geocoordinates: ', geocoordinates);
    console.log('timeframe: ', timeframe);
    console.log('designation: ', designation);
  }


  populateOptions(arr, suggestions, parentEl, filterBy) {
    arr = arr.map(x => x[0].toUpperCase().concat(x.slice(1).toLowerCase()));
    suggestions = suggestions.map(x => x[0].toUpperCase().concat(x.slice(1).toLowerCase()));
    arr = arr.filter(x => filterBy ? x.toLowerCase().includes(filterBy.value.toLowerCase()) : x);
    while (parentEl.firstChild) {
      parentEl.removeChild(parentEl.firstChild);
    }
    for(let el of arr) {
      let dropdownEl = document.createElement('li')
      dropdownEl.innerText = el
      dropdownEl.addEventListener('click', this.assignZone.bind(this));
      parentEl.appendChild(dropdownEl);
    }
  }

  createDropdown() {
      let location = this.getCenter();
      let wrapper = document.createElement('div');
      let inputEl = document.createElement('input');
      inputEl.id = 'ddinput'
      inputEl.style.width = '100%';
      inputEl.placeholder = 'Type to Filter';
      inputEl.type = 'text';
      inputEl.autocomplete = 'off';
      wrapper.appendChild(inputEl);
      let listEl = document.createElement('ul');
      listEl.style.cssText = "position: relative; background-color: rgba(255, 255, 255, 0.6); z-index: 500; max-height: 150px; overflow: auto; padding: 0.4rem; width: 95%;";
      wrapper.appendChild(listEl);
      inputEl.addEventListener('input', (e) => this.populateOptions(ALLCOMMODITIES, ALLCOMMODITIES, listEl, e.target));
 

      switch(this.tool) {
        case 'plotCrops':
          // let carr = ["volvo", "saab", "mercedes", "wow", "audi", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
          this.populateOptions(ALLCOMMODITIES, ALLCOMMODITIES, listEl, '')
          break;
        case 'plotLivestock':
          // let larr = ["volvo", "saab", "mercedes", "wow", "audi", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
          // for(let el of larr) {
          //   let dropdownEl = document.createElement('option')
          //   dropdownEl.innerText = el
          //   selectEl.appendChild(dropdownEl);
          // }
          break;
        case 'plotOther':
          // let oarr = ["volvo", "saab", "mercedes", "wow", "audi", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
          // for(let el of oarr) {
          //   let dropdownEl = document.createElement('option')
          //   dropdownEl.innerText = el
          //   selectEl.appendChild(dropdownEl);
          // }
          break;
        default:
          console.log('unable to populate popup menu')
      }
      L.popup({ maxWidth: 200, minWidth: 200 })
      .setLatLng(location)
      .setContent(wrapper)
      .openOn(this.map);
  }

  mapDate(e) {
    this.date = e.value;
  }

  plot(e) {
    this.contains = this.currPlot.length > 2 && this.currPlot.reduce((a, b) => {
      return a || this.withinRange(b[0], e.latlng.lat) && this.withinRange(b[1], e.latlng.lng)
    }, false);
    this.currPlot.push([e.latlng.lat, e.latlng.lng]);
    if(this.contains) {
      this.currPolygon = L.polygon(this.currPlot, { color: 'red', weight: 1 });
      this.createDropdown.call(this);
      this.currPolygon.addTo(this.map);
      this.currPlot[this.currPlot.length - 1] = this.currPlot[0]
      var polygon = turf.polygon([this.currPlot]);
      var area = turf.area(polygon);
      console.log('area in acres: ', area / 4046.8564)
    }
    if(this.currPlot.length === 1) {
      L.circleMarker(this.currPlot[0], { color: 'red', radius: 1 }).addTo(this.map);
    }
    L.polyline(this.currPlot, { color: 'red', weight: 1 }).addTo(this.map);
  }

  onMapClick(e) {
    // console.log('this.date.value: ', this.date.value)
    if(this.date) {
      switch(this.tool) {
        case 'marker':
          new L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map).on('mouseover', this.onMarkerMouseover)
          break;
        case 'plotCrops':
          // this.datepickerEl.setAttribute("style", "color:red; border: 1px solid blue;");
          this.plot(e);
          break;
        case 'plotLivestock':
          this.plot(e);
          break;
        case 'plotOther':
          this.plot(e);
          break;
        case 'route':
          break;
        default:
          this.currPlot = [];
          console.log(e.latlng.lat, e.latlng.lng)
      }
    }
  }

  setMap(location) {
    return new Promise((resolve, reject) => {
      var map = L.map('mapid').setView(location, 10);
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: this.dashboardService.getMapboxKey()
      }).addTo(map);
      L.control.scale().addTo(map);
      map.on('click', this.onMapClick.bind(this));
      this.map = map;
      resolve(map);
    }) 
  }

  placeZones() {
    //take data from backend, loop through, and place polygone with correct color
    let zones = [
      { bounds: [[42.877362, -75.408829], [42.874362, -75.503829], [42.977362, -75.408829]], category: "corn", timeframe: ["DATE START", "DATE STOP"] },
      { bounds: [[42.877362, -75.408829], [42.874362, -75.503829], [42.977362, -75.408829]], category: "beans", timeframe: ["DATE START", "DATE STOP"] },
      { bounds: [[42.877362, -75.408829], [42.874362, -75.503829], [42.977362, -75.408829]], category: "potatoes", timeframe: ["DATE START", "DATE STOP"] }
    ]
    for(let zone of zones) {
      L.polygon(zone.bounds, {color: COLORMAP[zone.category], weight: 1}).bindTooltip(zone.category).addTo(this.map);
    }
  }

}
