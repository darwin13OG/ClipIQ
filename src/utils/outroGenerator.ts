// Utility for exporting user video concatenated with the branded ClipIQ Outro into a single file
// Features 60 FPS Canvas rendering, Web Audio synthesis (3.5s cinematic soundscape), and MediaRecorder

export interface OutroConfig {
  domain: string;
  brandTitle: string;
  tagline: string;
  durationSeconds?: number;
  aspectRatio?: '9:16' | '16:9';
}

export interface ExportProgress {
  stage: 'preparing' | 'rendering_video' | 'rendering_outro' | 'encoding' | 'completed' | 'error';
  percent: number;
  message: string;
}

/**
 * Plays an enriched, long (3.5s) cinematic brand soundscape into an AudioNode or AudioContext destination
 */
export function synthesizeCinematicOutroAudio(
  audioCtx: AudioContext,
  destination: AudioNode,
  startTime?: number
) {
  try {
    const t = startTime !== undefined ? startTime : audioCtx.currentTime;

    // 1. Futuristic Riser Whoosh (0s -> 0.8s)
    const oscSweep = audioCtx.createOscillator();
    const gainSweep = audioCtx.createGain();
    const filterSweep = audioCtx.createBiquadFilter();
    
    filterSweep.type = 'lowpass';
    filterSweep.frequency.setValueAtTime(200, t);
    filterSweep.frequency.exponentialRampToValueAtTime(3200, t + 0.8);

    oscSweep.type = 'sawtooth';
    oscSweep.frequency.setValueAtTime(110, t);
    oscSweep.frequency.exponentialRampToValueAtTime(440, t + 0.8);

    gainSweep.gain.setValueAtTime(0.001, t);
    gainSweep.gain.linearRampToValueAtTime(0.18, t + 0.7);
    gainSweep.gain.exponentialRampToValueAtTime(0.001, t + 0.95);

    oscSweep.connect(filterSweep);
    filterSweep.connect(gainSweep);
    gainSweep.connect(destination);

    oscSweep.start(t);
    oscSweep.stop(t + 1.0);

    // 2. Powerful Sub-Bass Impact Boom (0.7s -> 2.5s)
    const oscSub = audioCtx.createOscillator();
    const gainSub = audioCtx.createGain();
    oscSub.type = 'sine';
    oscSub.frequency.setValueAtTime(150, t + 0.7);
    oscSub.frequency.exponentialRampToValueAtTime(35, t + 2.2);

    gainSub.gain.setValueAtTime(0.001, t);
    gainSub.gain.setValueAtTime(0.7, t + 0.7);
    gainSub.gain.exponentialRampToValueAtTime(0.001, t + 2.8);

    oscSub.connect(gainSub);
    gainSub.connect(destination);

    oscSub.start(t + 0.7);
    oscSub.stop(t + 2.9);

    // 3. Lush Harmonized Ambient Pad (0.8s -> 3.2s)
    // C Major 9 chord: C4 (261.63), E4 (329.63), G4 (392.00), B4 (493.88), D5 (587.33)
    const padFreqs = [261.63, 329.63, 392.0, 493.88, 587.33];
    padFreqs.forEach((freq, idx) => {
      const oscPad = audioCtx.createOscillator();
      const gainPad = audioCtx.createGain();
      oscPad.type = 'triangle';
      oscPad.frequency.setValueAtTime(freq, t + 0.75 + idx * 0.05);

      gainPad.gain.setValueAtTime(0.001, t);
      gainPad.gain.linearRampToValueAtTime(0.12, t + 1.0 + idx * 0.05);
      gainPad.gain.exponentialRampToValueAtTime(0.001, t + 3.2);

      oscPad.connect(gainPad);
      gainPad.connect(destination);

      oscPad.start(t + 0.75 + idx * 0.05);
      oscPad.stop(t + 3.4);
    });

    // 4. Crystal Sparkle Bells (1.0s -> 3.5s)
    const bellFreqs = [1046.5, 1318.51, 1567.98, 2093.0];
    bellFreqs.forEach((freq, idx) => {
      const oscBell = audioCtx.createOscillator();
      const gainBell = audioCtx.createGain();
      oscBell.type = 'sine';
      oscBell.frequency.setValueAtTime(freq, t + 0.9 + idx * 0.12);

      gainBell.gain.setValueAtTime(0.001, t);
      gainBell.gain.setValueAtTime(0.15, t + 0.9 + idx * 0.12);
      gainBell.gain.exponentialRampToValueAtTime(0.001, t + 2.6 + idx * 0.15);

      oscBell.connect(gainBell);
      gainBell.connect(destination);

      oscBell.start(t + 0.9 + idx * 0.12);
      oscBell.stop(t + 3.5);
    });
  } catch (err) {
    console.warn('Sound synthesis error:', err);
  }
}

/**
 * Draws a single frame of the ClipIQ Outro onto a Canvas context at 60 FPS
 */
export function drawOutroFrame({
  ctx,
  width,
  height,
  elapsedSec,
  durationSec,
  config,
  isLandscape,
}: {
  ctx: CanvasRenderingContext2D;
  width: number;
  height: number;
  elapsedSec: number;
  durationSec: number;
  config: OutroConfig;
  isLandscape: boolean;
}) {
  const progress = Math.min(1, Math.max(0, elapsedSec / durationSec));

  // 1. Background Gradient
  const bgGrad = ctx.createRadialGradient(
    width / 2,
    height / 2,
    15,
    width / 2,
    height / 2,
    Math.max(width, height) * 0.75
  );
  bgGrad.addColorStop(0, '#150d30'); // Deep violet-indigo core
  bgGrad.addColorStop(0.55, '#0a0618');
  bgGrad.addColorStop(1, '#020205');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Animated Ambient Waves / Shockwaves
  const waveTime = elapsedSec * 1.3;
  const wave1 = waveTime % 1;
  const maxR = Math.min(width, height) * 0.44;
  const logoCenterY = isLandscape ? height * 0.38 : height * 0.36;

  // Wave 1
  ctx.beginPath();
  ctx.arc(width / 2, logoCenterY, maxR * wave1, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(139, 92, 246, ${Math.max(0, 0.45 * (1 - wave1))})`;
  ctx.lineWidth = 3;
  ctx.stroke();

  // Wave 2
  const wave2 = (waveTime + 0.5) % 1;
  ctx.beginPath();
  ctx.arc(width / 2, logoCenterY, maxR * wave2, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(6, 182, 212, ${Math.max(0, 0.35 * (1 - wave2))})`;
  ctx.lineWidth = 2;
  ctx.stroke();

  // 3. Logo Animation with smooth spring bounce
  const enterT = Math.min(1, elapsedSec * 2.5);
  // Ease out back formula
  const c1 = 1.70158;
  const c3 = c1 + 1;
  const scaleEase = enterT < 1 ? 1 + c3 * Math.pow(enterT - 1, 3) + c1 * Math.pow(enterT - 1, 2) : 1;
  const logoScale = Math.max(0.01, scaleEase);
  const logoSize = isLandscape ? 100 : 124;

  ctx.save();
  ctx.translate(width / 2, logoCenterY);
  ctx.scale(logoScale, logoScale);

  // Backlight Glow
  const glowGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, logoSize * 1.4);
  glowGrad.addColorStop(0, 'rgba(124, 58, 237, 0.65)');
  glowGrad.addColorStop(0.6, 'rgba(6, 182, 212, 0.25)');
  glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = glowGrad;
  ctx.beginPath();
  ctx.arc(0, 0, logoSize * 1.4, 0, Math.PI * 2);
  ctx.fill();

  // Rounded Square Container
  const rad = 26;
  const half = logoSize / 2;
  const logoGrad = ctx.createLinearGradient(-half, -half, half, half);
  logoGrad.addColorStop(0, '#7c3aed');
  logoGrad.addColorStop(0.5, '#6366f1');
  logoGrad.addColorStop(1, '#06b6d4');

  ctx.fillStyle = logoGrad;
  ctx.beginPath();
  ctx.roundRect(-half, -half, logoSize, logoSize, rad);
  ctx.fill();

  ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Equalizer Bars Inside Logo
  const barCount = 3;
  const barWidth = 6;
  const spacing = 12;
  const startX = -((barCount * spacing) / 2) - 16;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';

  for (let b = 0; b < barCount; b++) {
    const barH = 14 + Math.sin(elapsedSec * 12 + b * 1.8) * 12;
    ctx.beginPath();
    ctx.roundRect(startX + b * spacing, -barH / 2, barWidth, barH, 3);
    ctx.fill();
  }

  // Play Arrow Triangle
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.moveTo(8, -16);
  ctx.lineTo(30, 0);
  ctx.lineTo(8, 16);
  ctx.closePath();
  ctx.fill();

  ctx.restore();

  // 4. Typography Elements
  const textAlpha = Math.min(1, Math.max(0, (elapsedSec - 0.35) * 3));
  ctx.save();
  ctx.globalAlpha = textAlpha;

  // Title "ClipIQ"
  ctx.font = 'bold 34px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(config.brandTitle || 'ClipIQ', width / 2, logoCenterY + logoSize / 2 + 46);

  // Tagline
  ctx.font = '500 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = 'rgba(216, 180, 254, 0.95)';
  ctx.fillText(
    config.tagline || 'Auditoría & Inteligencia de Video',
    width / 2,
    logoCenterY + logoSize / 2 + 74
  );

  // Domain Badge Pill
  const domainBoxY = logoCenterY + logoSize / 2 + 104;
  const domainText = config.domain || 'clipiq.pages.dev';
  ctx.font = 'bold 20px "JetBrains Mono", "Courier New", monospace';
  const textMetrics = ctx.measureText(domainText);
  const boxW = textMetrics.width + 44;
  const boxH = 42;

  const domainGrad = ctx.createLinearGradient(
    width / 2 - boxW / 2,
    domainBoxY,
    width / 2 + boxW / 2,
    domainBoxY + boxH
  );
  domainGrad.addColorStop(0, 'rgba(124, 58, 237, 0.45)');
  domainGrad.addColorStop(1, 'rgba(6, 182, 212, 0.45)');

  ctx.fillStyle = domainGrad;
  ctx.beginPath();
  ctx.roundRect(width / 2 - boxW / 2, domainBoxY, boxW, boxH, 21);
  ctx.fill();

  ctx.strokeStyle = 'rgba(167, 139, 250, 0.7)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#38bdf8'; // Cyan text
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(domainText, width / 2, domainBoxY + boxH / 2);

  // Footer note
  ctx.font = '400 12px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = 'rgba(156, 163, 175, 0.75)';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('Optimizado con ClipIQ AI', width / 2, domainBoxY + boxH + 28);

  ctx.restore();
}

/**
 * Generates a stand-alone outro video blob
 */
export async function generateOutroVideoBlob(
  config: OutroConfig,
  onProgress?: (percent: number) => void
): Promise<{ blob: Blob; url: string; mimeType: string }> {
  const duration = config.durationSeconds || 3.5;
  const isLandscape = config.aspectRatio === '16:9';
  const width = isLandscape ? 1280 : 720;
  const height = isLandscape ? 720 : 1280;
  const fps = 60;
  const totalFrames = Math.round(duration * fps);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) throw new Error('Canvas 2D context not supported');

  let audioContext: AudioContext | null = null;
  let audioDestination: MediaStreamAudioDestinationNode | null = null;

  try {
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtxClass) {
      audioContext = new AudioCtxClass();
      audioDestination = audioContext.createMediaStreamDestination();
      synthesizeCinematicOutroAudio(audioContext, audioDestination, audioContext.currentTime);
    }
  } catch (e) {
    console.warn('AudioContext not available for outro generation', e);
  }

  const canvasStream = canvas.captureStream(fps);
  const combinedStream = new MediaStream([
    ...canvasStream.getVideoTracks(),
    ...(audioDestination ? audioDestination.stream.getAudioTracks() : []),
  ]);

  const mimeTypes = [
    'video/mp4;codecs=avc1,mp4a.40.2',
    'video/mp4',
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
  ];
  let selectedMime = 'video/webm';
  for (const m of mimeTypes) {
    if (MediaRecorder.isTypeSupported(m)) {
      selectedMime = m;
      break;
    }
  }

  const mediaRecorder = new MediaRecorder(combinedStream, {
    mimeType: selectedMime,
    videoBitsPerSecond: 4000000,
  });

  const recordedChunks: Blob[] = [];
  mediaRecorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  };

  return new Promise((resolve, reject) => {
    mediaRecorder.onstop = () => {
      const outputBlob = new Blob(recordedChunks, { type: selectedMime });
      const url = URL.createObjectURL(outputBlob);
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close().catch(() => {});
      }
      resolve({ blob: outputBlob, url, mimeType: selectedMime });
    };

    mediaRecorder.onerror = (e) => reject(e);
    mediaRecorder.start();

    let currentFrame = 0;
    const renderLoop = () => {
      const elapsedSec = currentFrame / fps;
      drawOutroFrame({
        ctx,
        width,
        height,
        elapsedSec,
        durationSec: duration,
        config,
        isLandscape,
      });

      currentFrame++;
      if (onProgress) {
        onProgress(Math.round((currentFrame / totalFrames) * 100));
      }

      if (currentFrame < totalFrames) {
        requestAnimationFrame(renderLoop);
      } else {
        setTimeout(() => {
          mediaRecorder.stop();
        }, 120);
      }
    };

    renderLoop();
  });
}

/**
 * UNIFIED EXPORT: Records the user's video and appends the ClipIQ outro immediately at the end into ONE SINGLE video file!
 */
export async function exportVideoWithOutroUnified({
  videoSrc,
  config,
  aspectRatio = '9:16',
  onProgress,
}: {
  videoSrc: string;
  config: OutroConfig;
  aspectRatio?: '9:16' | '16:9';
  onProgress?: (p: ExportProgress) => void;
}): Promise<{ blob: Blob; url: string; mimeType: string }> {
  const isLandscape = aspectRatio === '16:9';
  const width = isLandscape ? 1280 : 720;
  const height = isLandscape ? 720 : 1280;
  const fps = 60;
  const outroDuration = config.durationSeconds || 3.5;

  onProgress?.({
    stage: 'preparing',
    percent: 5,
    message: 'Cargando video fuente...',
  });

  // 1. Create invisible video element
  const video = document.createElement('video');
  video.crossOrigin = 'anonymous';
  video.src = videoSrc;
  video.playsInline = true;
  video.muted = false; // We route audio via WebAudio

  await new Promise<void>((resolve, reject) => {
    video.onloadedmetadata = () => resolve();
    video.onerror = () => {
      // If CORS or local load issue occurs, reject to allow fallback
      reject(new Error('No se pudo cargar el video fuente para concatenar'));
    };
  });

  const videoDuration = video.duration && !isNaN(video.duration) ? video.duration : 10;

  // 2. Setup Canvas & Audio
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d', { alpha: false });
  if (!ctx) throw new Error('Canvas context not available');

  let audioContext: AudioContext | null = null;
  let audioDestination: MediaStreamAudioDestinationNode | null = null;

  try {
    const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioCtxClass) {
      audioContext = new AudioCtxClass();
      audioDestination = audioContext.createMediaStreamDestination();

      // Connect video audio into destination
      try {
        const sourceNode = audioContext.createMediaElementSource(video);
        sourceNode.connect(audioDestination);
      } catch (audioErr) {
        console.warn('Could not connect video element audio track:', audioErr);
      }
    }
  } catch (err) {
    console.warn('Web Audio setup notice:', err);
  }

  // 3. MediaStream and MediaRecorder
  const canvasStream = canvas.captureStream(fps);
  const audioTracks = audioDestination ? audioDestination.stream.getAudioTracks() : [];
  const combinedStream = new MediaStream([
    ...canvasStream.getVideoTracks(),
    ...audioTracks,
  ]);

  const mimeTypes = [
    'video/mp4;codecs=avc1,mp4a.40.2',
    'video/mp4',
    'video/webm;codecs=vp9,opus',
    'video/webm;codecs=vp8,opus',
    'video/webm',
  ];
  let selectedMime = 'video/webm';
  for (const m of mimeTypes) {
    if (MediaRecorder.isTypeSupported(m)) {
      selectedMime = m;
      break;
    }
  }

  const mediaRecorder = new MediaRecorder(combinedStream, {
    mimeType: selectedMime,
    videoBitsPerSecond: 4500000,
  });

  const chunks: Blob[] = [];
  mediaRecorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) chunks.push(e.data);
  };

  return new Promise((resolve, reject) => {
    mediaRecorder.onstop = () => {
      const finalBlob = new Blob(chunks, { type: selectedMime });
      const finalUrl = URL.createObjectURL(finalBlob);
      if (audioContext && audioContext.state !== 'closed') {
        audioContext.close().catch(() => {});
      }
      onProgress?.({
        stage: 'completed',
        percent: 100,
        message: '¡Video con Outro ensamblado con éxito!',
      });
      resolve({ blob: finalBlob, url: finalUrl, mimeType: selectedMime });
    };

    mediaRecorder.onerror = (e) => {
      reject(e);
    };

    // Start recorder
    mediaRecorder.start();

    // Play video
    video.currentTime = 0;
    video.play().catch((playErr) => {
      console.warn('Auto play trigger error:', playErr);
    });

    let isVideoPhase = true;
    let outroStartTimestamp: number | null = null;
    let animationId: number;

    const renderLoop = (timestamp: number) => {
      if (isVideoPhase) {
        // Draw video frame
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);

        // Aspect fit / fill calculations
        const vW = video.videoWidth || width;
        const vH = video.videoHeight || height;
        const scale = Math.max(width / vW, height / vH);
        const sW = vW * scale;
        const sH = vH * scale;
        const sX = (width - sW) / 2;
        const sY = (height - sH) / 2;

        try {
          ctx.drawImage(video, sX, sY, sW, sH);
        } catch (drawErr) {
          // If tainted, fallback
          console.warn('Canvas draw video notice:', drawErr);
        }

        const videoProgress = Math.min(1, video.currentTime / videoDuration);
        onProgress?.({
          stage: 'rendering_video',
          percent: Math.round(videoProgress * 75),
          message: `Procesando video original (${Math.round(video.currentTime)}s / ${Math.round(videoDuration)}s)...`,
        });

        // Check if video finished
        if (video.ended || video.currentTime >= videoDuration - 0.1) {
          isVideoPhase = false;
          outroStartTimestamp = timestamp;

          // Trigger outro audio synthesis in audioContext!
          if (audioContext && audioDestination) {
            synthesizeCinematicOutroAudio(audioContext, audioDestination, audioContext.currentTime);
          }
        }
        animationId = requestAnimationFrame(renderLoop);
      } else {
        // OUTRO PHASE (3.5s)
        if (!outroStartTimestamp) outroStartTimestamp = timestamp;
        const elapsedOutro = (timestamp - outroStartTimestamp) / 1000;
        const outroProg = Math.min(1, elapsedOutro / outroDuration);

        drawOutroFrame({
          ctx,
          width,
          height,
          elapsedSec: elapsedOutro,
          durationSec: outroDuration,
          config,
          isLandscape,
        });

        onProgress?.({
          stage: 'rendering_outro',
          percent: 75 + Math.round(outroProg * 23),
          message: `Uniendo cierre de marca ClipIQ (${(outroDuration - elapsedOutro).toFixed(1)}s)...`,
        });

        if (elapsedOutro < outroDuration) {
          animationId = requestAnimationFrame(renderLoop);
        } else {
          onProgress?.({
            stage: 'encoding',
            percent: 99,
            message: 'Empaquetando archivo final...',
          });
          setTimeout(() => {
            mediaRecorder.stop();
          }, 150);
        }
      }
    };

    animationId = requestAnimationFrame(renderLoop);
  });
}
