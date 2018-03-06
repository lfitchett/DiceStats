import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ChartModule } from 'angular-highcharts';

import { AppComponent } from './app.component';
import { StatsChartComponent } from './stats-chart/stats-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    StatsChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
