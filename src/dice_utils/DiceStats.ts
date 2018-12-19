export class DiceStats {
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