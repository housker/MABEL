import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AlertComponent } from './alert/alert.component';
import { WeekComponent } from './week/week.component';
import { RequestsComponent } from './requests/requests.component';
import { BuyersComponent } from './buyers/buyers.component';
import { ComparisonComponent } from './comparison/comparison.component';
import { ForecastComponent } from './forecast/forecast.component';
import { RouteComponent } from './route/route.component';
import { DayComponent } from './day/day.component';
import { MatFormFieldModule, MatTableModule, MatSliderModule } from '@angular/material';
import { SatDatepickerModule } from 'saturn-datepicker';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatFormFieldModule,
        MatTableModule,
        SatDatepickerModule,
        MatSliderModule
      ],
      declarations: [
        AppComponent,
        NavComponent,
        AlertComponent,
        WeekComponent,
        RequestsComponent,
        BuyersComponent,
        ComparisonComponent,
        ForecastComponent,
        RouteComponent,
        DayComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Mabel'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Mabel');
  });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to client!');
  // });
});
