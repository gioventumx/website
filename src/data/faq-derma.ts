// FAQ propias de la página /dermatologia/. Por ahora son las mismas del Home
// (placeholder); se cambiarán por preguntas específicas de dermatología. Viven en
// su propio archivo para editarlas sin afectar las del Home (data/faq.ts).

import type { FaqItem } from "./faq";

export const faqDerma: FaqItem[] = [
  {
    q: "¿Cómo agendo una cita?",
    a: "Puedes agendar directo desde el botón Agendar cita de esta página o por WhatsApp. Eliges el área que te interesa y tu sucursal, y nuestro equipo confirma tu horario.",
  },
  {
    q: "¿Qué servicios ofrecen en Gioventù?",
    a: "Somos un centro integral con tres áreas: dermatología (la salud de tu piel), medicina estética (realzar y rejuvenecer tu apariencia) y wellness (masajes y faciales). Tienes las tres en un mismo lugar, y te orientamos hacia la que necesitas.",
  },
  {
    q: "¿Dónde están ubicadas sus sucursales?",
    a: "Tenemos dos: Gioventù Plaza Antigua y Gioventù Plaza Cúspide, ambas en el Estado de México.",
  },
  {
    q: "¿Cuánto dura un tratamiento?",
    a: "Depende del procedimiento: la mayoría toma entre 30 y 90 minutos. En tu valoración inicial te damos el tiempo estimado de tu tratamiento específico.",
  },
  {
    q: "¿Los tratamientos tienen tiempo de recuperación?",
    a: "La mayoría de nuestros tratamientos son mínimamente invasivos y te permiten retomar tu día. Si alguno requiere cuidados especiales, te lo indicamos antes de empezar.",
  },
  {
    q: "¿Sus tratamientos son seguros?",
    a: "Sí. Contamos con dermatólogos y médicos especializados, tecnología de grado médico y protocolos personalizados para cada tipo de piel.",
  },
  {
    q: "¿En cuánto tiempo veré resultados?",
    a: "Varía según el tratamiento. Algunos muestran mejoras desde la primera sesión y otros son progresivos. En tu valoración te explicamos qué esperar en tu caso.",
  },
  {
    q: "¿Cuánto cuesta un tratamiento?",
    a: "El precio depende de tu caso, y no podemos darte una cifra exacta sin valorarte primero: cada piel y cada tratamiento son distintos. Por eso el primer paso siempre es una valoración, donde el especialista evalúa tu situación y te da un plan con costos claros.",
  },
  {
    q: "Quiero un tratamiento específico, ¿me lo hacen directo?",
    a: "En muchos casos sí, pero algunos procedimientos requieren una valoración previa. Por ejemplo, antes de retirar un lunar, el dermatólogo necesita determinar si es benigno. Cuando aplica, esta revisión cuida tu salud y asegura que el tratamiento sea el adecuado para ti.",
  },
];
