import { Dice } from "./Dice";

export function parseDice(s: string): Dice {
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