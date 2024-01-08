import { TRIANGULATION } from '@/util/triangulation';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';

export const drawMesh = (
  prediction: faceLandmarksDetection.Face,
  ctx: CanvasRenderingContext2D | null | undefined
) => {
  if (!prediction || !ctx) return;
  const keyPoints = prediction.keypoints;
  if (!keyPoints) return;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (let i = 0; i < TRIANGULATION.length / 3; i++) {
    const points = [
      TRIANGULATION[i * 3],
      TRIANGULATION[i * 3 + 1],
      TRIANGULATION[i * 3 + 2],
    ].map((index) => keyPoints[index]);
    drawPath(ctx, points, true);
  }
  for (let keyPoint of keyPoints) {
    ctx.beginPath();
    ctx.arc(keyPoint.x, keyPoint.y, 1, 0, 3 * Math.PI);
    ctx.fillStyle = 'aqua';
    ctx.fill();
  }
};

const drawPath = (
  ctx: CanvasRenderingContext2D | null | undefined,
  points: faceLandmarksDetection.Keypoint[],
  closePath: boolean
) => {
  const region = new Path2D();
  region.moveTo(points[0].x, points[0].y);
  for (let i = 1; i < points.length; i++) {
    const point = points[i];
    region.lineTo(point.x, point.y);
  }
  if (closePath) region.closePath();
  if (ctx) ctx.strokeStyle = 'black'; // Fix: Use 'strokeStyle' instead of 'stokeStyle'
  ctx?.stroke(region);
};
