import { useEffect, useRef } from "react";
import "./GridBackground.css";

const GridBackground = ({ children, className = "" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");
    let animId;
    let angle = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Generate bintang sekali saja
    const STAR_COUNT = 200;
    const stars = Array.from({ length: STAR_COUNT }, (_, i) => {
      const seed = (n) => { const x = Math.sin(i * 127.1 + n * 311.7) * 43758.5; return x - Math.floor(x); };
      return {
        x:        seed(1),   // 0-1 normalized
        y:        seed(2),
        size:     seed(3) * 2.2 + 0.3,
        opacity:  seed(4) * 0.7 + 0.2,
        twinkle:  seed(5) * Math.PI * 2,  // phase offset
        speed:    seed(6) * 0.0003 + 0.0001, // rotation speed individual
        color:    (() => {
          const r = seed(7);
          if (r < 0.15) return [180, 210, 255]; // biru (bintang panas)
          if (r < 0.25) return [255, 220, 180]; // kuning-oranye (bintang tua)
          if (r < 0.30) return [255, 180, 180]; // merah (bintang raksasa)
          return [255, 255, 255];               // putih (default)
        })(),
      };
    });

    // Nebula clouds (awan bercahaya samar)
    const nebulae = Array.from({ length: 4 }, (_, i) => {
      const seed = (n) => { const x = Math.sin(i * 91.3 + n * 213.7) * 43758.5; return x - Math.floor(x); };
      return {
        x:      seed(1),
        y:      seed(2),
        radius: seed(3) * 120 + 80,
        color:  i % 2 === 0 ? [59, 130, 246] : [139, 92, 246],
        opacity: seed(4) * 0.04 + 0.01,
      };
    });

    const draw = (time) => {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;

      // Clear
      ctx.clearRect(0, 0, W, H);

      // Rotation angle — sangat lambat seperti rotasi bumi
      angle = time * 0.000015;

      // Gambar nebula dulu (paling belakang)
      nebulae.forEach((neb) => {
        const nx = (neb.x - 0.5) * W * 1.5;
        const ny = (neb.y - 0.5) * H * 1.5;
        const rx = cx + nx * Math.cos(angle) - ny * Math.sin(angle);
        const ry = cy + nx * Math.sin(angle) + ny * Math.cos(angle);

        const grad = ctx.createRadialGradient(rx, ry, 0, rx, ry, neb.radius);
        grad.addColorStop(0, `rgba(${neb.color.join(',')},${neb.opacity})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(rx, ry, neb.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Gambar bintang
      stars.forEach((star) => {
        // Posisi relatif ke center (lebih luas dari canvas supaya terisi)
        const sx = (star.x - 0.5) * W * 2;
        const sy = (star.y - 0.5) * H * 2;

        // Rotasi
        const rx = cx + sx * Math.cos(angle) - sy * Math.sin(angle);
        const ry = cy + sx * Math.sin(angle) + sy * Math.cos(angle);

        // Skip kalau di luar canvas
        if (rx < -10 || rx > W + 10 || ry < -10 || ry > H + 10) return;

        // Twinkle — kedip per bintang
        const twinkle = Math.sin(time * 0.001 + star.twinkle) * 0.3 + 0.7;
        const finalOpacity = star.opacity * twinkle;
        const finalSize    = star.size * (twinkle * 0.3 + 0.7);

        const [r, g, b] = star.color;

        // Glow untuk bintang besar
        if (finalSize > 1.5) {
          const glow = ctx.createRadialGradient(rx, ry, 0, rx, ry, finalSize * 3);
          glow.addColorStop(0, `rgba(${r},${g},${b},${finalOpacity * 0.4})`);
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(rx, ry, finalSize * 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // Bintang itu sendiri
        ctx.fillStyle = `rgba(${r},${g},${b},${finalOpacity})`;
        ctx.beginPath();
        ctx.arc(rx, ry, finalSize, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={`grid-background ${className}`}>
      {/* Grid Pattern */}
      <div className="grid-pattern" />

      {/* Grid Wave */}
      <div className="grid-wave" />

      {/* Space Canvas */}
      <canvas ref={canvasRef} className="space-canvas" />

      {/* Content */}
      <div className="grid-content">{children}</div>
    </div>
  );
};

export default GridBackground;