import { DiceStats } from "./DiceStats";
import { parseDice } from "./parseDice";

type Value = Dice | number;

export class Dice {
    public values = new Map<number, number>();
    private _stats: DiceStats;

    public get stats() {
        if (!this._stats)
            this._stats = new DiceStats(this.values);
        return this._stats
    }

    constructor(n?: number) {
        if (n) {
            range(n).forEach(i => this.values.set(i + 1, 1 / n))
        } else if (n == 0) {
            this.values.set(0, 1)
        }
    }

    public static Scaler(n: number): Dice {
        let result = new Dice();
        result.values = new Map<number, number>([[n, 1]])
        return result;
    }

    public static Parse(s: string) {
        return parseDice(s);
    }

    public * roll(n: number = 1) {
        for (let i = 0; i < n; i++) {
            let target = Math.random();
            let iterator = this.values.entries();
            let result, prob: number

            while (target > 0) {
                [result, prob] = iterator.next().value;
                target -= prob;
            }
            yield result;
        }
    }

    public add(d: Value) {
        return this.apply(this, d, (x, y) => x + y)
    }

    public sub(d: Value) {
        return this.apply(this, d, (x, y) => x - y)
    }

    public mult(d: Value) {
        return this.apply(this, d, (x, y) => x * y)
    }

    public largerOf(d: Value) {
        return this.apply(this, d, Math.max)
    }

    public smallerOf(d: Value) {
        return this.apply(this, d, Math.min)
    }

    public greaterThan(n: Value) {
        return this.apply(this, n, (x, y) => x > y ? 1 : 0)
    }

    public lessThan(n: Value) {
        return this.apply(this, n, (x, y) => x < y ? 1 : 0)
    }

    private apply(a: Value, b: Value, f: (x: number, y: number) => number): Dice {
        let result = new Dice();
        let dieA = typeof a == 'number' ? Dice.Scaler(a).values : a.values;
        let dieB = typeof b == 'number' ? Dice.Scaler(b).values : b.values;

        dieA.forEach((probA, valA) => {
            dieB.forEach((probB, valB) => {
                let val = f(valA, valB);
                result.values.set(val, (result.values.get(val) || 0) + probA * probB)
            });
        });
        return result;
    }

    public print() {
        console.log(this.values)
        console.log(this.stats)
    }

    public toString(): string {
        return JSON.stringify(this.values);
    }
}

function range(n: number): number[] {
    return [...Array(n).keys()];
}