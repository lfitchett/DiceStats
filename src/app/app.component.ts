import { Component } from '@angular/core';
import * as _ from "lodash";
import { Dice } from "../lib/dice"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = _.range(5).map((i) => i + 1).toString();

  diceRows = _.range(5).map((i) => new DiceRow())
  selectedDiceRow: number;

  constructor() {
    // this.onDiceChange();
  }

  public saveDice() {
    console.log(this.diceRows);
  }
  public addRow(){
    this.diceRows.push(new DiceRow())
  }
}

class DiceRow {
  diceString: string;

  dice: Dice;
  diceStringShow: string;

  constructor(s: string = 'd6') {
    this.diceString = s;
    this.updateDie();
  }

  public updateDie() {
    console.log(this.diceString)
    this.dice = Dice.Parse(this.diceString);
    this.diceStringShow = this.diceString;
  }

  public logDice() {
    console.log(this.dice)
  }
}