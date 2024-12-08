export class Rectangle {
  constructor(
    public readonly width: number,
    public readonly height: number) {
  }

  public contains(point: Vector2D): boolean {
    return point.x >= 0 && point.y >= 0 && this.width > point.x && this.height > point.y;
  }
}

export class Square extends Rectangle {
  constructor(sideLength: number) {
    super(sideLength, sideLength);
  }
}

export class Line {

  public readonly points: readonly Vector2D[];

  constructor(points: Iterable<Vector2D>) {
    this.points = [...points];
  }

  public includes(point: Vector2D): boolean {
    return this.points.some(p => p.equals(point));
  }
}

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