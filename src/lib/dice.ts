function range(n: number): number[] {
    return [...Array(n).keys()];
}
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
        let va = typeof a == 'number' ? Dice.Scaler(a).values : a.values;
        let vb = typeof b == 'number' ? Dice.Scaler(b).values : b.values;

        va.forEach((probA, valA) => {
            vb.forEach((probB, valB) => {
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
}

class DiceStats {
    private _max: number = 0;
    private _min: number = Infinity;
    private _mean: number = 0;
    private _std: number = 0;

    public get max() { return this._max }
    public get min() { return this._min }
    public get mean() { return this._mean }
    public get std() { return this._std }

    constructor(values: Map<number, number>) {
        this._max = Math.max(...values.keys())
        this._min = Math.min(...values.keys())

        values.forEach((prob, val) => this._mean += val * prob)
        values.forEach((prob, val) => this._std += (val - this._mean) * (val - this._mean) * prob)
        this._std = Math.sqrt(this._std)
    };
}

function d(n: number, t: number = 1): Dice {
    if (t <= 1) {
        return new Dice(n)
    }
    return (d(n, t - 1).add(d(n)))
}

const precedence = {
    '++': 5,
    '--': 5,
    '>': 4,
    '<': 4,
    '*': 3,
    '/': 3,
    '+': 2,
    '-': 2,
}
const operations = {
    '++': (a: Dice, b: Dice) => a.largerOf(b),
    '--': (a: Dice, b: Dice) => a.smallerOf(b),
    '>': (a: Dice, b: Dice) => a.greaterThan(b),
    '<': (a: Dice, b: Dice) => a.lessThan(b),
    '*': (a: Dice, b: Dice) => a.mult(b),
    '+': (a: Dice, b: Dice) => a.add(b),
    '-': (a: Dice, b: Dice) => a.sub(b),
}

function replaceAll(s: string, search: string, replacement: string): string {
    return s.split(search).join(replacement);
}

function parseNonOperator(val: string): Dice {
    if (val.includes('d')) {
        let [t, n] = val.split('d');
        return d(+n, +t)
    }
    return Dice.Scaler(+val);
}

function parseDice(s: string): Dice {
    s = replaceAll(s, "(", " ( ");
    s = replaceAll(s, ")", " ) ");
    for (let op in operations) {
        s = replaceAll(s, op, ` ${op} `);
    }
    s = replaceAll(s, "+  +", "++");
    s = replaceAll(s, "-  -", "--");

    s = s.replace(/\s{2,}/g, ' ');
    s = s.trim();

    let arr: Array<string | Dice> = shuntingYard(s);

    if (arr.length == 1) {
        return parseNonOperator(arr[0] as string);
    }

    while (arr.length > 1) {
        let i = 0;
        while (!precedence[arr[i] as string]) { i++ }

        let [a, b, op] = arr.splice(i - 2, 3)
        if (typeof a == 'string') {
            a = parseNonOperator(a);
        }
        if (typeof b == 'string') {
            b = parseNonOperator(b);
        }

        let c: Dice = operations[op as string](a, b)
        arr.splice(i - 2, 0, c);
    }

    return arr[0] as Dice;
}

function shuntingYard(s: string): string[] {
    let output: string[] = [];
    let operators: string[] = [];

    let prevOp = () => !operators.length ? 0 : operators[operators.length - 1]
    for (let x of s.split(" ")) {
        let op = precedence[x];
        if (op) {
            while (op <= precedence[prevOp()]) {
                output.push(operators.pop());
            }

            operators.push(x);
        } else if (x == '(') {
            operators.push(x);
        } else if (x == ')') {
            while (prevOp() != '(') {
                output.push(operators.pop());
            }
            operators.pop();
        } else {
            output.push(x);
        }
    }
    while (operators.length) {
        output.push(operators.pop());
    }

    return output;
}