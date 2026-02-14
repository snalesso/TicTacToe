import { inlineThrow } from "../core/utils";
import { Vector2D } from "./Algebra";

export class Coords2D extends Vector2D {
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

  public containsCoords2D(coords: Coords2D): boolean {
    return coords.x >= 0
      && coords.x < this.width
      && coords.y >= 0
      && coords.y < this.height;
  }
}

export class Rectangle {
  constructor(
    public readonly pos: Coords2D,
    public readonly size: Size) {
  }

  public containsCoords2D(coords: Coords2D): boolean {
    return coords.x >= this.pos.x
      && coords.x <= (this.pos.x + this.size.width)
      && coords.y >= this.pos.y
      && coords.y <= (this.pos.y + this.size.height);
  }
}

export class Square extends Rectangle {
  constructor(pos: Coords2D, sideLen: number) {
    super(pos, new Size(sideLen, sideLen));
  }
}

export class Line {

  public readonly points: readonly Coords2D[];

  constructor(points: Iterable<Coords2D>) {
    this.points = [...points];
  }

  public includes(coords: Coords2D): boolean;
  public includes(x: number, y: number): boolean;
  public includes(coordsOrX: Coords2D | number, y?: number): boolean {
    const point = coordsOrX instanceof Coords2D
      ? coordsOrX
      : new Coords2D(coordsOrX, y ?? inlineThrow(() => new Error(`Y not defined.`)));
    return this.points.some(p => p.equals(point));
  }
}
