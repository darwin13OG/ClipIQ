/**
 * Client-side video processing utility to extract metadata and keyframes
 * for multimodal AI processing with ClipIQ Engine.
 */

export interface ExtractedVideoInfo {
  duration: number;
  width: number;
  height: number;
  frames: string[]; // Base64 data URLs
  hasAudioTrack: boolean;
}

export async function extractVideoFrames(
  fileOrUrl: File | string,
  numFrames: number = 6
): Promise<ExtractedVideoInfo> {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';

    const url = typeof fileOrUrl === 'string' ? fileOrUrl : URL.createObjectURL(fileOrUrl);
    video.src = url;

    let hasAudio = true;

    video.onloadedmetadata = async () => {
      const duration = video.duration || 10;
      const width = video.videoWidth || 720;
      const height = video.videoHeight || 1280;

      // Check audio track if available
      if ('webkitAudioDecodedByteCount' in video && (video as any).webkitAudioDecodedByteCount === 0) {
        hasAudio = false;
      }

      const canvas = document.createElement('canvas');
      // Scale down for fast upload to Gemini
      const maxDim = 480;
      const scale = Math.min(maxDim / width, maxDim / height, 1);
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);
      const ctx = canvas.getContext('2d');

      const frames: string[] = [];
      const interval = duration / (numFrames + 1);

      // Seek and capture frames
      for (let i = 1; i <= numFrames; i++) {
        const targetTime = Math.min(i * interval, duration - 0.2);
        try {
          await seekToTime(video, targetTime);
          if (ctx) {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.65);
            frames.push(dataUrl);
          }
        } catch (e) {
          console.warn('Frame capture skipped at', targetTime, e);
        }
      }

      if (typeof fileOrUrl !== 'string') {
        // Revoke after extraction
        // URL.revokeObjectURL(url);
      }

      resolve({
        duration: Math.round(duration * 10) / 10,
        width,
        height,
        frames,
        hasAudioTrack: hasAudio,
      });
    };

    video.onerror = (e) => {
      console.warn('Video load error for frame extraction:', e);
      // Resolve with empty frames rather than crashing
      resolve({
        duration: 30,
        width: 1080,
        height: 1920,
        frames: [],
        hasAudioTrack: true,
      });
    };
  });
}

function seekToTime(video: HTMLVideoElement, time: number): Promise<void> {
  return new Promise((resolve) => {
    const onSeeked = () => {
      video.removeEventListener('seeked', onSeeked);
      resolve();
    };
    video.addEventListener('seeked', onSeeked);
    video.currentTime = time;
  });
}
