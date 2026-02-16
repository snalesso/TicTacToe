
export class Vector2D {
  constructor(
    public readonly x: number,
    public readonly y: number
  ) { }

  public equals(coord: Vector2D): boolean;
  public equals(x: number, y: number): boolean;
  public equals(coordOrX: Vector2D | number, y?: number): boolean {
    if (coordOrX instanceof Vector2D)
      return this.x === coordOrX.x && this.y === coordOrX.y;
    return this.equals(new Vector2D(coordOrX, y ?? coordOrX));
  }

  public toString() { return `(${this.x},${this.y})`; }
}

export function createMatrix2d<T>(width: number, height: number, calcValue: (coord: Vector2D) => T): T[][] {
  const cols = Array(width).fill(undefined).map((_, x) => {
    const rows = Array(height).fill(undefined).map((_, y) => {
      const cell = calcValue(new Vector2D(x, y));
      return cell;
    });
    return rows;
  });
  return cols;
}

export class Matrix2d<T> {

  public readonly width: number;
  public readonly height: number;
  private readonly _cols: Array<Array<T>>;
  // public get cells(): ReadonlyArray<ReadonlyArray<T>> { return this._cells; }

  constructor(
    width: number,
    height: number,
    calcValue: (x: number, y: number) => T) {

    this.width = width;
    this.height = height;
    this._cols = createMatrix2d(this.width, this.height, p => calcValue(p.x, p.y));
  }

  public getCol(index: number): ReadonlyArray<T> { return this._cols[index]; }
  public getCols(): ReadonlyArray<ReadonlyArray<T>> { return this._cols; }

  public getRow(index: number): ReadonlyArray<T> { return this._cols.map(c => c[index]); }
  public getRows(): ReadonlyArray<ReadonlyArray<T>> { return Array(this.height).fill(undefined).map((_, ri) => this._cols.map(c => c[ri])); }

  public getValue(x: number, y: number): T { return this._cols[x][y]; }
  public setValue(x: number, y: number, value: T): void { this._cols[x][y] = value; }

  public with(x: number, y: number, value: T): Matrix2d<T> {
    return new Matrix2d(this.width, this.height, (ix, iy) => {
      if (ix !== x || iy !== y)
        return this.getValue(ix, iy);
      return value;
    });
  }
}