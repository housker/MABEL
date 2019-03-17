import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Buyer } from '../types';
import { DashboardService } from '../dashboard.service';
import { ModalComponent } from '../modal/modal.component';

// @NgModule({
//   declarations: [ ModalComponent ]
// })

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  @ViewChild('toggleEl') toggleEl: ElementRef;

  constructor(private dashboardService: DashboardService, public dialog: MatDialog) { }

  areBids = true;

  topTen: Buyer[];

  ngOnInit() {
    this.getTopBuyers();
  }

  getTopBuyers() {
    this.topTen = this.dashboardService.getTopBuyers();
  }

  toggleRequests() {
    this.areBids = this.areBids ? false : true;
    console.log('must toggle requests')
  }

  openModal(buyer) {
    const dialogRef = this.dialog.open(ModalComponent, 
      { data: 
        { name: buyer.name }
    });
  }






}
