import type { NavItem, Branch, SocialLink, FooterLink } from "./types";

export const site = {
  brand: { name: "Gioventù", tagline: "Dermatología y Estética" },

  nav: [
    { label: "Servicios", href: "#servicios" },
    { label: "Nosotros", href: "/conocenos/" },
    { label: "Sucursales", href: "#contacto" },
  ] satisfies NavItem[],

  phone: { label: "Llama ahora", display: "55 4052 6837", tel: "5540526837" },
  cta: { label: "Agendar cita", href: "#" },

  branches: [
    { name: "Cúspide", phone: "55 5349 2712", whatsapp: "55 4058 3256" },
    { name: "Antigua", phone: "55 5308 2028", whatsapp: "55 6149 6600" },
  ] satisfies Branch[],

  socials: [
    { platform: "instagram", href: "https://www.instagram.com/gioventuderma/", label: "Instagram" },
    { platform: "facebook", href: "https://www.facebook.com/gioventuderma/", label: "Facebook" },
    { platform: "tiktok", href: "https://www.tiktok.com/@gioventuderma", label: "TikTok" },
  ] satisfies SocialLink[],

  footer: {
    about:
      "Centro dermatológico y estético. Bienestar, ciencia y tecnología para una piel radiante.",
    assistance: {
      title: "Asistencia",
      links: [
        { label: "Nosotros", href: "/conocenos/" },
        { label: "Dermatología", href: "/dermatologia/" },
        { label: "Estética", href: "/estetica/" },
        { label: "Wellness", href: "/wellness/" },
        { label: "Blog", href: "/blog/" },
      ] satisfies FooterLink[],
    },
    branchesTitle: "Sucursales",
    legal: "© 2026 Gioventù — Todos los derechos reservados.",
    credit: "Created by SCNDAL",
  },
};
