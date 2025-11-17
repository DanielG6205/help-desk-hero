"use client";

/**
 * Reusable auto-rolling logo carousel.
 *
 * Features:
 * - Infinite, seamless horizontal loop (no jumps)
 * - Pause on hover (configurable)
 * - Direction control (left/right)
 * - Speed control (seconds per full loop)
 * - Edge fade mask to de-emphasize clipping
 * - Respects prefers-reduced-motion (disables animation)
 *
 * Usage:
 * import { Firebase, Zed, Vercel, ReactLogo, MicrosoftAzure } from "./LogoIcons";
 *
 * <LogoCarousel
 *   items={[
 *     { id: "firebase", node: <Firebase height={40} /> },
 *     { id: "zed", node: <Zed height={36} /> },
 *     { id: "vercel", node: <Vercel height={28} /> },
 *     { id: "react", node: <ReactLogo height={38} /> },
 *     { id: "azure", node: <MicrosoftAzure height={34} /> },
 *   ]}
 *   speed={18}
 *   pauseOnHover
 *   direction="left"
 *   height={56}
 *   gap={48}
 *   mask
 * />
 */

import React from "react";

type CSSVars = React.CSSProperties & Record<`--${string}`, string | number>;

export type LogoItem = {
  id: string;
  node: React.ReactNode;
};

type LogoSequenceItem = LogoItem & { original: boolean };

export type LogoCarouselProps = {
  items: LogoItem[];
  /**
   * Seconds per full loop. Minimum 4 seconds enforced.
   * Default: 20
   */
  speed?: number;
  /**
   * Pause animation on hover.
   * Default: true
   */
  pauseOnHover?: boolean;
  /**
   * Scroll direction.
   * Default: "left"
   */
  direction?: "left" | "right";
  /**
   * Fixed track height (number in px or CSS size).
   * Default: 56
   */
  height?: number | string;
  /**
   * Gap between items, in px.
   * Default: 48
   */
  gap?: number;
  /**
   * Add an edge fade mask.
   * Default: true
   */
  mask?: boolean;
  /**
   * Wrapper className passthrough.
   */
  className?: string;
  /**
   * Applied to each item wrapper.
   */
  itemClassName?: string;
  /**
   * Optional accessible label. Default: "Company logos"
   */
  ariaLabel?: string;
  /**
   * Number of times to duplicate the sequence inside the animated track.
   * Must be >= 2 for seamless loop.
   * Default: 2
   */
  duplicate?: number;
};

export default function LogoCarousel({
  items,
  speed = 20,
  pauseOnHover = true,
  direction = "left",
  height = 56,
  gap = 48,
  mask = true,
  className,
  itemClassName,
  ariaLabel = "Company logos",
  duplicate = 2,
}: LogoCarouselProps) {
  const safeSpeed = Math.max(4, speed);
  const heightValue = typeof height === "number" ? `${height}px` : height;
  const gapValue = `${gap}px`;

  // Duplicate the content for seamless loop
  const copies = Math.max(2, Math.floor(duplicate));
  const sequence: LogoSequenceItem[] = Array.from({ length: copies })
    .map((_, copyIdx) =>
      items.map((it) => ({
        id: `${it.id}__copy${copyIdx}`,
        node: it.node,
        original: copyIdx === 0, // mark originals for accessibility
      })),
    )
    .flat();

  const maskStyle: React.CSSProperties | undefined = mask
    ? {
        maskImage:
          "linear-gradient(to right, rgba(0,0,0,0), #000 10%, #000 90%, rgba(0,0,0,0))",
        WebkitMaskImage:
          "linear-gradient(to right, rgba(0,0,0,0), #000 10%, #000 90%, rgba(0,0,0,0))",
      }
    : undefined;

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className={[
        "relative overflow-hidden w-full",
        pauseOnHover ? "lc-pause-on-hover" : "",
        className || "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={maskStyle}
    >
      <div
        className={[
          "lc-track-wrapper",
          direction === "right" ? "lc-dir-right" : "lc-dir-left",
        ].join(" ")}
        style={
          {
            // CSS variables
            ["--lc-duration" as `--${string}`]: `${safeSpeed}s`,
            ["--lc-gap" as `--${string}`]: gapValue,
            ["--lc-height" as `--${string}`]: heightValue,
          } as CSSVars
        }
      >
        <div className="lc-track">
          {sequence.map((it, idx) => (
            <span
              key={it.id}
              className={[
                "lc-item inline-flex items-center justify-center shrink-0",
                itemClassName || "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-hidden={!it.original}
              style={{
                height: heightValue,
              }}
            >
              {/* Wrap content to normalize inline spacing */}
              <span className="inline-flex items-center opacity-90 hover:opacity-100 transition-opacity">
                {it.node}
              </span>
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Layout + base */
        .lc-track-wrapper {
          position: relative;
          height: var(--lc-height);
        }
        .lc-track {
          display: inline-flex;
          align-items: center;
          gap: var(--lc-gap);
          height: var(--lc-height);
          will-change: transform;
          animation-name: lc-slide-left;
          animation-duration: var(--lc-duration);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .lc-dir-right .lc-track {
          animation-name: lc-slide-right;
        }

        /* Pause on hover */
        .lc-pause-on-hover:hover .lc-track {
          animation-play-state: paused;
        }

        /* Reduced motion accessibility */
        @media (prefers-reduced-motion: reduce) {
          .lc-track {
            animation: none !important;
            transform: none !important;
          }
        }

        /* Keyframes:
           We translate by 50% because the content is duplicated,
           producing a seamless loop with variable item widths. */
        @keyframes lc-slide-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes lc-slide-right {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
