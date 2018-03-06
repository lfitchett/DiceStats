import { Component } from '@angular/core';
import * as _ from "lodash";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = _.range(5).map((i) => i + 1).toString();

  diceRows = _.range(5).map((i) => "d6")
}
