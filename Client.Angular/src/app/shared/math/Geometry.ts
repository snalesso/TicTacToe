import { inlineThrow } from "../utils";
import { Vector2D } from "./Algebra";

export class Point2D extends Vector2D { }

export class Size {
  public readonly width: number;
  public readonly height: number;

  constructor(width: number, height: number);
  constructor(side: number);
  constructor(widthOrSide: number, height?: number) {
    this.width = widthOrSide;
    this.height = height ?? widthOrSide;
  }

  public containsCoords2D(coords: Point2D): boolean {
    return coords.x >= 0
      && coords.x < this.width
      && coords.y >= 0
      && coords.y < this.height;
  }
}

export class Rectangle {
  constructor(
    public readonly size: Size) {
  }
}

export class Square extends Rectangle {
  constructor(sideLen: number) {
    super(new Size(sideLen, sideLen));
  }
}

export class Line {

  public readonly points: readonly Point2D[];

  constructor(points: Iterable<Point2D>) {
    this.points = [...points];
  }

  public includes(coords: Point2D): boolean;
  public includes(x: number, y: number): boolean;
  public includes(coordsOrX: Point2D | number, y?: number): boolean {
    const point = coordsOrX instanceof Point2D
      ? coordsOrX
      : new Point2D(coordsOrX, y ?? inlineThrow(() => new Error(`Y not defined.`)));
    return this.points.some(p => p.equals(point));
  }
}
