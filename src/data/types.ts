export type NavItem = { label: string; href: string };
export type CTA = { label: string; href: string };
export type OpeningHours = { days: string[]; opens: string; closes: string };

export type Branch = {
  name: string;
  /** Teléfono principal (header). */
  phone: string;
  /** Número de WhatsApp (header). */
  whatsapp: string;
  /** Dirección completa (footer + schema PostalAddress). */
  address: string;
  /** Municipio/localidad (schema addressLocality). */
  locality: string;
  postalCode: string;
  /** Link real a la ficha de Google Business (place_id) — footer + schema hasMap. */
  mapsUrl: string;
  /** Texto de horarios para el footer. */
  hours: string;
  /** Horarios estructurados para openingHoursSpecification (schema). */
  openingHours: OpeningHours[];
  /** Calificación real de esa sucursal en Google (schema aggregateRating). */
  rating: { value: string; count: number };
  /** Coordenadas para el geo del schema. TODO: pendientes de dato real. */
  geo?: { lat: number; lng: number };
};
export type FooterLink = { label: string; href: string };

export type SocialPlatform = "instagram" | "facebook" | "tiktok";
export type SocialLink = { platform: SocialPlatform; href: string; label: string };

export type FeatureIcon = "tech" | "care" | "team";
export type Feature = { title: string; description: string; icon: FeatureIcon };

export type StatementSegment = { text: string; accent?: "service" | "attribute" };

export type Service = {
  slug: string;
  category: string;
  title: string;
  description: string;
  href: string;
  more: string;
  image: string;
};

export type Review = {
  author: string;
  initial: string;
  rating: number;
  text: string;
};
