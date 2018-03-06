import { Component } from '@angular/core';
import { Dice } from "../lib/dice"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test';
  dice = Dice.Parse("d6")
  constructor() {
    console.log(this.dice)
  }

  public updateDie(s: string) {
    this.dice = Dice.Parse(s);
  }
}
