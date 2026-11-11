import { useEffect, useRef } from 'react';

/**
 * Lightweight graphite contour field for the Orbit hero.
 * It pauses when outside the viewport and renders a static frame for reduced motion.
 */
export default function SilkWaves({ reduceMotion = false, scrollProgress }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return undefined;

    let frame = 0;
    let width = 0;
    let height = 0;
    let visible = false;
    let disposed = false;
    let lastDraw = 0;
    let scrollSpeed = 1;
    let dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const staticMode = reduceMotion || prefersReduced;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.15 : 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0);
    };

    const draw = (time) => {
      if (disposed) return;
      context.clearRect(0, 0, width, height);
      const compact = width < 700;
      const lineCount = compact ? 34 : 68;
      const step = compact ? 10 : 8;
      const phase = staticMode ? 0.25 : time * 0.00016 * scrollSpeed;
      context.globalCompositeOperation = 'lighter';

      for (let line = 0; line < lineCount; line += 1) {
        const base = (line / Math.max(1, lineCount - 1)) * height;
        context.beginPath();
        let first = true;
        for (let x = -24; x <= width + 24; x += step) {
          const nx = x / Math.max(1, width);
          const centerPull = Math.exp(-Math.pow((nx - 0.68) * 2.15, 2));
          const waveA = Math.sin(nx * 7.2 + phase + line * 0.14) * (compact ? 12 : 22);
          const waveB = Math.sin(nx * 15.5 - phase * 0.7 + line * 0.08) * (compact ? 4 : 9);
          const fold = Math.sin((nx - 0.68) * 18 + phase * 1.5 + line * 0.055) * centerPull * (compact ? 24 : 56);
          const drift = Math.cos(nx * 2.8 + line * 0.035 + phase * 0.65) * (compact ? 6 : 13);
          const y = base + waveA + waveB + fold + drift;
          if (first) {
            context.moveTo(x, y);
            first = false;
          } else {
            context.lineTo(x, y);
          }
        }
        const alpha = 0.12 + (line % 7) * 0.025;
        context.strokeStyle = `rgba(201, 201, 210, ${alpha})`;
        context.lineWidth = line % 9 === 0 ? 1.15 : 0.55;
        context.stroke();
      }
      context.globalCompositeOperation = 'source-over';
    };

    const loop = (time) => {
      if (disposed || !visible || staticMode) return;
      if (time - lastDraw >= 1000 / 60) {
        draw(time);
        lastDraw = time;
      }
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (disposed || !visible || staticMode || frame) return;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    }, { threshold: 0.01 });

    const unsubscribeScroll = scrollProgress?.on('change', (value) => {
      scrollSpeed = 1 + Math.min(1, Math.max(0, value)) * 0.8;
    });

    const resizeObserver = new ResizeObserver(resize);
    observer.observe(canvas);
    resizeObserver.observe(canvas);
    resize();

    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      resizeObserver.disconnect();
      unsubscribeScroll?.();
    };
  }, [reduceMotion, scrollProgress]);

  return <canvas ref={canvasRef} className="silk-waves" aria-hidden="true" />;
}
