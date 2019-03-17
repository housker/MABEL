import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.css']
})
export class ComparisonComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasEl') canvasEl: ElementRef;
    private context: CanvasRenderingContext2D;
    chart: any;

  chartInfo = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.drawChart();
  }

  drawChart() {
    const canvas = this.canvasEl.nativeElement;
    this.context = canvas.getContext( '2d' );
    
    this.chart = new Chart(this.context, {
      type: 'line',
      data: {
        labels: this.dashboardService.getMonths(),
        datasets: [{
            label: 'Your expenses',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)'
            ],
            borderWidth: 1
          },
          {
            label: 'Pool avg expenses',
            data: [2, 9, 13, 6, 21, 13],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1
        },
        {
          label: 'Your yield',
          data: [20, 18, 30, 15, 13, 29],
          backgroundColor: [
            'rgba(75, 192, 192, 0.2)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)'
          ],
          borderWidth: 1
        },
        {
          label: 'Pool avg yield',
          data: [22, 9, 12, 17, 19, 31],
          backgroundColor: [
            'rgba(255, 206, 86, 0.2)'
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)'
          ],
          borderWidth: 1
        },
        ]
      },
      options: {
        responsive: true,
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
    });
  }

}
