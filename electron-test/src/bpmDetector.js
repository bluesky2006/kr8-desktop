// utils/bpmDetector.js
// Lightweight BPM estimator for browser/Electron using Web Audio API.
// Works best on reasonably steady, dance-ish material. Returns { bpm, confidence }.

export async function getBPMFromFile(
  file,
  { minBPM = 60, maxBPM = 200, downsampleToHz = 22050 } = {}
) {
  const arrayBuffer = await file.arrayBuffer();

  // Use an OfflineAudioContext so analysis doesn't tie up the UI audio graph
  // We'll decode first to know sampleRate & length.
  const tmpCtx = new (window.AudioContext || window.webkitAudioContext)();
  const decoded = await tmpCtx.decodeAudioData(arrayBuffer.slice(0));
  tmpCtx.close();

  // Downmix to mono
  const mono = mixToMono(decoded);

  // Optionally resample to speed up analysis
  const targetRate = Math.min(downsampleToHz, decoded.sampleRate);
  const { data: resampled, sampleRate } =
    decoded.sampleRate === targetRate
      ? { data: mono, sampleRate: decoded.sampleRate }
      : resampleLinear(mono, decoded.sampleRate, targetRate);

  // Emphasize onsets: high‑pass + simple envelope (rectify + smooth)
  const emphasized = emphasizeOnsets(resampled, sampleRate);

  // Autocorrelation over sensible lag window
  const { bpm, confidence } = autocorrelationTempo(emphasized, sampleRate, minBPM, maxBPM);

  return { bpm: Math.round(bpm), confidence };
}

// --- helpers ---

function mixToMono(audioBuffer) {
  const { numberOfChannels, length } = audioBuffer;
  if (numberOfChannels === 1) return audioBuffer.getChannelData(0).slice(0);

  const out = new Float32Array(length);
  for (let ch = 0; ch < numberOfChannels; ch++) {
    const data = audioBuffer.getChannelData(ch);
    for (let i = 0; i < length; i++) out[i] += data[i];
  }
  for (let i = 0; i < length; i++) out[i] /= numberOfChannels;
  return out;
}

function resampleLinear(input, fromRate, toRate) {
  if (toRate === fromRate) return { data: input, sampleRate: fromRate };
  const ratio = fromRate / toRate;
  const outLen = Math.floor(input.length / ratio);
  const out = new Float32Array(outLen);
  for (let i = 0; i < outLen; i++) {
    const idx = i * ratio;
    const i0 = Math.floor(idx);
    const i1 = Math.min(i0 + 1, input.length - 1);
    const frac = idx - i0;
    out[i] = input[i0] * (1 - frac) + input[i1] * frac;
  }
  return { data: out, sampleRate: toRate };
}

function emphasizeOnsets(signal, sampleRate) {
  // 1) 4th‑order high‑pass ~150 Hz (very simple IIR cascade)
  const hpCut = 150 / (sampleRate / 2); // normalized (0..1)
  const { a, b } = biquadHighpass(hpCut, 0.707);
  let y1 = 0,
    y2 = 0,
    x1 = 0,
    x2 = 0; // Direct Form I section reuse
  const out = new Float32Array(signal.length);

  for (let i = 0; i < signal.length; i++) {
    const x0 = signal[i];
    const y0 = b[0] * x0 + b[1] * x1 + b[2] * x2 - a[1] * y1 - a[2] * y2;
    x2 = x1;
    x1 = x0;
    y2 = y1;
    y1 = y0;

    // 2) Half‑wave rectify
    const rect = y0 > 0 ? y0 : 0;

    // 3) Exponential smoothing (envelope follower)
    // Attack fast, release slower
    const attack = Math.exp(-1 / (0.005 * sampleRate));
    const release = Math.exp(-1 / (0.05 * sampleRate));
    const prev = i === 0 ? 0 : out[i - 1];
    const coeff = rect > prev ? attack : release;
    out[i] = coeff * prev + (1 - coeff) * rect;
  }
  return out;
}

function biquadHighpass(normCut, q = 0.707) {
  // Bilinear transform high‑pass
  const w0 = Math.PI * 2 * Math.min(Math.max(normCut, 0.0001), 0.9999);
  const cos = Math.cos(w0),
    sin = Math.sin(w0);
  const alpha = sin / (2 * q);
  const b0 = (1 + cos) / 2;
  const b1 = -(1 + cos);
  const b2 = (1 + cos) / 2;
  const a0 = 1 + alpha;
  const a1 = -2 * cos;
  const a2 = 1 - alpha;
  return {
    b: [b0 / a0, b1 / a0, b2 / a0],
    a: [1, a1 / a0, a2 / a0],
  };
}

function autocorrelationTempo(envelope, sampleRate, minBPM, maxBPM) {
  // Limit analysis to a few minutes to keep it snappy
  const maxSeconds = 180;
  const N = Math.min(envelope.length, Math.floor(maxSeconds * sampleRate));

  // Normalize
  const slice = envelope.subarray(0, N);
  let mean = 0;
  for (let i = 0; i < slice.length; i++) mean += slice[i];
  mean /= slice.length;
  for (let i = 0; i < slice.length; i++) slice[i] -= mean;

  // Lag window corresponding to tempo range
  const maxLag = Math.floor((60 / minBPM) * sampleRate);
  const minLag = Math.floor((60 / maxBPM) * sampleRate);

  // Compute autocorrelation within window (naive but bounded)
  const ac = new Float32Array(maxLag + 1);
  for (let lag = minLag; lag <= maxLag; lag++) {
    let sum = 0;
    for (let i = 0; i + lag < N; i++) sum += slice[i] * slice[i + lag];
    ac[lag] = sum;
  }

  // Find the strongest peak and refine with parabolic interpolation
  let bestLag = minLag;
  for (let lag = minLag + 1; lag < maxLag; lag++) {
    if (ac[lag] > ac[lag - 1] && ac[lag] > ac[lag + 1]) {
      if (ac[lag] > ac[bestLag]) bestLag = lag;
    }
  }

  // Parabolic fit around bestLag for sub‑sample precision
  const y0 = ac[bestLag - 1] || ac[bestLag];
  const y1 = ac[bestLag];
  const y2 = ac[bestLag + 1] || ac[bestLag];
  const denom = y0 - 2 * y1 + y2;
  const offset = denom !== 0 ? (0.5 * (y0 - y2)) / denom : 0;
  const refinedLag = Math.max(minLag, Math.min(maxLag, bestLag + offset));

  const periodSec = refinedLag / sampleRate;
  let bpm = 60 / periodSec;

  // Resolve octave errors: fold BPM into preferred range by doubling/halving
  while (bpm < minBPM) bpm *= 2;
  while (bpm > maxBPM) bpm /= 2;

  // Confidence: peak prominence vs local neighborhood
  const neighborhood = 20;
  let localMax = 1e-12,
    localMean = 0,
    count = 0;
  for (
    let k = Math.max(minLag, bestLag - neighborhood);
    k <= Math.min(maxLag, bestLag + neighborhood);
    k++
  ) {
    localMax = Math.max(localMax, ac[k]);
    localMean += ac[k];
    count++;
  }
  localMean /= Math.max(1, count);
  const confidence = Math.max(0, Math.min(1, (y1 - localMean) / (localMax || 1)));

  return { bpm, confidence };
}
