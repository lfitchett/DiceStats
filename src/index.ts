import { Dice } from "./dice_utils/Dice";
import * as minimist from "minimist";

let args = minimist(process.argv.slice(2), {
    alias: {
        r: 'roll',
    }
});
let input = `${args["_"]}`;

console.log(`Dice: ${input}`);
let dice = Dice.Parse(input);

if (args['r']) {
    console.log(`Result of ${args['r']} rolls: ${Array.from(dice.roll(args['r'])).toString()}`);
} else {
    console.log("Stats");
    dice.print();
    console.log();
}
