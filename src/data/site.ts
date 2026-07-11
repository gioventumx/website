import type { NavItem, Branch, SocialLink, FooterLink } from "./types";

export const site = {
  brand: { name: "Gioventù", tagline: "Dermatología y Estética", logo: "/gioventu-logo.svg" },

  nav: [
    { label: "Dermatología", href: "/dermatologia/" },
    { label: "Medicina Estética", href: "/estetica/" },
    { label: "Wellness Spa", href: "/wellness/" },
  ] satisfies NavItem[],

  phone: { label: "Llama ahora", display: "55 4052 6837", tel: "5540526837" },
  cta: { label: "Agendar cita", href: "#" },

  branches: [
    {
      key: "cuspide",
      name: "Cúspide",
      phone: "55 5349 2712",
      whatsapp: "55 4058 3256",
      address:
        "Avenida Lomas Verdes 1200, Local 53-C, Lomas Verdes, 53125, Naucalpan, Estado de México",
      locality: "Naucalpan de Juárez",
      postalCode: "53125",
      mapsUrl: "https://maps.app.goo.gl/fhJU362MAcHB1k2W9",
      hours: "Lun a Vie 10:00–19:00 · Sáb 9:00–14:00 · Dom cerrado",
      openingHours: [
        { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "19:00" },
        { days: ["Saturday"], opens: "09:00", closes: "14:00" },
      ],
      rating: { value: "4.6", count: 103 },
      // Coordenadas exactas del pin de Google Maps.
      geo: { lat: 19.514679, lng: -99.265757 },
    },
    {
      key: "antigua",
      name: "Antigua",
      phone: "55 5308 2028",
      whatsapp: "55 6149 6600",
      address:
        "Av. Dr. Jiménez Cantú Lote A-2-5, Oficina Torre 2, 212, Hacienda de Valle Escondido, 52938, Estado de México",
      locality: "Atizapán de Zaragoza",
      postalCode: "52938",
      mapsUrl: "https://maps.app.goo.gl/nWJNj8796ijjmGjJ8",
      hours: "Lun a Vie 10:00–19:00 · Sáb 10:00–14:00 · Dom cerrado",
      openingHours: [
        { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "19:00" },
        { days: ["Saturday"], opens: "10:00", closes: "14:00" },
      ],
      rating: { value: "4.8", count: 83 },
      // Coordenadas exactas del pin de Google Maps.
      geo: { lat: 19.572154, lng: -99.302732 },
    },
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
        { label: "Depilación Láser", href: "/depilacion-laser/" },
        { label: "Blog", href: "/blog/" },
      ] satisfies FooterLink[],
    },
    branchesTitle: "Sucursales",
    legal: "© 2026 Gioventù — Todos los derechos reservados.",
    credit: "Created by SCNDAL",
    creditLogo: "/Black-webtag-scndal.svg",
  },
};
