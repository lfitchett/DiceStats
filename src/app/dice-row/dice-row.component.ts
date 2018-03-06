import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from "events"
import { Dice } from "../../lib/dice"

@Component({
  selector: 'app-dice-row',
  templateUrl: './dice-row.component.html',
  styleUrls: ['./dice-row.component.css']
})
export class DiceRowComponent implements OnInit {
  @Input() diceString: string;
  // @Output() changedDiceString: EventEmitter<string> = new EventEmitter<string>();

  dice: Dice;
  diceStringShow: string;

  ngOnInit() {
    this.dice = Dice.Parse(this.diceString)
    this.diceStringShow = this.diceString;
    console.log(this.diceString)
  }

  public updateDie() {
    this.dice = Dice.Parse(this.diceString);
    this.diceStringShow = this.diceString;
  }

  public logDice() {
    console.log(this.dice);
  }
}
