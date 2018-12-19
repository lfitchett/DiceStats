import { Dice } from "./dice_utils/Dice";

let test = Dice.Parse("1d6");

let arr = Array.from(test.roll(15));
console.log(arr);