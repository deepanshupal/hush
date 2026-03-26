'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';

interface DockApp {
  id: string;
  name: string;
  icon: string;
}

interface MacOSDockProps {
  apps: DockApp[];
  onAppClick?: (appId: string) => void;
  openApps?: string[];
  className?: string;
}

// Fixed values to avoid SSR hydration mismatch
const BASE_ICON_SIZE = 52;
const MAX_SCALE = 1.4;
const EFFECT_WIDTH = 220;
const MIN_SCALE = 1.0;
const BASE_SPACING = 10;
const PADDING = 10;

const MacOSDock: React.FC<MacOSDockProps> = ({
  apps,
  onAppClick = () => {},
  openApps = [],
  className = ''
}) => {
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [currentScales, setCurrentScales] = useState<number[]>(apps.map(() => 1));

  // Initialize positions with fixed values
  const getInitialPositions = () => {
    let currentX = 0;
    return apps.map(() => {
      const centerX = currentX + (BASE_ICON_SIZE / 2);
      currentX += BASE_ICON_SIZE + BASE_SPACING;
      return centerX;
    });
  };

  const [currentPositions, setCurrentPositions] = useState<number[]>(getInitialPositions);
  const dockRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastMouseMoveTime = useRef<number>(0);

  // Cosine-based magnification algorithm
  const calculateTargetMagnification = useCallback((mousePosition: number | null) => {
    if (mousePosition === null) {
      return apps.map(() => MIN_SCALE);
    }

    return apps.map((_, index) => {
      const normalIconCenter = (index * (BASE_ICON_SIZE + BASE_SPACING)) + (BASE_ICON_SIZE / 2);
      const minX = mousePosition - (EFFECT_WIDTH / 2);
      const maxX = mousePosition + (EFFECT_WIDTH / 2);

      if (normalIconCenter < minX || normalIconCenter > maxX) {
        return MIN_SCALE;
      }

      const theta = ((normalIconCenter - minX) / EFFECT_WIDTH) * 2 * Math.PI;
      const cappedTheta = Math.min(Math.max(theta, 0), 2 * Math.PI);
      const scaleFactor = (1 - Math.cos(cappedTheta)) / 2;

      return MIN_SCALE + (scaleFactor * (MAX_SCALE - MIN_SCALE));
    });
  }, [apps]);

  // Calculate positions based on current scales
  const calculatePositions = useCallback((scales: number[]) => {
    let currentX = 0;

    return scales.map((scale) => {
      const scaledWidth = BASE_ICON_SIZE * scale;
      const centerX = currentX + (scaledWidth / 2);
      currentX += scaledWidth + BASE_SPACING;
      return centerX;
    });
  }, []);

  // Animation loop
  const animateToTarget = useCallback(() => {
    const targetScales = calculateTargetMagnification(mouseX);
    const targetPositions = calculatePositions(targetScales);
    const lerpFactor = mouseX !== null ? 0.2 : 0.12;

    setCurrentScales(prevScales => {
      return prevScales.map((currentScale, index) => {
        const diff = targetScales[index] - currentScale;
        return currentScale + (diff * lerpFactor);
      });
    });

    setCurrentPositions(prevPositions => {
      return prevPositions.map((currentPos, index) => {
        const diff = targetPositions[index] - currentPos;
        return currentPos + (diff * lerpFactor);
      });
    });

    const scalesNeedUpdate = currentScales.some((scale, index) =>
      Math.abs(scale - targetScales[index]) > 0.002
    );
    const positionsNeedUpdate = currentPositions.some((pos, index) =>
      Math.abs(pos - targetPositions[index]) > 0.1
    );

    if (scalesNeedUpdate || positionsNeedUpdate || mouseX !== null) {
      animationFrameRef.current = requestAnimationFrame(animateToTarget);
    }
  }, [mouseX, calculateTargetMagnification, calculatePositions, currentScales, currentPositions]);

  // Start/stop animation loop
  useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(animateToTarget);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animateToTarget]);

  // Throttled mouse movement handler
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = performance.now();

    if (now - lastMouseMoveTime.current < 16) {
      return;
    }

    lastMouseMoveTime.current = now;

    if (dockRef.current) {
      const rect = dockRef.current.getBoundingClientRect();
      setMouseX(e.clientX - rect.left - PADDING);
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouseX(null);
  }, []);

  const createBounceAnimation = (element: HTMLElement) => {
    element.style.transition = 'transform 0.2s ease-out';
    element.style.transform = 'translateY(-8px)';

    setTimeout(() => {
      element.style.transform = 'translateY(0px)';
    }, 200);
  };

  const handleAppClick = (appId: string, index: number) => {
    if (iconRefs.current[index]) {
      createBounceAnimation(iconRefs.current[index]!);
    }
    onAppClick(appId);
  };

  // Calculate content width
  const baseWidth = (apps.length * (BASE_ICON_SIZE + BASE_SPACING)) - BASE_SPACING;
  const contentWidth = currentPositions.length > 0
    ? Math.max(baseWidth, ...currentPositions.map((pos, index) =>
        pos + (BASE_ICON_SIZE * currentScales[index]) / 2
      ))
    : baseWidth;

  return (
    <div
      ref={dockRef}
      className={`${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'flex-end',
        gap: '8px',
        overflow: 'visible',
        borderRadius: '1rem',
        backgroundColor: 'color-mix(in oklab, oklch(55% .003 241.23) 50%, transparent)',
        paddingInline: '8px',
        paddingBottom: '8px',
        boxShadow: '#00000012 0px 4px 9px 0px, #0000000f 0px 16px 16px 0px, #0000000a 0px 36px 22px 0px, #00000003 0px 65px 26px 0px, #0000 0px 101px 28px 0px, #0000000a 0px 0px 0px 1px, #fff 0px 0px 0px .5px inset',
        backdropFilter: 'blur(24px)',
        height: '66px',
        width: `${contentWidth + PADDING * 2}px`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative"
        style={{
          height: `${BASE_ICON_SIZE}px`,
          width: '100%'
        }}
      >
        {apps.map((app, index) => {
          const scale = currentScales[index];
          const position = currentPositions[index] || 0;
          const scaledSize = BASE_ICON_SIZE * scale;
          const isOpen = openApps.includes(app.id);

          return (
            <div
              key={app.id}
              ref={(el) => { iconRefs.current[index] = el; }}
              className="absolute cursor-pointer flex flex-col items-center justify-end"
              title={app.name}
              onClick={() => handleAppClick(app.id, index)}
              style={{
                left: `${position - scaledSize / 2}px`,
                bottom: isOpen ? '14px' : '0px',
                width: `${scaledSize}px`,
                height: `${scaledSize}px`,
                transformOrigin: 'bottom center',
                zIndex: Math.round(scale * 10)
              }}
            >
              <img
                src={app.icon}
                alt={app.name}
                width={scaledSize}
                height={scaledSize}
                className="object-contain"
                style={{
                  filter: isOpen
                    ? `drop-shadow(0 4px 8px rgba(0,0,0,0.3))`
                    : `drop-shadow(0 2px 4px rgba(0,0,0,0.2))`,
                }}
              />

              {/* App Indicator Dot */}
              {openApps.includes(app.id) && (
                <div
                  className="absolute"
                  style={{
                    bottom: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 0 4px rgba(0, 0, 0, 0.3)',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MacOSDock;
