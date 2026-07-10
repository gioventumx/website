import type { Metadata } from "next";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Breadcrumb, type Crumb } from "@/components/blog/Breadcrumb";
import { pageMetadata } from "@/lib/seo";

// noindex MIENTRAS sea borrador en revisión. Quitar `robots` y añadir la ruta al
// sitemap cuando la clínica valide legalmente el contenido.
export const metadata: Metadata = pageMetadata({
  title: "Aviso de Privacidad | Gioventù",
  description: "Aviso de privacidad de Gioventù.",
  path: "/aviso-de-privacidad/",
  noindex: true,
});

// Cuerpo del aviso (borrador de la clínica). Se OMITEN a propósito las notas internas
// del documento: el bloque "BORRADOR — NO PUBLICAR", las notas ⚠️, la tabla
// "Pendientes para la clínica" y la firma de cierre. Los campos [entre corchetes] se
// conservan visibles para que la clínica los complete.
const cuerpo = `
## 1. Identidad y domicilio del responsable

**[NOMBRE COMPLETO DEL TITULAR]**, persona física con actividad empresarial, con Registro Federal de Contribuyentes **[RFC]**, quien opera comercialmente bajo la denominación **Gioventù**, es responsable del tratamiento de sus datos personales.

**Domicilio para efectos del presente aviso:**
Av. Dr. Jiménez Cantú, Lote A-2-5, Oficina Torre 2, 212, Hacienda de Valle Escondido, C.P. 52938, Atizapán de Zaragoza, Estado de México.

**Correo electrónico de contacto:** hola@gioventu.com.mx

**Persona responsable de datos personales:** Mary Valencia

## 2. Datos personales que recabamos

### 2.1 Datos de identificación y contacto

Recabados a través del sitio web, WhatsApp Business, llamada telefónica o directamente en nuestras sucursales:

- Nombre completo
- Número telefónico
- Correo electrónico
- Sucursal de preferencia
- Servicio o tratamiento de interés

### 2.2 Datos personales sensibles

Al acudir a consulta o recibir tratamiento, recabamos:

- Estado de salud presente y pasado
- Antecedentes médicos y familiares
- Padecimientos dermatológicos y estéticos
- Alergias, medicamentos y tratamientos previos
- Fotografías clínicas del área a tratar
- **[OTROS DATOS DE SALUD QUE LA CLÍNICA RECABE — completar]**

### 2.3 Datos recabados automáticamente en el sitio web

Al navegar en gioventu.com.mx recabamos, mediante cookies y tecnologías de rastreo:

- Dirección IP y ubicación aproximada
- Tipo de navegador y dispositivo
- Páginas visitadas, tiempo de permanencia y clics
- Origen del tráfico (buscador, anuncio, red social)
- Grabaciones de la sesión de navegación (movimiento del cursor, desplazamiento e interacción con la página)

## 3. Finalidades del tratamiento

### 3.1 Finalidades primarias

Necesarias para la relación jurídica con usted:

- Agendar, confirmar y dar seguimiento a sus citas
- Prestar los servicios de dermatología, medicina estética y wellness solicitados
- Elaborar y conservar su expediente clínico conforme a la NOM-004-SSA3-2012
- Dar seguimiento a su tratamiento y evolución
- Emitir comprobantes fiscales
- Atender dudas, quejas y solicitudes
- Cumplir con obligaciones legales y sanitarias

### 3.2 Finalidades secundarias

**No necesarias** para la relación jurídica. Puede oponerse a ellas sin que afecte la prestación del servicio:

- Enviarle promociones, novedades y recordatorios de cuidado
- Invitarle a eventos y campañas de la clínica
- Realizar encuestas de satisfacción
- Elaborar estadísticas internas y estudios de mercado
- Publicar fotografías de resultados **[SOLO CON CONSENTIMIENTO ESPECÍFICO Y POR ESCRITO — confirmar si aplica]**

**Para manifestar su negativa a las finalidades secundarias**, envíe un correo a hola@gioventu.com.mx indicando su nombre y la finalidad a la que se opone. Contará con cinco días hábiles a partir de que se le dé a conocer el presente aviso.

## 4. Transferencias de datos personales

Sus datos personales pueden ser transferidos a:

| Destinatario | Finalidad | ¿Requiere su consentimiento? |
|---|---|---|
| **[NOMBRE DEL CRM]** | Gestión de citas y seguimiento de pacientes | Sí |
| Autoridades sanitarias y judiciales | Cumplimiento de obligaciones legales | No (Art. 37 LFPDPPP) |
| **[LABORATORIOS, SI APLICA]** | Estudios y análisis derivados de su tratamiento | Sí |
| **[OTROS TERCEROS — completar]** | **[FINALIDAD]** | **[SÍ/NO]** |

Salvo las excepciones previstas en el artículo 37 de la LFPDPPP, toda transferencia requiere su consentimiento.

## 5. Uso de WhatsApp Business

El agendamiento de citas puede realizarse mediante WhatsApp Business. Al contactarnos por este medio, los datos que usted comparta serán tratados conforme a este aviso, y adicionalmente estarán sujetos a las políticas de privacidad de **Meta Platforms, Inc.**, sobre las cuales Gioventù no tiene control.

**Le recomendamos no compartir información médica sensible por WhatsApp.** Los detalles de su padecimiento se tratarán en consulta.

## 6. Cookies y tecnologías de rastreo

El sitio web utiliza cookies y tecnologías similares de los siguientes proveedores:

| Herramienta | Proveedor | Finalidad |
|---|---|---|
| Google Analytics | Google LLC | Medición de tráfico y comportamiento |
| Google Ads | Google LLC | Medición y atribución de campañas publicitarias |
| Google Tag Manager | Google LLC | Administración de etiquetas de medición |
| Microsoft Clarity | Microsoft Corporation | Análisis de comportamiento y grabación de sesiones |

Puede deshabilitar las cookies desde la configuración de su navegador. Al hacerlo, algunas funciones del sitio podrían no operar correctamente.

## 7. Derechos ARCO

Usted tiene derecho a **Acceder** a sus datos, **Rectificarlos** cuando sean inexactos, **Cancelarlos** cuando considere que no se requieren, y **Oponerse** a su tratamiento para fines específicos.

Asimismo, puede **revocar el consentimiento** que nos haya otorgado y **limitar el uso o divulgación** de sus datos.

### Cómo ejercerlos

Envíe su solicitud a **hola@gioventu.com.mx**, dirigida a **Mary Valencia**, incluyendo:

1. Nombre completo y medio para comunicarle la respuesta
2. Documento que acredite su identidad (identificación oficial vigente) o la representación legal
3. Descripción clara de los datos respecto de los que busca ejercer el derecho
4. Cualquier elemento que facilite la localización de sus datos
5. En caso de rectificación, la documentación que sustente la modificación solicitada

**Plazos:** responderemos en un máximo de **20 días hábiles**. De resultar procedente, se hará efectiva dentro de los **15 días hábiles** siguientes a la respuesta.

El ejercicio de estos derechos es **gratuito**; solo deberá cubrir los gastos de envío o reproducción, en su caso.

El derecho de cancelación no procede sobre el expediente clínico durante el plazo de conservación obligatorio de cinco años, conforme a la NOM-004-SSA3-2012.

## 8. Conservación de datos

- **Expediente clínico:** mínimo 5 años a partir de la última atención, conforme a la NOM-004-SSA3-2012.
- **Datos de contacto y marketing:** hasta que usted solicite su cancelación.
- **Datos de navegación:** conforme a los plazos de cada proveedor **[verificar retención de GA4 y Clarity]**.

## 9. Medidas de seguridad

Gioventù ha implementado medidas de seguridad administrativas, técnicas y físicas para proteger sus datos personales contra daño, pérdida, alteración, destrucción, uso, acceso o tratamiento no autorizado.

**[DESCRIBIR MEDIDAS CONCRETAS: control de accesos, cifrado, respaldos, capacitación del personal, convenios de confidencialidad — completar]**

## 10. Cambios al aviso de privacidad

Nos reservamos el derecho de modificar el presente aviso. Cualquier cambio será publicado en **https://gioventu.com.mx/aviso-de-privacidad/** y, cuando corresponda, comunicado por correo electrónico.

**Última actualización:** [FECHA]

## 11. Autoridad en materia de protección de datos

Si considera que su derecho a la protección de datos personales ha sido vulnerado, puede acudir al **Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI)**: www.inai.org.mx
`;

// Estilo SOBRIO (documento legal): encabezados en tinta, no en color de marca; sin CTA.
const components: Components = {
  h2: ({ children }) => (
    <h2 className="mt-10 mb-3 font-sans text-[1.35rem] font-medium leading-snug text-ink">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-6 mb-2 font-sans text-[1.05rem] font-semibold text-ink">{children}</h3>
  ),
  p: ({ children }) => <p className="mb-4 text-[0.95rem] leading-relaxed text-ink-soft">{children}</p>,
  ul: ({ children }) => (
    <ul className="mb-4 ml-5 list-disc space-y-1.5 text-[0.95rem] leading-relaxed text-ink-soft">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 ml-5 list-decimal space-y-1.5 text-[0.95rem] leading-relaxed text-ink-soft">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1">{children}</li>,
  strong: ({ children }) => <strong className="font-semibold text-ink">{children}</strong>,
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-brand underline underline-offset-2 hover:text-brand-hover"
    >
      {children}
    </a>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-[0.9rem]">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-brand-tint/50 text-ink">{children}</thead>,
  th: ({ children }) => (
    <th className="border border-line px-3 py-2 text-left font-semibold">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border border-line px-3 py-2 align-top text-ink-soft">{children}</td>
  ),
};

export default function AvisoPrivacidadPage() {
  const crumbs: Crumb[] = [
    { label: "Inicio", href: "/" },
    { label: "Aviso de privacidad" },
  ];

  return (
    <div className="container-x pb-20">
      <Breadcrumb items={crumbs} className="pt-6" />

      {/* Aviso visible de borrador (no es un CTA): borde + fondo tenue */}
      <aside className="mt-6 max-w-[760px] rounded-block border border-line bg-brand-tint/30 p-5 text-[0.9rem] leading-relaxed text-ink-soft">
        <strong className="text-ink">BORRADOR EN REVISIÓN</strong> — Este documento se encuentra
        pendiente de validación legal y no constituye el aviso de privacidad vigente de Gioventù.
      </aside>

      <header className="mt-8 max-w-[760px]">
        <h1 className="font-sans text-[clamp(2rem,4vw,2.8rem)] font-light leading-[1.1] tracking-[-0.01em] text-ink">
          Aviso de Privacidad Integral — Gioventù
        </h1>
      </header>

      <div className="mt-6 max-w-[760px]">
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {cuerpo}
        </ReactMarkdown>
      </div>
    </div>
  );
}
