import { Line, Rectangle, Vector2D } from "../core/Geometry";

export function createLine(start: Vector2D, end: Vector2D): Line {
  const xDelta = end.x - start.x;
  const yDelta = end.y - start.y;
  if (Math.abs(xDelta) !== Math.abs(yDelta) && xDelta !== 0 && yDelta !== 0)
    throw new Error("Lines can be rotated only by multiples of 45°.");
  const steps = Math.max(Math.abs(xDelta), Math.abs(yDelta)) + 1;
  const xDir = Math.sign(xDelta);
  const yDir = Math.sign(yDelta);
  const points = Array(steps).fill(undefined).map((_, i) => new Vector2D(start.x + i * xDir, start.y + i * yDir));
  return new Line(points);
}

export function calcWinningCols(size: Rectangle, length: number): readonly Line[] {
  if (size.width <= 0 || size.height <= 0)
    throw new Error('Invalid size.');
  const lines: Line[] = []
  for (let x = 0; x < size.width; x++) {
    for (let y = 0; y < size.height; y++) {
      const lastCellY = y + length - 1;
      if (lastCellY >= size.height)
        break;
      const line = createLine(new Vector2D(x, y), new Vector2D(x, lastCellY));
      lines.push(line);
    }
  }
  return lines;
}
export function calcWinningRows(size: Rectangle, length: number): readonly Line[] {
  if (size.width <= 0 || size.height <= 0)
    throw new Error('Invalid size.');
  const lines: Line[] = []
  for (let y = 0; y < size.height; y++) {
    for (let x = 0; x < size.width; x++) {
      const lastCellX = x + length - 1;
      if (lastCellX >= size.width)
        break;
      const line = createLine(new Vector2D(x, y), new Vector2D(lastCellX, y));
      lines.push(line);
    }
  }
  return lines;
}
export function calcWinningDiagonals(size: Rectangle, length: number): readonly Line[] {
  if (size.width <= 0 || size.height <= 0)
    throw new Error('Invalid size.');
  const lines: Line[] = [];
  const lastLineIndex = length - 1;
  for (let y = 0; y < size.height; y++) {
    for (let x = 0; x < size.width; x++) {
      const lastUpRightCellCoords = new Vector2D(x + lastLineIndex, y - lastLineIndex);
      if (size.contains(lastUpRightCellCoords)) {
        const line = createLine(new Vector2D(x, y), lastUpRightCellCoords);
        lines.push(line);
      }
      const lastDownRightCellCoords = new Vector2D(x + lastLineIndex, y + lastLineIndex);
      if (size.contains(lastDownRightCellCoords)) {
        const line = createLine(new Vector2D(x, y), lastDownRightCellCoords);
        lines.push(line);
      }
    }
  }
  return lines;
}

export function get2dCell<T>(cells: readonly (readonly T[])[], coord: Vector2D): T {
  return cells[coord.x][coord.y];
}

export function get2dCells<T>(cells: readonly (readonly T[])[], line: Line): readonly T[] {
  const values: T[] = [];
  for (const point of line.points) {
    values.push(cells[point.x][point.y]);
  }
  return values;
}