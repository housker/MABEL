import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSortModule } from '@angular/material/sort';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeekComponent } from './week/week.component';
import { AlertComponent } from './alert/alert.component';
import { RequestsComponent } from './requests/requests.component';
import { BuyersComponent } from './buyers/buyers.component';
import { ForecastComponent } from './forecast/forecast.component';
import { ComparisonComponent } from './comparison/comparison.component';
import { NavComponent } from './nav/nav.component';
import { RouteComponent } from './route/route.component';
import { NavDirective } from './nav.directive';
import { ModalDirective } from './modal.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DEFAULT_OPTIONS, MatTableModule } from '@angular/material';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatSliderModule } from "@angular/material";
import { ModalComponent } from './modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DayComponent } from './day/day.component';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';

@NgModule({
  declarations: [
    AppComponent,
    WeekComponent,
    AlertComponent,
    RequestsComponent,
    BuyersComponent,
    ForecastComponent,
    ComparisonComponent,
    NavComponent,
    RouteComponent,
    NavDirective,
    ModalDirective,
    ModalComponent,
    DayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    SatDatepickerModule,
    SatNativeDateModule,
    MatSliderModule,
    MatSortModule,
    MatTableModule
  ],
  entryComponents: [
    ModalComponent
  ],
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
