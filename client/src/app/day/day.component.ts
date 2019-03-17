import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Weekday, Event, Bubble } from '../types';
import { DashboardService } from '../dashboard.service';
import { Chart } from 'chart.js';
import { getRenderedText } from '@angular/core/src/render3';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  @ViewChild('scheduleEl') scheduleEl: ElementRef;
  private sContext: CanvasRenderingContext2D;
  chart: any;
  @Input() day: Weekday;
  // @Input() notActive: boolean;

  scheduleData: Bubble[] = [];

  schedule: Event[];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.drawSchedule();
  }

  getClosestSuppliers() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.dashboardService.getClosestSuppliers(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.log('no geolocation fix: getting dummy values');
      this.dashboardService.getClosestSuppliers(40.826831, -74.560116);
    }
  }

  drawSchedule() {
    const canvas = this.scheduleEl.nativeElement;
    this.sContext = canvas.getContext( '2d' );

    const dict = {
      planting: 'rgba(115, 183, 0, 0.5)',
      plowing: 'rgba(183, 0, 0, 0.5)',
      spraying: 'rgba(1, 14, 186, 0.5)',
      leisure: 'rgba(183, 149, 0, 0.5)',
      veterinary: 'rgba(22, 124, 37, 0.5)',
      business: 'rgba(183, 76, 0, 0.5)',
      equipment: 'rgba(96, 7, 147, 0.5)'
    }

    let data = this.dashboardService.getBubbleData();

    let options = {
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: false
        }],
        yAxes: [{
          display: false
        }],
      },
      tooltips: {
        callbacks: {
           label: function(t, d) {
              return d.datasets[0].data[t.index].category;
           }
        }
      }
    }

		var chart = new Chart(this.sContext, {
			type: 'bubble',
			data: {
        datasets: [{
          data: data,
          backgroundColor: function(context) {
            var index = context.dataIndex;
            var value = context.dataset.data[index];
            return dict[value.category];
          }
        }]
      },
			options: options
		});
  }

}














// function drawGrid(currGrid) {
//   let canvasGrid = document.getElementById('grid');
//   let ctx = canvasGrid.getContext("2d");
//   canvasGrid.width = window.innerWidth;
//   canvasGrid.height = window.innerHeight;
//   // grid.rows = Math.floor(gol.height / (gol.cellSize + gol.cellSpace));
//   // grid.cols = Math.floor(gol.width / (gol.cellSize + gol.cellSpace)); 
//   // let size = 20;
//   let cellSize = 20;
//   let cellSpace = 1;
//   let colors = ['#d5f9cf', '#028436']
//   for(let row = 0; row < currGrid.length; row++) {
//     for(let col = 0; col < currGrid.length; col++) {
//       let rowOffset = cellSpace + row * (cellSize + cellSpace);
//       let colOffset = cellSpace + col * (cellSize + cellSpace);
//       ctx.lineWidth = 1;
//       ctx.strokeStyle = '#d6caf7';
//       ctx.fillStyle = colors[currGrid[row][col]];
//       ctx.fillRect(colOffset, rowOffset, cellSize, cellSize);
//       ctx.strokeRect(colOffset, rowOffset, cellSize, cellSize);
//     }
//   }
//   ctx.stroke();
// }
