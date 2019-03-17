import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
// import { Chart } from 'chart.js';
import { Today } from '../types'
// import { platformCoreDynamicTesting } from '@angular/platform-browser-dynamic/testing/src/platform_core_dynamic_testing';
// import { timeout } from 'q';
// import { createOptional } from '@angular/compiler/src/core';
// import { clearOverrides } from '@angular/core/src/view';
// import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.css']
})
export class WeekComponent implements OnInit {
  // @ViewChild(ChildComponent) childComponent: ChildComponent;
  // @ViewChild('contentEl') contentEl: ElementRef;
  // @ViewChild('daylightEl') daylightEl: ElementRef;
  // private context: CanvasRenderingContext2D;
  // chart: any;

  constructor(private dashboardService: DashboardService) { }

  // height = this.contentEl.height;
  // width = this.contentEl.width;
  active = 3;
  today: Today;
  currSunlight = 14.275;
  wkdays = [];
  daylight = [];
  // canHeight = '50';
  canWidth = '3450';

  ngOnInit() {
    // this.resizeCanvas();
    this.today = this.dashboardService.getDate();
    this.wkdays = this.dashboardService.getWeekdays(); 
    // this.dashboardService.getDaylight().then(light => {
    //   this.daylight = light;
    //   this.drawChart();
    // })
  }

  makeActive(i) {
    this.active = i;
  }

  setStyle(weather, sunrise, sunset) {
    const dict = {
      'clear': 'rgb(252, 241, 88, 0.1)',
      'cloudy': 'rgb(73, 82, 96, 0.1)',
      'precip': 'rgb(4, 94, 239, 0.1)',
    }
    
    let gradientStart = 'linear-gradient(to right, rgb(12, 6, 68, 0.1),'
    let index = 0;
    while(weather[index].end < sunrise) {
      index++;
    }
    let numSunrise = Math.round((sunrise / 24) * 100);
    let gradientNext = `${dict[weather[index].type]} ${numSunrise.toString()}%,`;
    gradientStart = gradientStart.concat(gradientNext);
    index++;
    while(index < weather.length && weather[index].start < sunset) {
      let color = dict[weather[index].type];
      let numStart = Math.round((weather[index].start / 24) * 100);
      let gradientNextS = `${dict[weather[index].type]} ${numStart.toString()}%,`;
      gradientStart = gradientStart.concat(gradientNextS);
      ++index;
    }
    let numSunset = Math.round((sunset / 24) * 100);
    let gradientEnd = `rgb(12, 6, 68, 0.1) ${numSunset.toString()}%)`
    let gradientFull = gradientStart.concat(gradientEnd);
    let styles = {
      'background-image': gradientFull,
    };
    return styles;
  }

  getDate() {
    this.today = this.dashboardService.getDate();
  }

  // if this takes too long, consider fetching schedule seperately and mapping it to weekdays
  getWeekdays() {
    this.wkdays = this.dashboardService.getWeekdays();
  }

}





// x is time, color is crop, y is:


// purchase calves, equipment
// vet visit
// cultivating
// planting
// bailing
// raking
// spraying
// combining
// that thing that seperates the chaff
// delivering 
