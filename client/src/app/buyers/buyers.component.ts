import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
// import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {MatSort, MatTableDataSource} from '@angular/material';
import { Buyer } from '../types';
import { DashboardService } from '../dashboard.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-buyers',
  templateUrl: './buyers.component.html',
  styleUrls: ['./buyers.component.css']
})
export class BuyersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'amount', 'date'];
  dataSource = new MatTableDataSource(this.dashboardService.getBuyers());
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dashboardService: DashboardService, public dialog: MatDialog) { }

  buyers: Buyer[];
  areBuyers = true;

  ngOnInit() {
    this.getBuyers();
    this.dataSource.sort = this.sort;
  }

  getBuyers() {
    this.buyers = this.dashboardService.getBuyers();
  }

  toggleBuyers() {
    console.log('must toggle buyers')
    this.areBuyers = this.areBuyers ? false : true;
  }

  openModal(buyer) {
    const dialogRef = this.dialog.open(ModalComponent, 
      { data: 
        { name: buyer.name }
    });
  }

}
