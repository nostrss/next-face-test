import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { MediaPipeFaceMeshTfjsModelConfig } from '@tensorflow-models/face-landmarks-detection';
import { drawMesh } from '@/util/drawMesh';
export const runDetector = async (
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement | null
) => {
  const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
  const detectorConfig = {
    runtime: 'tfjs',
  };
  const detector = await faceLandmarksDetection.createDetector(
    model,
    detectorConfig as MediaPipeFaceMeshTfjsModelConfig
  );

  const detect = async (net: faceLandmarksDetection.FaceLandmarksDetector) => {
    const estimationConfig = { flipHorizontal: false };
    const faces = await net.estimateFaces(video, estimationConfig);
    const ctx = canvas?.getContext('2d');
    requestAnimationFrame(() => drawMesh(faces[0], ctx));
    detect(detector);
  };
  detect(detector);
};
