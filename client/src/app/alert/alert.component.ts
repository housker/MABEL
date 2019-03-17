import { Component, OnInit } from '@angular/core';
import { Alert } from '../types';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alerts: Alert[]

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() { 
    this.getAlerts(); 
  }

  getAlerts(): void {
    this.alerts = this.dashboardService.getAlerts();
  }

}
