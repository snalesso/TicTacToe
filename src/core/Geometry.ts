import { Vector2d } from "./Algebra";
import { inlineThrow } from "./utils";

export class Coorsd2d extends Vector2d {
  // constructor(x: number, y: number) {
  //   super(x, y);
  // }
}

export class Size {
  public readonly width: number;
  public readonly height: number;

  constructor(width: number, height: number);
  constructor(side: number);
  constructor(widthOrSide: number, height?: number) {
    this.width = widthOrSide;
    this.height = height ?? widthOrSide;
  }

  public contains(coords: Vector2d): boolean {
    return coords.x >= 0
      && coords.x < this.width
      && coords.y >= 0
      && coords.y < this.height;
  }
}

export class Rectangle {
  constructor(
    public readonly pos: Coorsd2d,
    public readonly size: Size) {
  }

  public contains(coords: Vector2d): boolean {
    return coords.x >= this.pos.x
      && coords.x <= (this.pos.x + this.size.width)
      && coords.y >= this.pos.y
      && coords.y <= (this.pos.y + this.size.height);
  }
}

export class Square extends Rectangle {
  constructor(pos: Coorsd2d, sideLen: number) {
    super(pos, new Size(sideLen, sideLen));
  }
}

export class Line {

  public readonly points: readonly Coorsd2d[];

  constructor(points: Iterable<Coorsd2d>) {
    this.points = [...points];
  }

  public includes(coords: Coorsd2d): boolean;
  public includes(x: number, y: number): boolean;
  public includes(coordsOrX: Coorsd2d | number, y?: number): boolean {
    const point = coordsOrX instanceof Coorsd2d
      ? coordsOrX
      : new Coorsd2d(coordsOrX, y ?? inlineThrow(() => new Error(`Y not defined.`)));
    return this.points.some(p => p.equals(point));
  }
}
