import { Component } from '@angular/core';
import { Dice } from "../lib/dice"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test';
  diceString = "d6";

  dice = Dice.Parse(this.diceString);
  diceStringShow = this.diceString;

  constructor() {
    console.log(this.dice)
  }

  public updateDie() {
    this.dice = Dice.Parse(this.diceString);
    this.diceStringShow = this.diceString;
  }

  public logDice() {
    console.log(this.dice);
  }
}
