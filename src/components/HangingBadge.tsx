import { useEffect, useRef, useState, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import profilePhoto from "@/assets/foto_rosto.jpg";

const GRAVITY = 0.4;
const DAMPING = 0.98;
const SPRING = 0.02;
const CORD_REST_LENGTH = 140;

interface Vec2 {
  x: number;
  y: number;
}

const HangingBadge = () => {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLanguage();

  const canvasRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  // Physics state refs
  const posRef = useRef<Vec2>({ x: 0, y: CORD_REST_LENGTH });
  const velRef = useRef<Vec2>({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragOffset = useRef<Vec2>({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const anchorPos = useRef<Vec2>({ x: 0, y: 0 });

  const [badgePos, setBadgePos] = useState<Vec2>({ x: 0, y: CORD_REST_LENGTH });
  const [isGrabbing, setIsGrabbing] = useState(false);

  // Get anchor position in viewport
  const getAnchorCenter = useCallback(() => {
    if (!anchorRef.current) return { x: 0, y: 0 };
    const rect = anchorRef.current.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
  }, []);

  // Physics loop
  const tick = useCallback(() => {
    if (!isDragging.current) {
      // Gravity
      velRef.current.y += GRAVITY;

      // Spring force toward rest position (below anchor)
      const restX = 0;
      const restY = CORD_REST_LENGTH;
      const dx = restX - posRef.current.x;
      const dy = restY - posRef.current.y;
      velRef.current.x += dx * SPRING;
      velRef.current.y += dy * SPRING;

      // Damping
      velRef.current.x *= DAMPING;
      velRef.current.y *= DAMPING;

      // Update position
      posRef.current.x += velRef.current.x;
      posRef.current.y += velRef.current.y;

      // Constrain: cord length (distance from anchor)
      const dist = Math.sqrt(posRef.current.x ** 2 + posRef.current.y ** 2);
      const maxLen = CORD_REST_LENGTH * 2.5;
      if (dist > maxLen) {
        const scale = maxLen / dist;
        posRef.current.x *= scale;
        posRef.current.y *= scale;
      }
    }

    setBadgePos({ x: posRef.current.x, y: posRef.current.y });
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;

    // Initial swing
    posRef.current = { x: 60, y: CORD_REST_LENGTH - 20 };
    velRef.current = { x: -2, y: 0 };
    rafRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafRef.current);
  }, [tick, prefersReducedMotion]);

  // Mouse/touch handlers - badge follows cursor when clicked
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    isDragging.current = true;
    setIsGrabbing(true);

    const anchor = getAnchorCenter();
    anchorPos.current = anchor;

    // Calculate offset from badge center to pointer
    const badgeRect = badgeRef.current?.getBoundingClientRect();
    if (badgeRect) {
      dragOffset.current = {
        x: e.clientX - (anchor.x + posRef.current.x),
        y: e.clientY - (anchor.y + posRef.current.y),
      };
    }

    // Capture pointer for smooth tracking
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, [getAnchorCenter]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;

    const anchor = getAnchorCenter();
    anchorPos.current = anchor;

    // Badge position relative to anchor
    posRef.current = {
      x: e.clientX - anchor.x - dragOffset.current.x,
      y: e.clientY - anchor.y - dragOffset.current.y,
    };
  }, [getAnchorCenter]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsGrabbing(false);

    // Give it throw velocity based on recent movement
    // The physics loop will take over
  }, []);

  // Calculate cord path (SVG curve from anchor to badge)
  const cordPath = useCallback(() => {
    const bx = badgePos.x;
    const by = badgePos.y;

    // Control point for a nice curve
    const cpx = bx * 0.3;
    const cpy = by * 0.2;

    return `M 0,0 Q ${cpx},${cpy} ${bx},${by}`;
  }, [badgePos]);

  // Calculate badge rotation based on cord angle
  const cordAngle = Math.atan2(badgePos.x, badgePos.y) * (180 / Math.PI);
  const dist = Math.sqrt(badgePos.x ** 2 + badgePos.y ** 2);
  const stretch = Math.max(0, dist - CORD_REST_LENGTH);
  const cordWidth = Math.max(4, 28 - stretch * 0.05);

  if (prefersReducedMotion) {
    return (
      <div className="relative hidden lg:flex items-start justify-center">
        <div className="glass-card p-10 w-80 text-center">
          <div className="w-36 h-36 mx-auto mb-4 rounded-full border-2 border-primary/30 overflow-hidden">
            <img src={profilePhoto} alt="Jonh Wili" className="w-full h-full object-cover" />
          </div>
          <h3 className="font-heading font-bold text-2xl text-foreground tracking-tight">JONH WILI</h3>
          <p className="text-sm text-muted-foreground mt-1">{t.badge.role}</p>
          <div className="flex flex-wrap justify-center gap-1.5 mt-5">
            {["JavaScript", "ReactJs", "Next.js", "Nuxt", "VueJs", "TypeScript"].map((tech) => (
              <span key={tech} className="tag-chip text-xs px-3 py-1">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={canvasRef}
      className="relative hidden lg:flex items-start justify-center"
      style={{ minHeight: 500, minWidth: 320 }}
    >
      {/* Anchor pin - fixed at top */}
      <div
        ref={anchorRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-12 h-5 rounded-t-md border border-border/60" style={{ background: "hsl(var(--muted))" }} />
      </div>

      {/* SVG cord connecting anchor to badge */}
      <svg
        className="absolute top-[10px] left-1/2 pointer-events-none"
        style={{
          transform: "translateX(-50%)",
          overflow: "visible",
          zIndex: 5,
          width: 1,
          height: 1,
        }}
      >
        <path
          d={cordPath()}
          fill="none"
          stroke="hsl(185 100% 55% / 0.2)"
          strokeWidth={cordWidth}
          strokeLinecap="round"
        />
        <path
          d={cordPath()}
          fill="none"
          stroke="hsl(185 100% 55% / 0.08)"
          strokeWidth={cordWidth + 8}
          strokeLinecap="round"
        />
      </svg>

      {/* Badge - follows physics / cursor */}
      <div
        ref={badgeRef}
        className="absolute select-none"
        style={{
          top: 10,
          left: "50%",
          transform: `translate(calc(-50% + ${badgePos.x}px), ${badgePos.y}px) rotate(${-cordAngle * 0.3}deg)`,
          zIndex: 4,
          cursor: isGrabbing ? "grabbing" : "grab",
          touchAction: "none",
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="glass-card p-10 w-80 text-center transition-shadow duration-300"
          style={{
            boxShadow: isGrabbing
              ? "0 30px 80px hsl(185 100% 55% / 0.2), 0 12px 40px hsl(0 0% 0% / 0.5)"
              : "0 20px 60px hsl(185 100% 55% / 0.12), 0 8px 24px hsl(0 0% 0% / 0.4)",
          }}
        >
          <div
            className="absolute top-3 right-3 w-3 h-3 rounded-full animate-pulse"
            style={{ background: "hsl(var(--primary))" }}
          />

          <div className="w-36 h-36 mx-auto mb-5 rounded-full border-2 border-primary/30 overflow-hidden">
            <img
              src={profilePhoto}
              alt="Jonh Wili"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>

          <h3 className="font-heading font-bold text-2xl text-foreground tracking-tight">
            JONH WILI
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{t.badge.role}</p>

          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {["JavaScript", "ReactJs", "Next.js", "Nuxt", "VueJs", "TypeScript"].map((tech) => (
              <span key={tech} className="tag-chip text-xs px-3 py-1">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HangingBadge;
