"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use refs to store mouse positions for smooth interpolation (inertia)
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check if device supports hover (is not a touch device)
    const hasHover = window.matchMedia("(pointer: fine)").matches;
    if (!hasHover) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      // Instantly position the dot
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      // Check if target or parent is a clickable element
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") || 
        target.closest("[role='button']") ||
        target.classList.contains("interactive-hover");

      if (isClickable) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // Animation loop for the outer ring (lerp)
    let animationFrameId: number;
    const lerp = (start: number, end: number, speed: number) => {
      return start + (end - start) * speed;
    };

    const updateRingPosition = () => {
      // Lerp ring positions
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.15);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.15);

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updateRingPosition);
    };

    updateRingPosition();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRingRef}
        className={`fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full pointer-events-none z-[9999] transition-all duration-300 ease-out border ${
          isHovered
            ? "scale-175 bg-primary/10 border-accent shadow-[0_0_15px_rgba(0,255,163,0.5)]"
            : "scale-100 bg-transparent border-primary/50 shadow-[0_0_8px_rgba(0,245,255,0.2)]"
        }`}
        style={{
          transform: "translate3d(0px, 0px, 0)",
          willChange: "transform",
        }}
      />
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 w-2.5 h-2.5 -ml-1.25 -mt-1.25 rounded-full pointer-events-none z-[9999] transition-transform duration-75 ${
          isHovered ? "bg-accent scale-50" : "bg-primary"
        }`}
        style={{
          transform: "translate3d(0px, 0px, 0)",
          willChange: "transform",
        }}
      />
    </>
  );
}
