import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {
  displayedColumns: string[] = ['name', 'predicted', 'actual', 'difference'];
  dataSource = new MatTableDataSource(this.dashboardService.getDifference());
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

}
