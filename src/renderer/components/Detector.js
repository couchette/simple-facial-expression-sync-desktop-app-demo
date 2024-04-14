import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

export default class Detector {
  constructor() {}

  // 获取单例实例的静态方法
  static async getInstance() {
    if (!Detector.instance) {
      Detector.instance = new Detector();
      Detector.instance.results = null;
      Detector.instance.video = null;
      const filesetResolver = await FilesetResolver.forVisionTasks(
        // 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm',
        'fileset_resolver/wasm',
      );
      Detector.instance.faceLandmarker = await FaceLandmarker.createFromOptions(
        filesetResolver,
        {
          baseOptions: {
            modelAssetPath:
              // "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
              'ai_models/face_landmarker.task',
            delegate: 'GPU',
          },
          outputFaceBlendshapes: true,
          outputFacialTransformationMatrixes: true,
          runningMode: 'VIDEO',
          numFaces: 1,
        },
      );
    }
    return Detector.instance;
  }

  bindVideo(video) {
    this.video = video;
  }

  detect() {
    return this.faceLandmarker.detectForVideo(this.video, Date.now());
  }

  async detectLoop() {
    this.results = this.detect();
    this.detectLoop();
  }

  async run() {
    if (!this.video.srcObject) throw new Error('Video bind is null');
    this.detectLoop();
  }
}
