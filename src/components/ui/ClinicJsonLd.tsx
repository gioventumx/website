import { site } from "@/data/site";
import type { Branch } from "@/data/types";

// Schema LocalBusiness (MedicalClinic) por sucursal: dirección, teléfono, horarios,
// calificación real y mapa. Se emite UNA sola vez (desde el Footer, que va en el
// layout raíz). El `geo` solo se incluye cuando hay coordenadas reales (evita datos
// inventados en YMYL); mientras tanto la ubicación se resuelve por address + hasMap.
const SITE = "https://gioventu.com.mx";

const tel = (n: string) => `+52${n.replace(/\D/g, "")}`;

export function ClinicJsonLd() {
  const nodes = site.branches.map((b: Branch) => {
    // streetAddress = todo lo previo al código postal (sin inventar localidad).
    const street = b.address.split(/,\s*\d{5}/)[0].trim();
    return {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "@id": `${SITE}/#sucursal-${b.name.toLowerCase()}`,
      name: `Gioventù ${b.name}`,
      url: SITE,
      image: `${SITE}/favicon-gioventu.webp`,
      telephone: tel(b.phone),
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: street,
        addressLocality: b.locality,
        addressRegion: "Estado de México",
        postalCode: b.postalCode,
        addressCountry: "MX",
      },
      hasMap: b.mapsUrl,
      openingHoursSpecification: b.openingHours.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: b.rating.value,
        reviewCount: b.rating.count,
        bestRating: "5",
      },
      ...(b.geo
        ? { geo: { "@type": "GeoCoordinates", latitude: b.geo.lat, longitude: b.geo.lng } }
        : {}),
    };
  });

  return (
    <>
      {nodes.map((node) => (
        <script
          key={node["@id"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </>
  );
}
