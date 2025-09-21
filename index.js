// Conteo de pétalos por capa
const PETALS = { outer: 48, mid: 44, inner: 40 };
const head = document.querySelector(".head");

function makeLayer(count, cls, rotateOffsetDeg = 0, swayBase = 5.6) {
  const layer = document.createElement("div");
  layer.className = `layer layer--${cls}`;
  const frag = document.createDocumentFragment();

  for (let i = 0; i < count; i++) {
    // WRAP con el giro base
    const wrap = document.createElement("span");
    wrap.className = "petal-wrap";
    const step = 360 / count;
    const angle = step * i + rotateOffsetDeg;
    wrap.style.transform = `rotate(${angle}deg)`;

    // Pétalo animado (sin perder el giro del wrap)
    const p = document.createElement("span");
    p.className = `petal petal--${cls}`;

    // variaciones naturales por pétalo
    const jitterL = 1 + Math.sin(i * 1.61) * 0.05;
    const jitterW = 1 + Math.cos(i * 1.27) * 0.06;

    const lenBase = cls === "outer" ? 1.0 : cls === "mid" ? 0.82 : 0.66;
    const widBase = cls === "outer" ? 1.0 : cls === "mid" ? 0.92 : 0.82;

    p.style.setProperty(
      "--l",
      `calc(var(--petal-l) * ${(lenBase * jitterL).toFixed(3)})`
    );
    p.style.setProperty(
      "--w",
      `calc(var(--petal-w) * ${(widBase * jitterW).toFixed(3)})`
    );

    // desfase de animación
    const dur =
      swayBase +
      (i % 7) * 0.18 +
      (cls === "outer" ? 0.4 : cls === "mid" ? 0.25 : 0.1);
    p.style.animationDuration = `${dur.toFixed(2)}s`;
    p.style.animationDelay = `${(i * 0.05).toFixed(2)}s`;

    wrap.appendChild(p);
    frag.appendChild(wrap);
  }

  layer.appendChild(frag);
  return layer;
}

// Construye la gerbera (siempre abierta)
(function buildGerbera() {
  head.prepend(
    makeLayer(PETALS.outer, "outer", 0),
    makeLayer(PETALS.mid, "mid", 360 / PETALS.mid / 2),
    makeLayer(PETALS.inner, "inner", 360 / PETALS.inner / 3)
  );
})();
