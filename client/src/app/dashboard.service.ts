// clean up this code to make sure what should be private is private

import { Injectable } from '@angular/core';
import { Alert, Buyer, Today, Weekday, Event, Bubble, Difference } from './types';
import { ALERTS, BUYERS, SCHEDULE, WEATHER_DATA, SUPPLIERS, DIFFERENCE } from '../mockdata';
import { MAPBOX_KEY } from '../environments/environment';
// import  "../src/assets/leaflet/leaflet.js";
declare let L;
// import * as Dotenv from 'dotenv';
// Dotenv.config({ path: '../../../.env' });

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const wkdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  getAlerts(): Alert[] {
    return ALERTS;
  }

  getBuyers(): Buyer[] {
    return BUYERS;
  }

  getTopBuyers(): Buyer[] {
    return BUYERS.sort((a, b) => b.amount - a.amount).slice(0, 10);
  }

  getMonths(): String[] {
    return months;
  }

  getDifference(): Difference[] {
    return DIFFERENCE;
  }

  getWeekdays(): Weekday[] {
    const today = new Date();
    const currWkDay = today.getDay();
    let currWeek = [];
    let index = currWkDay;
    while(currWeek.length < 7) {
      currWeek.push(wkdays[index]);
      index = (++index % 7);
    }

    return currWeek.map((day, i) => {
      var d = new Date();
      d.setDate(d.getDate() + i - 3);

      function isLeapYear(date) {
          var year = date.getFullYear();
          if((year & 3) != 0) return false;
          return ((year % 100) != 0 || (year % 400) == 0);
      };
      
      function getDOY(date) {
          var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
          var mn = date.getMonth();
          var dn = date.getDate();
          var dayOfYear = dayCount[mn] + dn;
          if(mn > 1 && isLeapYear(date)) dayOfYear++;
          return dayOfYear;
      };

      function getWeather(date) {
        return WEATHER_DATA;
      }

      return {
        fullDate: d,
        dayOfYear: getDOY(d),
        wkdayI: (currWkDay + i + 4) % 7,
        wkday: day,
        day: d.getDate(),
        month: d.getMonth(),
        year: d.getFullYear(),
        sunrise: this.getSunrise(),
        sunset: this.getSunset(),
        weather: getWeather(d),
        schedule: this.getSchedule()
      }
    });
  }

  getDate(): Today {
    let today = new Date();
    let monthI = today.getMonth() - 1
    return {
      day: today.getDate(),
      monthI: monthI,
      month: months[monthI],
      year: today.getFullYear()
    }
  }

  private getSunrise() {
    return 6.5;
  }

  private getSunset() {
    return 19;
  }

  convertScheduleToBubbleData(schedule: Event[]): Bubble[] {
    return schedule.map(event => {
      let bubble: Bubble = { x: undefined, y: undefined, r: undefined, category: undefined };
      bubble.x = event.distance;
      bubble.y = event.start_hr + ((event.end_hr - event.start_hr) / 2);
      bubble.r = (event.end_hr - event.start_hr) / 2;
      bubble.category = event.category;
      return bubble;
    });
  }

  getBubbleData() {
    return this.convertScheduleToBubbleData(this.getSchedule());
  }

  getUserLocation(): Promise<number[]> {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition(function(position) {
          navigator.geolocation.getCurrentPosition(position => {
            resolve([position.coords.latitude, position.coords.longitude]);
          });
        },
        function(error) {
          console.log('no geolocation fix: getting dummy values');
          resolve([41.826831, -74.560116]);
        });
      } else {
        console.log('no geolocation fix: getting dummy values');
        resolve([41.826831, -74.560116]);
      }
    })
  }

  // amend getDaylight to give day's sunrise and sunset in the above two formulas
  getDaylight(): Promise<number[]> {
    return new Promise(function(resolve, reject) {

      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let hrsPerMonth = [];
          console.log('position: ', position)
          for(let day = 15; day < 365; day += 30) {
            hrsPerMonth.push(calcDaylight(position.coords.latitude, day))
          }
          console.log('hrsPerMonth: ', hrsPerMonth)
          resolve(hrsPerMonth);
        });
      } else {
        console.log('no geolocation fix: getting dummy values');
        // return dummy data for Washington, D.C.
        resolve([9.875, 10.775, 11.95, 13.225000000000001, 14.275, 14.775, 14.525, 13.625, 12.4, 11.175, 10.075, 9.575]);
      }
  
      function calcDaylight(lat: number, day: number) {
        let p = Math.asin(.39795 * Math.cos(.2163108 + 2 * Math.atan(.9671396 * Math.tan(.00860 * (day - 186)))));
        let numerator = Math.sin(0.8333 * Math.PI / 180) + Math.sin(lat * Math.PI / 180) * Math.sin(p);
        let denominator = Math.cos(lat * Math.PI / 180) * Math.cos(p); 
        let d = 24 - (24 / Math.PI) * Math.acos(numerator / denominator);
        return d;
      }

      
    })

  }

  // 24 hrs wide
  // n activities high

  private getSchedule() {
    return SCHEDULE;
  }

  getClosestSuppliers(lat: number, lng: number) {
    return SUPPLIERS.map(supplier => supplier.distance = this.calcDistance(lat, lng, supplier.lat, supplier.lng, true));
  }

  degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  distanceInKmBetweenEarthCoordinates(lat1: number, lng1: number, lat2: number, lng2: number) {
    var earthRadiusKm = 6371;
    var dLat = this.degreesToRadians(lat2-lat1);
    var dLng = this.degreesToRadians(lng2-lng1);
    lat1 = this.degreesToRadians(lat1);
    lat2 = this.degreesToRadians(lat2);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLng/2) * Math.sin(dLng/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return earthRadiusKm * c;
  }

  calcDistance(lat1: number, lng1: number, lat2: number, lng2: number, metric: boolean) {
    if(metric) {
      // calculate kilometers
      return this.distanceInKmBetweenEarthCoordinates(lat1, lng1, lat2, lng2);
    } else {
      // calculate miles
      console.log('no formula to calculate miles yet')
    }
    
  }

  getMapboxKey(): string {
    return MAPBOX_KEY;
    // return process.env.MAPBOX_KEY;
  }



}







// let today = new Date();
// let month = today.getMonth();
// let day = today.getDate();
// let dayOfYear = daysPerMonth.slice(0, month).reduce((a, b) => a + b) + day;







// D = daylength
// L = latitude
// J = day of the year  

// P = asin[.39795*cos(.2163108 + 2*atan{.9671396*tan[.00860(J-186)]})]

//                        _                                         _
//                       / sin(0.8333*pi/180) + sin(L*pi/180)*sin(P) \
// D = 24 - (24/pi)*acos{  -----------------------------------------  }
//                       \_          cos(L*pi/180)*cos(P)           _/












// https://codepen.io/gcorsiglia/pen/mvwrBg
// let today = new Date();
// let currentMonth = today.getMonth();
// let currentYear = today.getFullYear();

// const months = [
// 	"Jan",
// 	"Feb",
// 	"Mar",
// 	"Apr",
// 	"May",
// 	"Jun",
// 	"Jul",
// 	"Aug",
// 	"Sep",
// 	"Oct",
// 	"Nov",
// 	"Dec"
// ];

// const dispMonthAndYear = document.getElementById("monthAndYear");
// const next = document.getElementById("next");
// const prev = document.getElementById("prev");

// // Start by displaying today's date in header
// showCalendar(currentMonth, currentYear);

// // Listen for next and previous clicks to change calendar data
// next.addEventListener("click", function() {
// 	currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
// 	currentMonth = (currentMonth + 1) % 12;
// 	showCalendar(currentMonth, currentYear);
// });

// prev.addEventListener("click", function() {
// 	currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
// 	currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
// 	showCalendar(currentMonth, currentYear);
// });

// function showCalendar(month, year) {
// 	// Update calendar header
// 	dispMonthAndYear.innerText = `${months[month]}  ${year}`;

// 	let firstDay = new Date(year, month).getDay();
// 	let daysInMonth = 32 - new Date(year, month, 32).getDate();
// 	const calBody = document.getElementById("calBody");

// 	calBody.innerHTML = "";

// 	let date = 1;
// 	// Create week rows
// 	for (let i = 0; i < 6; i++) {
// 		let row = document.createElement("tr");

// 		// Fill rows with days
// 		for (let d = 0; d < 7; d++) {
// 			// If month starts mid-week, leave previous days blank
// 			if (i === 0 && d < firstDay) {
// 				let cell = document.createElement("td");
// 				row.appendChild(cell);
// 			} else if (date > daysInMonth) {
// 				// Stop loop if date is greater than days in month
// 				break;
// 			} else {
// 				let cell = document.createElement("td");
// 				let cellText = document.createTextNode(date);

// 				// Check for current date and apply special class
// 				if (
// 					date === today.getDate() &&
// 					year === today.getFullYear() &&
// 					month === today.getMonth()
// 				) {
// 					cell.classList.add("current-day");
// 				}

// 				cell.appendChild(cellText);
// 				row.appendChild(cell);
// 				date++;
// 			}
// 		}

// 		// Add each row week to calendar
// 		calBody.appendChild(row);
// 	}
// }