export class DiceStats {
    public max: number = 0;
    public min: number = Infinity;
    public mean: number = 0;
    public std: number = 0;

    constructor(values: Map<number, number>) {
        this.max = Math.max(...values.keys())
        this.min = Math.min(...values.keys())

        values.forEach((prob, val) => this.mean += val * prob)
        values.forEach((prob, val) => this.std += (val - this.mean) * (val - this.mean) * prob)
        this.std = Math.sqrt(this.std)
    };
}