import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Dice } from '../../lib/dice';

@Component({
  selector: 'app-stats-chart',
  templateUrl: './stats-chart.component.html',
  styleUrls: ['./stats-chart.component.css']
})
export class StatsChartComponent implements OnInit {
  private _dice: Dice;
  chart: Chart;

  @Input() name: string;

  @Input()
  set dice(d: Dice) {
    this._dice = d;
    this.setChart();
  }
  get dice() { return this._dice }


  public get points(): Array<[number, number]> {
    return [...this._dice.values.entries()]
  }

  ngOnInit() {
    this.setChart();
  }

  private setChart() {
    this.chart = new Chart({
      chart: {
        type: 'scatter'
      },
      title: {
        text: `Probability for ${this.name}`
      },
      credits: {
        enabled: false
      },
      series: [{
        name: this.name,
        data: this.points,
      }]
    });
  }

}
