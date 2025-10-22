"use client";
import { useEffect, useRef } from "react";

export default function Snowfall() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create snowflakes
    const snowflakes = Array.from({ length: 100 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3 + 1,
      d: Math.random() + 0.5,
    }));

    let angle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "white";
      ctx.beginPath();
      for (const flake of snowflakes) {
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
      }
      ctx.fill();
      update();
      requestAnimationFrame(draw);
    };

    const update = () => {
      angle += 0.01;
      for (const flake of snowflakes) {
        flake.y += Math.pow(flake.d, 2) + 1;
        flake.x += Math.sin(angle) * 0.5;

        // Reset when off-screen
        if (flake.y > height) {
          flake.y = -flake.r;
          flake.x = Math.random() * width;
        }
      }
    };

    draw();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
}
