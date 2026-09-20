import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import './InfiniteImageField.css';

export type InfiniteImageFieldProps = {
  /** Image URLs to tile across the field. Required — nothing renders without them. */
  images: string[];
  /** Width of each tile in CSS px. */
  imageWidth?: number;
  /** Height of each tile in CSS px. */
  imageHeight?: number;
  /** Space between tiles in CSS px. */
  gap?: number;
  /** Maximum camera speed in px/frame, reached when the pointer is at the field's edge. */
  maxSpeed?: number;
  /** Lerp factor (0–1) used to ease velocity toward its target each frame. Lower = smoother/slower to respond. */
  smoothing?: number;
  /** Corner radius applied to each tile. */
  borderRadius?: number;
  className?: string;
  /** Accessible label for the canvas region. */
  ariaLabel?: string;
  /** Called when a tile is clicked/tapped, with the source URL that was showing in that cell. */
  onImageSelect?: (src: string) => void;
};

type Vec2 = { x: number; y: number };

const DEFAULTS = {
  imageWidth: 260,
  imageHeight: 190,
  gap: 20,
  maxSpeed: 5.5,
  smoothing: 0.075,
  borderRadius: 10,
};

/** Deterministic pseudo-random image index for a grid cell, so the tiling
 * pattern is stable across renders and never repeats in an obvious stripe. */
function cellImageIndex(col: number, row: number, length: number): number {
  if (length <= 0) return 0;
  const h = (col * 92821 + row * 68917 + col * row * 2654435761) | 0;
  return Math.abs(h) % length;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function InfiniteImageField({
  images,
  imageWidth = DEFAULTS.imageWidth,
  imageHeight = DEFAULTS.imageHeight,
  gap = DEFAULTS.gap,
  maxSpeed = DEFAULTS.maxSpeed,
  smoothing = DEFAULTS.smoothing,
  borderRadius = DEFAULTS.borderRadius,
  className,
  ariaLabel = 'Scrolling field of Brookwell Harmony School photographs',
  onImageSelect,
}: InfiniteImageFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef<Vec2>({ x: 0, y: 0 });
  const cameraRef = useRef<Vec2>({ x: 0, y: 0 });
  const velocityRef = useRef<Vec2>({ x: 0, y: 0 });
  const targetVelocityRef = useRef<Vec2>({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef<Vec2>({ x: 0, y: 0 });
  const pointerDownRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const loadedImagesRef = useRef<Map<string, HTMLImageElement>>(new Map());

  // Computed once at mount and treated as static for the component's
  // lifetime — independent of effect declaration order, unlike storing
  // these in refs written by one effect and read by another.
  const isCoarsePointer = useMemo(
    () => window.matchMedia('(pointer: coarse)').matches,
    []
  );
  const prefersReducedMotion = useMemo(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  // Stable key so the preload effect only re-runs when the actual set of
  // image URLs changes, not on every parent re-render.
  const imagesKey = useMemo(() => images.join('|'), [images]);

  const cellW = imageWidth + gap;
  const cellH = imageHeight + gap;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x: width, y: height } = sizeRef.current;
    if (width === 0 || height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    const { x: camX, y: camY } = cameraRef.current;

    const startCol = Math.floor(camX / cellW) - 1;
    const endCol = Math.floor((camX + width) / cellW) + 1;
    const startRow = Math.floor(camY / cellH) - 1;
    const endRow = Math.floor((camY + height) / cellH) + 1;

    for (let row = startRow; row <= endRow; row += 1) {
      for (let col = startCol; col <= endCol; col += 1) {
        const idx = cellImageIndex(col, row, images.length);
        const src = images[idx];
        const img = loadedImagesRef.current.get(src);

        const screenX = col * cellW - camX;
        const screenY = row * cellH - camY;

        ctx.save();
        ctx.beginPath();
        const r = Math.min(borderRadius, imageWidth / 2, imageHeight / 2);
        ctx.moveTo(screenX + r, screenY);
        ctx.arcTo(screenX + imageWidth, screenY, screenX + imageWidth, screenY + imageHeight, r);
        ctx.arcTo(screenX + imageWidth, screenY + imageHeight, screenX, screenY + imageHeight, r);
        ctx.arcTo(screenX, screenY + imageHeight, screenX, screenY, r);
        ctx.arcTo(screenX, screenY, screenX + imageWidth, screenY, r);
        ctx.closePath();
        ctx.clip();

        if (img && img.complete && img.naturalWidth > 0) {
          // Cover-fit the image into the tile.
          const imgRatio = img.naturalWidth / img.naturalHeight;
          const tileRatio = imageWidth / imageHeight;
          let drawW = imageWidth;
          let drawH = imageHeight;
          let offsetX = 0;
          let offsetY = 0;

          if (imgRatio > tileRatio) {
            drawH = imageHeight;
            drawW = imageHeight * imgRatio;
            offsetX = (imageWidth - drawW) / 2;
          } else {
            drawW = imageWidth;
            drawH = imageWidth / imgRatio;
            offsetY = (imageHeight - drawH) / 2;
          }

          ctx.drawImage(img, screenX + offsetX, screenY + offsetY, drawW, drawH);
        } else {
          ctx.fillStyle = '#2e1a4d';
          ctx.fillRect(screenX, screenY, imageWidth, imageHeight);
        }

        ctx.restore();
      }
    }
  }, [images, cellW, cellH, imageWidth, imageHeight, borderRadius]);

  const tick = useCallback(() => {
    const dragging = isDraggingRef.current;
    const smooth = Math.min(Math.max(smoothing, 0.001), 1);

    velocityRef.current.x = lerp(
      velocityRef.current.x,
      dragging ? 0 : targetVelocityRef.current.x,
      smooth
    );
    velocityRef.current.y = lerp(
      velocityRef.current.y,
      dragging ? 0 : targetVelocityRef.current.y,
      smooth
    );

    if (!dragging) {
      cameraRef.current.x += velocityRef.current.x;
      cameraRef.current.y += velocityRef.current.y;
    }

    draw();
    rafRef.current = requestAnimationFrame(tick);
  }, [draw, smoothing]);

  // Preload images.
  useEffect(() => {
    let cancelled = false;
    images.forEach((src) => {
      if (loadedImagesRef.current.has(src)) return;
      const img = new Image();
      img.decoding = 'async';
      img.onload = () => {
        if (!cancelled) draw();
      };
      img.src = src;
      loadedImagesRef.current.set(src, img);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imagesKey]);

  // Size + resize handling.
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      sizeRef.current = { x: rect.width, y: rect.height };
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      draw();
    };

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [draw]);

  // Motion + input setup.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isCoarsePointer && !prefersReducedMotion) {
      // Gentle idle drift so the field still feels alive without a mouse.
      targetVelocityRef.current = { x: maxSpeed * 0.14, y: maxSpeed * 0.08 };
    }

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();

      if (event.pointerType === 'mouse') {
        const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
        targetVelocityRef.current = {
          x: Math.max(-1, Math.min(1, nx)) * maxSpeed,
          y: Math.max(-1, Math.min(1, ny)) * maxSpeed,
        };
        return;
      }

      if (isDraggingRef.current) {
        const dx = event.clientX - lastPointerRef.current.x;
        const dy = event.clientY - lastPointerRef.current.y;
        cameraRef.current.x -= dx;
        cameraRef.current.y -= dy;
        lastPointerRef.current = { x: event.clientX, y: event.clientY };
      }
    };

    const handlePointerLeave = (event: PointerEvent) => {
      if (event.pointerType === 'mouse') {
        targetVelocityRef.current = { x: 0, y: 0 };
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      pointerDownRef.current = { x: event.clientX, y: event.clientY, time: Date.now() };
      if (event.pointerType !== 'mouse') {
        isDraggingRef.current = true;
        lastPointerRef.current = { x: event.clientX, y: event.clientY };
      }
    };

    const handlePointerUp = (event: PointerEvent) => {
      const down = pointerDownRef.current;
      isDraggingRef.current = false;

      if (down) {
        const moved = Math.hypot(event.clientX - down.x, event.clientY - down.y);
        const elapsed = Date.now() - down.time;
        if (moved < 8 && elapsed < 400 && onImageSelect) {
          const rect = canvas.getBoundingClientRect();
          const localX = event.clientX - rect.left;
          const localY = event.clientY - rect.top;
          const worldX = localX + cameraRef.current.x;
          const worldY = localY + cameraRef.current.y;
          const col = Math.floor(worldX / cellW);
          const row = Math.floor(worldY / cellH);
          const idx = cellImageIndex(col, row, images.length);
          if (images[idx]) onImageSelect(images[idx]);
        }
      }
      pointerDownRef.current = null;
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);
    canvas.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [maxSpeed, cellW, cellH, images, onImageSelect, isCoarsePointer, prefersReducedMotion]);

  // Animation loop.
  useEffect(() => {
    if (prefersReducedMotion) {
      draw();
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [tick, draw, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={`infinite-field ${className ?? ''}`}
      role="img"
      aria-label={ariaLabel}
    >
      <canvas ref={canvasRef} className="infinite-field__canvas" aria-hidden="true" />
    </div>
  );
}

export default InfiniteImageField;
