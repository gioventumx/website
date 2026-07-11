"use client";

import { useEffect, useRef, useState } from "react";
import type * as Matter from "matter-js";
import { tratamientos } from "@/data/tratamientos";

type Seg = { text: string; accent?: boolean | "service" | "attribute" };
type Chip = { slug: string; label: string; tint?: boolean };
type Props = { statement?: Seg[]; chips?: Chip[]; id?: string };

// Sección "lluvia": statement de marca + chips que caen con física. Reutilizable:
// recibe statement/chips/id por props (por defecto, los del Home).
export function ResultsRain({
  statement = tratamientos.statement,
  chips = tratamientos.chips,
  id = "resultados",
}: Props = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const pitRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const startedRef = useRef(false);
  const [mode, setMode] = useState<"static" | "physics">("static");

  // Decide una sola vez (al entrar en viewport) si activamos la física.
  // Con reduced-motion no hacemos nada: se queda en modo estático (fallback).
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Móvil (abajo de md): los chips están ocultos (hidden md:flex), así que no
    // arrancamos la física ni el observer — nada que simular ni pit que reservar.
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            io.disconnect();
            setMode("physics");
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  // Corre la simulación cuando ya estamos en modo física (chips absolutos/ocultos).
  useEffect(() => {
    if (mode !== "physics") return;
    let cancelled = false;
    let cleanup = () => {};

    (async () => {
      const M = await import("matter-js");
      if (cancelled) return;
      cleanup = runSimulation(M, pitRef.current, chipRefs.current);
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [mode]);

  const physics = mode === "physics";
  // Alto del "pit" de la lluvia según cuántos chips caen: pocos (≤8, como faciales/
  // masajes) → pit corto para que no quede un hueco grande bajo el texto; muchos
  // (Home) → pit alto para que quepa la pila.
  const pitPb = chips.length <= 8 ? "pb-[150px]" : "pb-[280px] max-[560px]:pb-[330px]";

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`relative overflow-hidden md:scroll-mt-[96px] bg-bg px-6 md:px-10 ${
        physics ? pitPb : "pb-[clamp(56px,8vw,96px)]"
      } pt-[clamp(56px,8vw,96px)]`}
    >
      {/* Contenido: título + statement (siempre en el DOM, centrado) */}
      <div className="container-x relative z-[1] text-center">
        <p className="mx-auto max-w-[1040px] font-sans text-[clamp(1.5rem,3.2vw,2.4rem)] font-light leading-[1.35] tracking-[-0.01em] text-ink">
          {statement.map((seg, i) => {
            if (!seg.accent) {
              // Protege "ritual" de quedar huérfana: espacio duro antes de ese acento.
              const next = statement[i + 1];
              const text =
                next?.text === "ritual" && seg.text.endsWith(" ")
                  ? seg.text.slice(0, -1) + " "
                  : seg.text;
              return <span key={i}>{text}</span>;
            }
            return (
              <span
                key={i}
                className={`font-accent ${seg.accent === "attribute" ? "text-ink" : "text-brand"}`}
              >
                {seg.text}
              </span>
            );
          })}
        </p>
      </div>

      {/* Capa de chips. Estático = fila bajo el texto · Física = overlay que cubre la sección. */}
      <div
        ref={pitRef}
        className={
          physics
            ? "pointer-events-none absolute inset-0 z-[2]"
            : // Chips ocultos en móvil (hidden); a partir de md se muestran (fila
              // estática o, tras el scroll, overlay de física).
              "relative z-[1] mt-10 hidden md:flex flex-wrap justify-center gap-3.5 px-6"
        }
      >
        {chips.map((chip, i) => (
          <span
            key={chip.slug}
            ref={(el) => {
              chipRefs.current[i] = el;
            }}
            className={`group inline-flex select-none items-center gap-[0.5em] rounded-full border border-line px-[1.15em] py-[0.6em] text-[0.95rem] font-medium text-ink shadow-card transition-colors duration-300 hover:border-brand hover:bg-brand hover:text-white max-[560px]:text-[0.82rem] ${
              chip.tint ? "bg-brand-tint" : "bg-white"
            } ${
              physics
                ? "pointer-events-auto absolute left-0 top-0 cursor-grab whitespace-nowrap [visibility:hidden] will-change-transform active:cursor-grabbing"
                : ""
            }`}
          >
            <span className="h-[9px] w-[9px] shrink-0 rounded-full bg-brand group-hover:bg-white" />
            {chip.label}
          </span>
        ))}
      </div>
    </section>
  );
}

/**
 * Monta el mundo de Matter.js sobre el pit, sincroniza los cuerpos con los chips
 * del DOM y devuelve una función de limpieza. El arrastre solo se habilita en
 * punteros finos (desktop); en touch se prioriza el scroll.
 */
function runSimulation(
  M: typeof Matter,
  pit: HTMLDivElement | null,
  chipEls: (HTMLSpanElement | null)[]
): () => void {
  const chips = chipEls.filter(Boolean) as HTMLSpanElement[];
  if (!pit || chips.length === 0) return () => {};

  const { Engine, Runner, Bodies, Body, Composite, World, Mouse, MouseConstraint } = M;

  const engine = Engine.create();
  engine.gravity.y = 1;

  const W = pit.clientWidth;
  const H = pit.clientHeight;
  const wall = { isStatic: true };
  Composite.add(engine.world, [
    Bodies.rectangle(W / 2, H + 40, W + 300, 80, wall), // piso al fondo
    Bodies.rectangle(-40, H / 2, 80, H * 3, wall), // muro izquierdo
    Bodies.rectangle(W + 40, H / 2, 80, H * 3, wall), // muro derecho
  ]);

  // Arrastre solo en desktop (puntero fino). En touch: sin MouseConstraint → scroll libre.
  const canDrag = window.matchMedia("(pointer: fine)").matches;
  let mc: Matter.MouseConstraint | null = null;
  let mouseMove: EventListener | null = null;
  let mouseUp: EventListener | null = null;

  if (canDrag) {
    const mouse = Mouse.create(pit) as Matter.Mouse & Record<string, EventListener>;
    // 1) No robar el scroll: quitar el listener de 'wheel' (hace preventDefault) y
    //    los de touch que Matter añade al elemento.
    pit.removeEventListener("wheel", mouse.mousewheel);
    pit.removeEventListener("touchmove", mouse.mousemove);
    pit.removeEventListener("touchstart", mouse.mousedown);
    pit.removeEventListener("touchend", mouse.mouseup);
    // 2) Arrastre robusto: move/up al window (mousedown queda en el pit vía bubbling
    //    desde el chip). Así el drag no se pega al salir del chip y las zonas vacías
    //    del pit (pointer-events:none) dejan pasar scroll/clicks.
    pit.removeEventListener("mousemove", mouse.mousemove);
    pit.removeEventListener("mouseup", mouse.mouseup);
    mouseMove = mouse.mousemove;
    mouseUp = mouse.mouseup;
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);

    mc = MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.2, render: { visible: false } },
    });
    Composite.add(engine.world, mc);
  }

  const runner = Runner.create();
  Runner.run(runner, engine);

  const bodies: (Matter.Body | null)[] = new Array(chips.length).fill(null);

  // Reinsertar un chip arriba (misma lógica que la lluvia inicial) para que
  // "vuelva a caer". Se usa cuando un cuerpo escapa por tunneling al arrastrarlo.
  const respawn = (b: Matter.Body) => {
    const x = 80 + Math.random() * Math.max(1, W - 160);
    Body.setPosition(b, { x, y: -80 });
    Body.setVelocity(b, { x: 0, y: 0 });
    Body.setAngularVelocity(b, 0);
    Body.setAngle(b, 0);
  };

  let raf = requestAnimationFrame(function sync() {
    for (let i = 0; i < bodies.length; i++) {
      const b = bodies[i];
      if (!b) continue;
      const el = chips[i];
      // Si un chip se escapó de la zona (atravesó el piso o los muros al arrastrarlo
      // con fuerza), lo devolvemos arriba para que caiga de nuevo. No lo tocamos si es
      // el que se está arrastrando ahora mismo, para no arrancárselo al cursor.
      const escaped =
        b.position.y > H + 200 || b.position.x < -200 || b.position.x > W + 200;
      if (escaped && !(mc && mc.body === b)) {
        respawn(b);
      }
      // Legibilidad: la pastilla es simétrica a 180°, así que reducimos el ángulo
      // MOSTRADO a [-90°, 90°]. El texto nunca queda de cabeza y el contorno sigue
      // coincidiendo con el cuerpo físico (mismo footprint, no se desincroniza).
      let a = b.angle % Math.PI;
      if (a > Math.PI / 2) a -= Math.PI;
      else if (a < -Math.PI / 2) a += Math.PI;
      el.style.transform = `translate(${b.position.x - el.offsetWidth / 2}px, ${
        b.position.y - el.offsetHeight / 2
      }px) rotate(${a}rad)`;
    }
    raf = requestAnimationFrame(sync);
  });

  // Lluvia: cae uno por uno.
  const timers: number[] = [];
  chips.forEach((el, i) => {
    const t = window.setTimeout(() => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const x = 80 + Math.random() * Math.max(1, W - 160);
      const body = Bodies.rectangle(x, -80, w, h, {
        restitution: 0.35,
        friction: 0.6,
        frictionAir: 0.012,
        chamfer: { radius: h / 2 },
      });
      // Variante: ~55% de los chips caen en diagonal (inclinación + giro + empuje lateral)
      // en vez de rectos, para que la lluvia no se sienta uniforme.
      if (Math.random() < 0.55) {
        const dir = Math.random() < 0.5 ? -1 : 1;
        Body.setAngle(body, dir * (0.22 + Math.random() * 0.35));
        Body.setAngularVelocity(body, dir * (0.04 + Math.random() * 0.08));
        Body.setVelocity(body, { x: dir * (2 + Math.random() * 3), y: 0 });
      }
      bodies[i] = body;
      el.style.visibility = "visible";
      Composite.add(engine.world, body);
    }, 350 * i);
    timers.push(t);
  });

  return () => {
    cancelAnimationFrame(raf);
    timers.forEach((t) => clearTimeout(t));
    if (mouseMove) window.removeEventListener("mousemove", mouseMove);
    if (mouseUp) window.removeEventListener("mouseup", mouseUp);
    Runner.stop(runner);
    World.clear(engine.world, false);
    Engine.clear(engine);
  };
}
