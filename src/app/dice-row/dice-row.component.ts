import { Component, OnInit } from '@angular/core';
import { Dice } from "../../lib/dice"

@Component({
  selector: 'app-dice-row',
  templateUrl: './dice-row.component.html',
  styleUrls: ['./dice-row.component.css']
})
export class DiceRowComponent implements OnInit {
  diceString = "d6";

  dice = Dice.Parse(this.diceString);
  diceStringShow = this.diceString;

  ngOnInit() {
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
