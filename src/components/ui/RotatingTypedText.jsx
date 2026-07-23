"use client";

import { useEffect, useState } from "react";

export function RotatingTypedText({
  lines,
  className,
  textClassName,
  cursorClassName,
  typingSpeedMs = 32,
  holdMs = 1100,
  fadeMs = 280,
  showCursor = true,
}) {
  const safeLines = lines.filter(Boolean);
  const [lineIndex, setLineIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const [phase, setPhase] = useState("typing");

  const currentLine = safeLines[lineIndex] ?? "";
  const typed = currentLine.slice(0, typedLength);

  useEffect(() => {
    if (!safeLines.length) return;

    const timeout = setTimeout(() => {
      if (phase === "typing") {
        if (typedLength < currentLine.length) {
          setTypedLength((len) => Math.min(len + 1, currentLine.length));
          return;
        }
        setPhase("holding");
        return;
      }

      if (phase === "holding") {
        setPhase("fading");
        return;
      }

      setPhase("typing");
      setTypedLength(0);
      setLineIndex((idx) => (idx + 1) % safeLines.length);
    }, phase === "typing" ? typingSpeedMs : phase === "holding" ? holdMs : fadeMs);

    return () => clearTimeout(timeout);
  }, [currentLine.length, fadeMs, holdMs, phase, safeLines.length, typedLength, typingSpeedMs]);

  return (
    <div
      className={[
        "min-h-[2.25rem] md:min-h-[2.5rem] transition-opacity duration-300",
        phase === "fading" ? "opacity-0" : "opacity-100",
        className ?? "",
      ].join(" ")}
      aria-live="polite"
    >
      <span className={textClassName ?? "font-semibold text-secondary"}>{typed}</span>
      {showCursor ? (
        <span
          className={
            cursorClassName ??
            "ml-0.5 inline-block w-[0.5ch] animate-pulse text-primary"
          }
        >
          |
        </span>
      ) : null}
    </div>
  );
}