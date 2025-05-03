export function drawPoint(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, color: string) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
  }
  
  export function drawSegment(
    ctx: CanvasRenderingContext2D,
    [ax, ay]: [number, number],
    [bx, by]: [number, number],
    color: string,
    scale = 1
  ) {
    ctx.beginPath();
    ctx.moveTo(ax * scale, ay * scale);
    ctx.lineTo(bx * scale, by * scale);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
  }