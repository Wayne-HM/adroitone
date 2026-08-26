"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { DiagramKey } from "@/data/services";

/**
 * Compact animated diagrams used inside the services experience.
 * Each is an abstract, original visual — no stock imagery.
 */
export function ServiceDiagram({
  diagram,
  accent,
}: {
  diagram: DiagramKey;
  accent: string;
}) {
  const reduce = useReducedMotion();

  if (diagram === "talent") {
    return (
      <svg viewBox="0 0 260 200" fill="none" aria-hidden className="h-full w-full">
        <g stroke={accent} strokeWidth="1" opacity="0.35" strokeDasharray="3 6">
          <path d="M40 60 C 90 20, 170 20, 220 60" />
          <path d="M40 140 C 90 180, 170 180, 220 140" />
        </g>
        <motion.path
          d="M40 100 H 220"
          stroke={accent}
          strokeWidth="1.2"
          opacity={reduce ? 0.5 : undefined}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
        {[
          { x: 40, y: 60 },
          { x: 40, y: 100 },
          { x: 40, y: 140 },
        ].map((p, i) => (
          <circle key={`l${i}`} cx={p.x} cy={p.y} r="7" stroke="#8b9bff" strokeWidth="1.4" />
        ))}
        {[60, 100, 140].map((y, i) => (
          <circle key={`r${i}`} cx="220" cy={y} r="7" stroke={accent} strokeWidth="1.4" />
        ))}
        {!reduce &&
          [0, 1, 2].map((i) => (
            <motion.circle
              key={`d${i}`}
              r="2.4"
              fill={accent}
              initial={{ cx: 47, cy: 60 + i * 40, opacity: 0 }}
              animate={{ cx: [47, 213], cy: 60 + i * 40, opacity: [0, 1, 1, 0] }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 0.8,
                ease: "easeInOut",
              }}
            />
          ))}
      </svg>
    );
  }

  if (diagram === "ai") {
    return (
      <svg viewBox="0 0 260 200" fill="none" aria-hidden className="h-full w-full">
        <rect x="24" y="76" width="44" height="48" rx="8" stroke="#8b9bff" strokeWidth="1.4" />
        <path d="M32 92h28M32 102h20M32 112h24" stroke="#8b9bff" strokeWidth="1" opacity="0.6" />
        <path d="M68 100h34" stroke={accent} strokeWidth="1.2" opacity="0.6" />
        <motion.g
          animate={reduce ? {} : { rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          style={{ originX: "130px", originY: "100px" }}
        >
          <circle cx="130" cy="100" r="30" stroke={accent} strokeWidth="1.4" strokeDasharray="10 7" />
        </motion.g>
        <circle cx="130" cy="100" r="12" fill={accent} opacity="0.18" />
        <path
          d="M130 91l2.2 6.8L139 100l-6.8 2.2L130 109l-2.2-6.8L121 100l6.8-2.2z"
          fill={accent}
        />
        {[46, 78, 110].map((y, i) => (
          <g key={i}>
            <path d={`M160 100 C 190 100, 190 ${y}, 222 ${y}`} stroke={accent} strokeWidth="1" opacity="0.45" />
            <circle cx="228" cy={y} r="5" stroke={accent} strokeWidth="1.3" />
          </g>
        ))}
        {!reduce && (
          <motion.circle
            r="2.2"
            fill="#fff"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ offsetPath: "path('M68 100 H 118')", offsetRotate: "0deg" } as React.CSSProperties}
          />
        )}
      </svg>
    );
  }

  if (diagram === "software") {
    return (
      <svg viewBox="0 0 260 200" fill="none" aria-hidden className="h-full w-full">
        <rect x="52" y="36" width="156" height="128" rx="12" stroke="#8b9bff" strokeWidth="1.4" />
        <path d="M52 62h156" stroke="#8b9bff" strokeWidth="1" opacity="0.5" />
        <circle cx="68" cy="49" r="2.5" fill="#ff6b6b" opacity="0.8" />
        <circle cx="79" cy="49" r="2.5" fill="#ffd166" opacity="0.8" />
        <circle cx="90" cy="49" r="2.5" fill="#43d9e6" opacity="0.8" />
        <g strokeLinecap="round" strokeWidth="4">
          <motion.line x1="70" x2="120" y1="82" y2="82" stroke="#8b9bff"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} />
          <motion.line x1="86" x2="150" y1="98" y2="98" stroke={accent}
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.45 }} />
          <motion.line x1="86" x2="176" y1="114" y2="114" stroke="#8b9bff" opacity="0.55"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.65 }} />
          <motion.line x1="70" x2="138" y1="130" y2="130" stroke={accent} opacity="0.75"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.85 }} />
        </g>
        {!reduce && (
          <motion.rect
            width="2.5"
            height="16"
            rx="1"
            fill={accent}
            animate={{ x: [152, 152], y: [90, 106] }}
            transition={{ duration: 1.1, repeat: Infinity, repeatType: "reverse" }}
          />
        )}
      </svg>
    );
  }

  // cloud
  return (
    <svg viewBox="0 0 260 200" fill="none" aria-hidden className="h-full w-full">
      {[0, 1, 2].map((i) => {
        const y = 58 + i * 42;
        return (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <rect x="56" y={y} width="148" height="26" rx="13"
              stroke={i === 1 ? accent : "#8b9bff"} strokeWidth="1.3" />
            <circle cx="74" cy={y + 13} r="3.5" fill={i === 1 ? accent : "#8b9bff"} opacity="0.85" />
            <path d={`M88 ${y + 13}h${96 - i * 22}`} stroke={i === 1 ? accent : "#8b9bff"} strokeWidth="1" opacity="0.4" />
          </motion.g>
        );
      })}
      {!reduce && (
        <>
          <motion.circle
            cx="205" r="2.2" fill={accent}
            animate={{ cy: [97, 139, 181] , opacity: [0, 1, 1, 0]}}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <ellipse cx="130" cy="188" rx="70" ry="6" stroke={accent} strokeWidth="1" opacity="0.25" strokeDasharray="4 6" />
        </>
      )}
    </svg>
  );
}
