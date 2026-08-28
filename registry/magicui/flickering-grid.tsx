'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

export interface FlickeringGridProps extends React.HTMLAttributes<HTMLDivElement> {
  squareSize?: number;
  gridGap?: number;
  flickerChance?: number;
  color?: string;
  colors?: string[];
  maxOpacity?: number;
  className?: string;
  width?: number;
  height?: number;
  shape?: 'square' | 'circle' | 'dot';
}

function parseColor(color: string): { r: number; g: number; b: number } {
  if (color.startsWith('#')) {
    let hex = color.slice(1);
    if (hex.length === 3) {
      hex = hex.split('').map((c) => c + c).join('');
    }
    const num = parseInt(hex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  }
  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
    };
  }
  // Light orange fallback
  return { r: 249, g: 115, b: 22 };
}

export function FlickeringGrid({
  squareSize = 4,
  gridGap = 6,
  flickerChance = 0.1,
  color = '#60A5FA',
  colors,
  maxOpacity = 0.5,
  className,
  width,
  height,
  shape = 'circle',
  style,
  ...props
}: FlickeringGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInView, setIsInView] = useState(true);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: width || 800,
    height: height || 800,
  });

  const parsedColors = useMemo(() => {
    if (colors && colors.length > 0) {
      return colors.map((c) => parseColor(c));
    }
    return [parseColor(color)];
  }, [color, colors]);

  // Handle resizing / measurement
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateSize = () => {
      const w = width || container.clientWidth || 800;
      const h = height || container.clientHeight || 800;
      setDimensions((prev) => {
        if (prev.width === w && prev.height === h) return prev;
        return { width: w, height: h };
      });
    };

    updateSize();

    if (!width || !height) {
      const resizeObserver = new ResizeObserver(() => {
        updateSize();
      });
      resizeObserver.observe(container);
      return () => resizeObserver.disconnect();
    }
  }, [width, height]);

  // IntersectionObserver to pause when off-screen
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.01 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Animation and canvas rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isInView) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    const { width: curW, height: curH } = dimensions;

    canvas.width = curW * dpr;
    canvas.height = curH * dpr;
    ctx.scale(dpr, dpr);

    const step = squareSize + gridGap;
    const cols = Math.max(1, Math.floor((curW + gridGap) / step));
    const rows = Math.max(1, Math.floor((curH + gridGap) / step));
    const totalItems = cols * rows;

    const opacities = new Float32Array(totalItems);
    const colorIndices = new Uint8Array(totalItems);

    for (let i = 0; i < totalItems; i++) {
      opacities[i] = Math.random() * maxOpacity;
      colorIndices[i] = i % parsedColors.length;
    }

    let animationFrameId: number;
    let lastTime = performance.now();

    const isRound = shape === 'circle' || shape === 'dot';
    const radius = squareSize / 2;

    const render = (time: number) => {
      const deltaTime = time - lastTime;

      // Maintain smooth ~30-45 FPS animation without high CPU load
      if (deltaTime >= 32) {
        lastTime = time;

        // Update randomized flickering
        for (let i = 0; i < totalItems; i++) {
          if (Math.random() < flickerChance) {
            opacities[i] = Math.random() * maxOpacity;
            if (parsedColors.length > 1 && Math.random() < 0.2) {
              colorIndices[i] = Math.floor(Math.random() * parsedColors.length);
            }
          }
        }

        ctx.clearRect(0, 0, curW, curH);

        for (let r = 0; r < rows; r++) {
          const y = r * step;
          for (let c = 0; c < cols; c++) {
            const idx = r * cols + c;
            const opacity = opacities[idx];
            if (opacity < 0.015) continue;

            const colObj = parsedColors[colorIndices[idx]];
            ctx.fillStyle = `rgba(${colObj.r}, ${colObj.g}, ${colObj.b}, ${opacity})`;

            const x = c * step;

            if (isRound) {
              ctx.beginPath();
              ctx.arc(x + radius, y + radius, radius, 0, Math.PI * 2);
              ctx.fill();
            } else {
              ctx.fillRect(x, y, squareSize, squareSize);
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, squareSize, gridGap, flickerChance, maxOpacity, parsedColors, shape, isInView]);

  return (
    <div
      ref={containerRef}
      className={cn('relative h-full w-full overflow-hidden', className)}
      style={style}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  );
}

export function FlickeringGridRoundedDemo() {
  return (
    <div className="bg-background relative size-[600px] w-full overflow-hidden rounded-lg border">
      <FlickeringGrid
        className="relative inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
        squareSize={4}
        gridGap={6}
        color="#60A5FA"
        maxOpacity={0.5}
        flickerChance={0.1}
        height={800}
        width={800}
      />
    </div>
  );
}
