export interface ServiceItem {
  slug: string;
  badge: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  heroMetric: string;
  heroMetricLabel: string;
  problemTitle: string;
  problems: string[];
  solutionTitle: string;
  solutions: string[];
  deliverables: {
    title: string;
    description: string;
  }[];
  techSpecs: string[];
}

export interface AudienceSegment {
  slug: string;
  badge: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  painPoints: string[];
  benefits: {
    title: string;
    description: string;
  }[];
  idealFor: string[];
  featuredQuote: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface SimulatorScenario {
  id: string;
  label: string;
  category: string;
  clientName: string;
  clientRole: string;
  whatsappMessage: string;
  whatsappTime: string;
  isAudio?: boolean;
  audioDuration?: string;
  agentLogs: {
    step: string;
    detail: string;
    time: string;
  }[];
  previewUrl: string;
  elapsedMinutes: number;
  beforePreview: {
    title: string;
    highlight: string;
    subtext: string;
  };
  afterPreview: {
    title: string;
    highlight: string;
    subtext: string;
    badge: string;
  };
}

export interface CaseStudy {
  id: string;
  company: string;
  country: string;
  industry: string;
  previousStack: string;
  headline: string;
  summary: string;
  metrics: {
    label: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  quote: string;
  author: string;
  role: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  keyTakeaways: string[];
}

export const SITE_CONFIG = {
  name: "YRRG.ai",
  tagline: "Smart Website System para Latinoamérica",
  domain: "yrrg.ai",
  whatsappNumber: "+54 9 11 5555-0192",
  whatsappLink:
    "https://wa.me/5491155550192?text=Hola%20equipo%20de%20YRRG.ai%2C%20quiero%20conocer%20m%C3%A1s%20sobre%20los%20Smart%20Websites%20en%20Next.js",
  contactEmail: "hola@yrrg.ai",
  statusText: "Todos los sistemas operativos • Edge LATAM & USA",
  stats: [
    { value: "100/100", label: "Google PageSpeed Perf." },
    { value: "< 0.4s", label: "Carga Instantánea (LCP)" },
    { value: "< 30 min", label: "Cambios listos en Preview" },
    { value: "99.99%", label: "Uptime en Red Global Edge" },
  ],
};

export const SERVICES: ServiceItem[] = [
  {
    slug: "smart-website",
    badge: "Flagship • Desarrollo Next.js",
    title: "Smart Websites en Next.js",
    shortTitle: "Smart Websites",
    subtitle:
      "Tu sitio web desarrollado con la misma tecnología que usan gigantes de Silicon Valley, gestionado 100% por nuestro equipo e IA.",
    description:
      "Olvídate de plantillas lentas en WordPress o constructores limitados. Diseñamos y programamos un sitio web a medida en Next.js con arquitectura orientada a la conversión, carga instantánea y mantenimiento continuo incluido.",
    heroMetric: "0.4s",
    heroMetricLabel: "Tiempo promedio de carga inicial",
    problemTitle: "Por qué los sitios tradicionales te hacen perder ventas",
    problems: [
      "Tardan más de 4 segundos en cargar en dispositivos móviles, perdiendo hasta el 53% de las visitas.",
      "Dependencia de decenas de plugins frágiles que se rompen con cada actualización.",
      "Paneles de administración complejos que nadie en tu equipo tiene tiempo de aprender ni usar.",
      "Diseños genéricos que no transmiten la autoridad real de tu empresa.",
    ],
    solutionTitle: "La arquitectura YRRG.ai Smart Website",
    solutions: [
      "Código puro en Next.js + React + Tailwind CSS desplegado en red global Edge.",
      "Diseño UX/UI de alta conversión pensado para transformar visitas en oportunidades comerciales.",
      "Cero paneles complejos: pides cualquier cambio por WhatsApp o Email y nosotros lo publicamos.",
      "SEO Técnico y AI SEO nativo desde la primera línea de código.",
    ],
    deliverables: [
      {
        title: "Arquitectura de Conversión a Medida",
        description:
          "Estructuramos cada sección, llamado a la acción y flujo de contacto según los objetivos comerciales de tu negocio.",
      },
      {
        title: "Desarrollo Full-Code en Next.js",
        description:
          "Sin constructores visuales pesados. Código limpio, tipado en TypeScript y optimizado para máxima velocidad.",
      },
      {
        title: "Integración con WhatsApp, CRM y Analítica",
        description:
          "Conectamos tus formularios y botones directamente con tu flujo comercial en WhatsApp, HubSpot o correo corporativo.",
      },
      {
        title: "Flujo Continuo de Actualizaciones",
        description:
          "Tu sitio nunca queda desactualizado. Envíanos un audio o mensaje y recibe un enlace de vista previa en minutos.",
      },
    ],
    techSpecs: [
      "Next.js App Router (SSR & SSG híbrido)",
      "Certificado SSL TLS 1.3 + Protección DDoS global",
      "Optimización automática de imágenes en formato AVIF/WebP",
      "Core Web Vitals en verde garantizados",
    ],
  },
  {
    slug: "migracion",
    badge: "Zero Downtime • Sin Pérdida de SEO",
    title: "Migración sin Dolor a Next.js",
    shortTitle: "Migración sin Dolor",
    subtitle:
      "Transformamos tu web actual en WordPress, Wix o Webflow en un Smart Website ultrarrápido sin caídas ni pérdida de posicionamiento.",
    description:
      "Nos encargamos de todo el proceso técnico: extracción de contenidos, mejora visual, redirecciones 301 exactas, preservación de metadatos SEO y puesta en producción sin que tu negocio deje de operar un solo minuto.",
    heroMetric: "0%",
    heroMetricLabel: "Tiempo de inactividad durante la transición",
    problemTitle: "El miedo a migrar un sitio que hoy está funcionando",
    problems: [
      "Temor a perder el posicionamiento orgánico en Google ganado durante años.",
      "Procesos de rediseño en agencias tradicionales que demoran de 3 a 6 meses.",
      "Costos ocultos por migrar artículos de blog, páginas de servicios e imágenes.",
      "Riesgo de enlaces rotos o interrupciones en campañas de Google Ads y Meta Ads.",
    ],
    solutionTitle: "Protocolo de Migración Quirúrgica YRRG.ai",
    solutions: [
      "Auditoría completa de URLs actuales y mapeo de redirecciones 301 uno a uno.",
      "Extracción automatizada con agentes de IA de todo tu contenido, páginas e imágenes.",
      "Entorno de previsualización (Staging) idéntico para que apruebes antes del cambio de DNS.",
      "Ejecución en días, no meses, con monitoreo post-lanzamiento en Google Search Console.",
    ],
    deliverables: [
      {
        title: "Inventario y Mapeo SEO Completo",
        description:
          "Conservamos tu autoridad de dominio asegurando que cada URL histórica mantenga su valor orgánico.",
      },
      {
        title: "Modernización Visual e Interfaz",
        description:
          "No solo copiamos tu sitio anterior: elevamos su estética, legibilidad y experiencia móvil al estándar actual.",
      },
      {
        title: "Limpieza de Deuda Técnica",
        description:
          "Eliminamos scripts obsoletos, bases de datos vulnerables y plugins innecesarios para siempre.",
      },
      {
        title: "Switch Instantáneo en Edge",
        description:
          "Transición de dominio coordinada sin interrupción de correos electrónicos ni campañas activas.",
      },
    ],
    techSpecs: [
      "Mapeo automatizado de Sitemap XML y Robots.txt",
      "Verificación de enlaces e integridad de metadatos OpenGraph",
      "Migración de contenido estático y dinámico a arquitectura limpia",
      "Rollback instantáneo de seguridad ante cualquier contingencia",
    ],
  },
  {
    slug: "optimizacion",
    badge: "Performance • Core Web Vitals",
    title: "Optimización Extrema & Core Web Vitals",
    shortTitle: "Optimización Extrema",
    subtitle:
      "Velocidad sub-segundo que multiplica la tasa de conversión de tus campañas y mejora tu puntaje de calidad en buscadores.",
    description:
      "Cada segundo extra de carga reduce drásticamente tus conversiones. En YRRG.ai construimos bajo estándares de ingeniería donde 98–100 en Google PageSpeed no es un extra opcional, sino la base técnica de cada proyecto.",
    heroMetric: "100/100",
    heroMetricLabel: "Puntaje objetivo en Google Lighthouse",
    problemTitle: "El impuesto invisible de tener una web lenta",
    problems: [
      "Pagas clics caros en Google Ads y Meta Ads para que el usuario abandone antes de que cargue la página.",
      "Google penaliza silenciosamente a los sitios que fallan en Largest Contentful Paint (LCP) e Interaction to Next Paint (INP).",
      "Imágenes sin comprimir, fuentes bloqueantes y exceso de JavaScript degradan la experiencia en redes móviles de LATAM.",
      "Los parches con plugins de caché en WordPress solo maquillan el problema estructural.",
    ],
    solutionTitle: "Ingeniería de Rendimiento en el Edge",
    solutions: [
      "Pre-renderizado inteligente para que el navegador reciba HTML listo al instante desde el nodo más cercano al usuario.",
      "Carga prioritaria de fuentes e imágenes críticas con compresión de última generación.",
      "Cero código basura: enviamos al navegador únicamente los kilobytes estrictamente necesarios.",
      "Monitoreo continuo de métricas reales (Real User Metrics) en escritorio y móvil.",
    ],
    deliverables: [
      {
        title: "Optimización de LCP, INP y CLS",
        description:
          "Cumplimiento estricto de los tres pilares de Core Web Vitals exigidos por Google para el ranking moderno.",
      },
      {
        title: "Distribución CDN Multi-Región",
        description:
          "Tu sitio responde desde servidores cercanos en Buenos Aires, Santiago, São Paulo, Bogotá, CDMX y Miami.",
      },
      {
        title: "Optimización de Activos Multimedia",
        description:
          "Transformación automática de fotografías y gráficos a formatos ultraligeros sin pérdida de nitidez.",
      },
      {
        title: "Auditoría Comparativa Antes / Después",
        description:
          "Reporte transparente con métricas verificables de velocidad, peso de página y tiempo hasta interactividad.",
      },
    ],
    techSpecs: [
      "Largest Contentful Paint (LCP) < 0.8s",
      "Cumulative Layout Shift (CLS) = 0.00",
      "Interaction to Next Paint (INP) < 50ms",
      "Distribución en red global Edge con caché inteligente",
    ],
  },
  {
    slug: "ai-seo",
    badge: "Visibilidad • Google + ChatGPT + Perplexity",
    title: "AI SEO & Posicionamiento en Buscadores IA",
    shortTitle: "AI SEO & Buscadores IA",
    subtitle:
      "Preparamos tu sitio web para ser encontrado tanto en Google tradicional como en las respuestas de ChatGPT, Perplexity, Claude y Gemini.",
    description:
      "La forma en que tus clientes buscan proveedores cambió. Hoy consultan motores generativos de IA. Estructuramos tu sitio con datos semánticos JSON-LD, arquitectura clara de entidades y archivos llms.txt para que las IAs recomienden a tu empresa.",
    heroMetric: "AI-Ready",
    heroMetricLabel: "Datos estructurados + llms.txt nativo",
    problemTitle: "El SEO tradicional ya no alcanza por sí solo",
    problems: [
      "Los motores de IA ignoran sitios con HTML sucio, exceso de scripts o información ambigua.",
      "Tu competencia empieza a aparecer como recomendación directa cuando alguien pregunta en ChatGPT o Perplexity.",
      "Falta de marcado Schema.org profundo que explique qué hace tu empresa, dónde opera y por qué es confiable.",
      "Contenidos genéricos que no responden las preguntas reales de decisión de compra de tus clientes.",
    ],
    solutionTitle: "Ingeniería de Visibilidad Orgánica + Generativa (GEO)",
    solutions: [
      "Implementación de Schema.org / JSON-LD avanzado para Organización, Servicios, FAQs y Reseñas.",
      "Generación y mantenimiento de protocolo `/llms.txt` optimizado para crawlers de inteligencia artificial.",
      "Estructura jerárquica de encabezados y contenido semántico de alta legibilidad para modelos de lenguaje.",
      "Indexación ultrarrápida gracias al tiempo de respuesta instantáneo del servidor.",
    ],
    deliverables: [
      {
        title: "Marcado Semántico JSON-LD Completo",
        description:
          "Hablamos el idioma nativo de Google y de los motores de IA para que entiendan exactamente tu oferta comercial.",
      },
      {
        title: "Implementación de Estándar llms.txt",
        description:
          "Un mapa limpio en formato Markdown para que agentes como OpenAI SearchBot y Perplexity consuman tu información sin fricción.",
      },
      {
        title: "Arquitectura de Páginas por Servicio y Solución",
        description:
          "Creamos páginas específicas de alta intención comercial que capturan búsquedas calificadas en tu industria.",
      },
      {
        title: "Metadatos Dinámicos y OpenGraph",
        description:
          "Previsualizaciones impecables cuando compartes tu sitio por WhatsApp, LinkedIn o redes sociales.",
      },
    ],
    techSpecs: [
      "Schema.org JSON-LD validado sin errores",
      "Endpoint /llms.txt y Sitemap XML dinámico",
      "HTML5 semántico sin bloqueo de renderizado",
      "Optimización para Google Search, Bing, ChatGPT Search y Perplexity",
    ],
  },
  {
    slug: "mantenimiento",
    badge: "Paz Mental • Soporte Continuo + Seguridad",
    title: "Mantenimiento Blindado 24/7",
    shortTitle: "Mantenimiento Blindado",
    subtitle:
      "Hosting global, seguridad inhackeable, copias de seguridad y todos los cambios de contenido incluidos en una tarifa mensual plana.",
    description:
      "Despídete de pagar horas sueltas de programador cada vez que quieres cambiar un texto, sumar un servicio o publicar una promoción. Tu suscripción mensual incluye infraestructura de nivel empresarial y nuestro equipo potenciado por IA a tu disposición.",
    heroMetric: "< 30m",
    heroMetricLabel: "Tiempo promedio de entrega en enlace Preview",
    problemTitle: "El dolor de cabeza de mantener una web por tu cuenta",
    problems: [
      "Sitios en WordPress hackeados o infectados con malware por un plugin desactualizado.",
      "Programadores freelance que desaparecen o tardan dos semanas en cambiar un párrafo.",
      "Facturas sorpresa por certificados SSL, servidores lentos o soporte técnico de emergencia.",
      "Equipos internos perdiendo horas luchando con constructores visuales que desarman el diseño móvil.",
    ],
    solutionTitle: "Tu Departamento Web en WhatsApp",
    solutions: [
      "Arquitectura sin base de datos expuesta: superficie de ataque prácticamente nula frente a hackeos tradicionales.",
      "Pides cambios por WhatsApp (texto, audio o captura de pantalla) y nuestro sistema genera un Preview antes de publicar.",
      "Hosting global Edge, SSL automático, dominio conectado y monitoreo 24/7 incluidos sin costos ocultos.",
      "Sin límite de solicitudes razonables de actualización de textos, precios, imágenes o nuevas secciones.",
    ],
    deliverables: [
      {
        title: "Canal Directo por WhatsApp y Email",
        description:
          "Sin tickets eternos ni burocracia. Hablas con nosotros como hablas con un socio de tu equipo.",
      },
      {
        title: "Entorno de Vista Previa (Preview Links)",
        description:
          "Cada cambio genera una URL segura para que revises y apruebes desde tu celular antes de salir en vivo.",
      },
      {
        title: "Seguridad Inmutable y Backups en Git",
        description:
          "Cada versión de tu sitio está resguardada con control de versiones empresarial. Podemos volver atrás en 1 clic.",
      },
      {
        title: "Monitoreo Activo 24/7",
        description:
          "Vigilamos disponibilidad, certificados y rendimiento de forma continua para que tú te enfoques en vender.",
      },
    ],
    techSpecs: [
      "Infraestructura sin plugins vulnerables ni WP-Admin expuesto",
      "Control de versiones Git con historial completo de cambios",
      "Despliegues atómicos con Preview URL por cada solicitud",
      "Monitoreo de disponibilidad y latencia en tiempo real",
    ],
  },
];

export const AUDIENCE_SEGMENTS: AudienceSegment[] = [
  {
    slug: "pymes",
    badge: "Crecimiento • PyMEs y Negocios Profesionales",
    title: "Para PyMEs y Negocios en Crecimiento",
    shortTitle: "PyMEs y Negocios",
    subtitle:
      "Ten una presencia digital de primer nivel sin contratar un equipo de tecnología ni perder tardes enteras peleando con tu página web.",
    description:
      "Sabemos que como dueño o director de una PyME tu prioridad es atender clientes, vender y operar tu negocio. YRRG.ai te da un sitio web que proyecta máxima confianza comercial y se actualiza con solo mandar un mensaje de WhatsApp.",
    painPoints: [
      "Tu web actual quedó congelada en el tiempo porque nadie tiene tiempo de actualizarla.",
      "Te da vergüenza compartir el link de tu sitio porque carga lento o se ve mal en celulares.",
      "Las agencias tradicionales te cotizan miles de dólares y meses de espera por algo sencillo.",
      "No quieres aprender a usar paneles técnicos complejos que terminan rompiendo el diseño.",
    ],
    benefits: [
      {
        title: "Inversión Accesible y Predecible",
        description:
          "Un pago inicial claro de $299 USD y una suscripción mensual todo incluido de $59 USD/mes. Sin sorpresas.",
      },
      {
        title: "Listo en Días, No en Meses",
        description:
          "Desde nuestra charla inicial de 45 minutos nos ocupamos del diseño, textos y puesta en marcha rápida.",
      },
      {
        title: "Actualizaciones por Audio de WhatsApp",
        description:
          "¿Cambiaste tus precios, sumaste un servicio o abriste una sucursal? Nos mandas un audio y en 30 minutos ves el cambio listo.",
      },
      {
        title: "Diseñado para Generar Consultas",
        description:
          "Estructura pensada para que tus visitantes entiendan qué haces en 5 segundos y te contacten directo.",
      },
    ],
    idealFor: [
      "Estudios jurídicos, contables y consultoras B2B",
      "Clínicas médicas, odontológicas y centros de salud",
      "Empresas de servicios industriales, logística y construcción",
      "Comercios, gastronomía e inmobiliarias en expansión",
    ],
    featuredQuote: {
      quote:
        "Antes tardábamos semanas en actualizar una promoción porque nadie quería tocar el WordPress. Hoy mando un audio por WhatsApp entre reunión y reunión y a los 20 minutos ya está publicado.",
      author: "Martín Morales",
      role: "Socio Director en Estudio & Consultora PyME",
    },
  },
  {
    slug: "enterprise",
    badge: "Escala • Empresas y Corporativos",
    title: "Para Empresas y Corporativos",
    shortTitle: "Empresas y Corporativos",
    subtitle:
      "Velocidad de ejecución para tus equipos de Marketing y estándares de seguridad y rendimiento para tu gerencia de IT.",
    description:
      "En empresas medianas y grandes, el sitio institucional y las landing pages suelen quedar atrapados en cuellos de botella entre marketing, diseño y el equipo interno de ingeniería. YRRG.ai desacopla tu web corporativa con arquitectura Next.js segura y tiempos de respuesta de menos de 30 minutos.",
    painPoints: [
      "El equipo de producto o ingeniería interno no tiene ancho de banda para atender cambios del sitio institucional.",
      "Riesgos de seguridad y auditoría por mantener instalaciones legacy de WordPress con decenas de plugins.",
      "Agencias creativas lentas que cobran retainers altísimos y demoran semanas en lanzar una nueva landing page.",
      "Métricas de Core Web Vitals deficientes que encarecen el costo de adquisición (CAC) en campañas digitales.",
    ],
    benefits: [
      {
        title: "Seguridad de Grado Corporativo",
        description:
          "Arquitectura desacoplada sin bases de datos SQL expuestas ni paneles vulnerables. Cero vectores de inyección comunes.",
      },
      {
        title: "Agilidad Extrema para Marketing",
        description:
          "Lanza nuevas páginas de producto, eventos o campañas en el mismo día con entornos de aprobación Preview.",
      },
      {
        title: "Performance 100/100 Verificable",
        description:
          "Cumplimiento riguroso de estándares de velocidad, accesibilidad y SEO técnico en todos los mercados.",
      },
      {
        title: "Gobernanza y Control de Versiones",
        description:
          "Cada cambio queda auditado en Git con previsualización previa, garantizando control total de marca.",
      },
    ],
    idealFor: [
      "Empresas tecnológicas, SaaS y Fintech",
      "Corporativos multi-país con presencia en LATAM y EE.UU.",
      "Grupos industriales, energía y manufactura B2B",
      "Equipos de Growth y Marketing que necesitan velocidad de ejecución",
    ],
    featuredQuote: {
      quote:
        "Liberamos a nuestro equipo interno de ingeniería del mantenimiento del sitio corporativo y pasamos de esperar dos sprints por un cambio a tenerlo en producción en media hora con total seguridad.",
      author: "Carolina Vega",
      role: "Head of Marketing en TechCorp LATAM",
    },
  },
  {
    slug: "fundaciones",
    badge: "Impacto • ONGs, Fundaciones y Cámaras",
    title: "Para ONGs, Fundaciones y Cámaras Empresariales",
    shortTitle: "ONGs y Fundaciones",
    subtitle:
      "Amplifica tu misión institucional, transparenta tu impacto y comunica novedades al instante sin depender de soporte técnico complejo.",
    description:
      "Las organizaciones sin fines de lucro, fundaciones y cámaras empresariales necesitan comunicar memorias anuales, programas, eventos y convocatorias con máxima claridad y credibilidad, optimizando cada recurso de su presupuesto.",
    painPoints: [
      "Sitios institucionales antiguos donde publicar una memoria anual o un nuevo programa es una odisea técnica.",
      "Presupuestos que deben priorizar el impacto social o gremial en lugar de costosos mantenimientos de agencia.",
      "Vulnerabilidad ante ataques automatizados que dejan fuera de línea el portal de la institución.",
      "Dificultad para que donantes, socios y prensa encuentren información clara desde dispositivos móviles.",
    ],
    benefits: [
      {
        title: "Transparencia y Autoridad Institucional",
        description:
          "Diseño limpio, accesible y moderno que inspira confianza inmediata en donantes, aliados internacionales y socios.",
      },
      {
        title: "Publicación Ágil de Programas y Noticias",
        description:
          "Envíanos el documento, flyer o texto de tu próxima actividad por WhatsApp o correo y lo estructuramos en la web.",
      },
      {
        title: "Accesibilidad y Lectura Impecable",
        description:
          "Cumplimiento de normas de contraste, tipografía clara y carga veloz incluso en zonas con baja conectividad móvil.",
      },
      {
        title: "Presupuesto Previsible y Transparente",
        description:
          "Todo resuelto en una cuota fija mensual que incluye hosting, seguridad, soporte y actualizaciones continuas.",
      },
    ],
    idealFor: [
      "Fundaciones de impacto social, educativo y ambiental",
      "Cámaras empresariales, asociaciones profesionales y colegios",
      "Institutos de investigación y think tanks regionales",
      "Organizaciones culturales y programas de cooperación",
    ],
    featuredQuote: {
      quote:
        "Para nuestra fundación fue un antes y un después: ahora nuestras memorias de impacto, convocatorias y alianzas están siempre al día sin necesitar personal técnico interno.",
      author: "Dr. Alejandro Pineda",
      role: "Director Ejecutivo en Fundación Impulso Regional",
    },
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    stepNumber: "01",
    badge: "Día 1 • Sin fricción",
    title: "Charla de descubrimiento de 45 minutos",
    description:
      "Nos reunimos por videollamada para entender tu negocio, tus clientes ideales, tu propuesta de valor y tus objetivos comerciales. Si ya tienes una web, auditamos qué conservar y qué mejorar. Tú no tienes que redactar documentos eternos.",
    deliverable: "Mapa de arquitectura y propuesta de estructura aprobada.",
  },
  {
    stepNumber: "02",
    badge: "Días 2 a 5 • Ingeniería Next.js",
    title: "Creación o Migración a tu Smart Website",
    description:
      "Nuestro equipo de ingenieros asistido por agentes de IA diseña y programa tu sitio desde cero en Next.js. Optimizamos textos para conversión, configuramos SEO + AI SEO y preparamos cada página con velocidad 100/100.",
    deliverable: "Sitio completo en entorno Preview para tu revisión.",
  },
  {
    stepNumber: "03",
    badge: "Operación Continua • WhatsApp + Portal Tickets",
    title: "Cero paneles complejos: pide todo por WhatsApp o en tu Portal de Tickets",
    description:
      "Una vez publicado tu sitio, nunca más tendrás que aprender a usar un CMS complicado. Cuando quieras cambiar precios, subir fotos, agregar una nueva sección o lanzar otro sitio, simplemente nos envías un WhatsApp o abres un ticket en tu Portal de Clientes.",
    deliverable: "Ticket registrado en tiempo real y asignado a IA + Ingeniería.",
  },
  {
    stepNumber: "04",
    badge: "SLA < 30 min • Preview & 1-Click Live",
    title: "Vista previa en 30 minutos y aprobación en 1 clic",
    description:
      "Nuestro flujo de agentes de IA e ingenieros procesa tu pedido, aplica los cambios en código limpio y te envía un enlace Preview seguro en menos de 30 minutos. Lo apruebas con 1 clic desde tu Portal de Clientes o por WhatsApp y sale en vivo al instante.",
    deliverable: "Cambio aprobado y desplegado globalmente en red Edge sin caídas.",
  },
];

export const SIMULATOR_SCENARIOS: SimulatorScenario[] = [
  {
    id: "promo-precios",
    label: "1. Actualizar precios y lanzar promo",
    category: "Cambio Comercial",
    clientName: "Lucía Fernández",
    clientRole: "Directora Comercial",
    whatsappMessage:
      "Hola equipo YRRG! Necesito actualizar el precio del Plan Profesional a $180/mes y poner un banner arriba que diga '20% OFF en implementación durante este mes'. ¿Me mandan preview?",
    whatsappTime: "10:14 AM",
    isAudio: false,
    agentLogs: [
      {
        step: "Intent Parser AI",
        detail: "Detectada actualización en componente Pricing + TopBanner promocional.",
        time: "10:14:12",
      },
      {
        step: "Next.js Code Agent",
        detail: "Modificado src/data/pricing.ts y activado componente PromoBanner.",
        time: "10:18:40",
      },
      {
        step: "Lighthouse & Build Check",
        detail: "Build exitoso en Edge • Score 100/100 • 0 errores TypeScript.",
        time: "10:26:05",
      },
      {
        step: "Preview Link Ready",
        detail: "Enviado link de previsualización por WhatsApp para aprobación.",
        time: "10:31:00",
      },
    ],
    previewUrl: "https://preview-promo-q4.cliente.yrrg.ai",
    elapsedMinutes: 17,
    beforePreview: {
      title: "Plan Profesional — $165 USD / mes",
      highlight: "Sin barra promocional superior activa",
      subtext: "Versión actual en producción",
    },
    afterPreview: {
      title: "Plan Profesional — $180 USD / mes",
      highlight: "🔥 20% OFF en implementación durante este mes",
      subtext: "Desplegado en Preview • Listo para publicar",
      badge: "Listo en 17 min",
    },
  },
  {
    id: "nueva-seccion",
    label: "2. Agregar nueva sección de servicio",
    category: "Expansión de Contenido",
    clientName: "Diego Salgado",
    clientRole: "Socio Gerente",
    whatsappMessage:
      "Audio de WhatsApp (0:42): 'Muchachos, lanzamos el nuevo servicio de Auditoría Logística para comercio exterior. Quiero sumarlo en la página principal con 3 beneficios clave y botón directo a mi WhatsApp...'",
    whatsappTime: "14:05 PM",
    isAudio: true,
    audioDuration: "0:42",
    agentLogs: [
      {
        step: "Whisper Audio Transcription",
        detail: "Audio transcrito y estructurado en copy B2B de alta conversión.",
        time: "14:05:30",
      },
      {
        step: "UI Component Generator",
        detail: "Creada tarjeta y sección 'Auditoría Logística Comex' + Schema SEO.",
        time: "14:15:18",
      },
      {
        step: "Responsive & Speed Check",
        detail: "Verificada vista móvil y escritorio • LCP 0.38s.",
        time: "14:24:50",
      },
      {
        step: "Preview Link Ready",
        detail: "Enlace de staging listo y enviado al cliente por WhatsApp.",
        time: "14:29:10",
      },
    ],
    previewUrl: "https://preview-servicio-comex.cliente.yrrg.ai",
    elapsedMinutes: 24,
    beforePreview: {
      title: "4 Servicios Principales en Home",
      highlight: "Sin mención a Auditoría Logística Comex",
      subtext: "Versión actual en producción",
    },
    afterPreview: {
      title: "Nueva Sección: Auditoría Logística para Comex",
      highlight: "3 pilares de valor + CTA directo a WhatsApp + JSON-LD SEO",
      subtext: "Desplegado en Preview • Listo para publicar",
      badge: "Listo en 24 min",
    },
  },
  {
    id: "sucursal-horarios",
    label: "3. Sumar nueva sede y horarios",
    category: "Operaciones & Local SEO",
    clientName: "Dra. Valeria Rojas",
    clientRole: "Directora Médica",
    whatsappMessage:
      "Hola! El lunes abrimos el nuevo consultorio en Av. Libertador 6200, piso 4. Horario de lunes a viernes de 8 a 20 hs. Por favor agréguenlo en Contacto y en el pie de página con el mapa.",
    whatsappTime: "16:40 PM",
    isAudio: false,
    agentLogs: [
      {
        step: "Local SEO & Entity Agent",
        detail: "Extraída dirección y actualizado marcado LocalBusiness Schema.org.",
        time: "16:40:22",
      },
      {
        step: "Next.js Code Agent",
        detail: "Actualizado Footer, página /contacto y tarjeta interactiva de sedes.",
        time: "16:47:15",
      },
      {
        step: "Edge Deployment",
        detail: "Compilación estática regenerada con 0ms de bloqueo.",
        time: "16:51:40",
      },
      {
        step: "Preview Link Ready",
        detail: "Preview verificada y enviada a la Dra. Rojas por WhatsApp.",
        time: "16:54:00",
      },
    ],
    previewUrl: "https://preview-sede-libertador.cliente.yrrg.ai",
    elapsedMinutes: 14,
    beforePreview: {
      title: "Sedes activas: Centro y Belgrano",
      highlight: "2 ubicaciones en página de Contacto",
      subtext: "Versión actual en producción",
    },
    afterPreview: {
      title: "Nueva Sede: Av. Libertador 6200, Piso 4",
      highlight: "Lun a Vie 8:00 a 20:00 hs + Mapa + Local SEO Schema",
      subtext: "Desplegado en Preview • Listo para publicar",
      badge: "Listo en 14 min",
    },
  },
];

export const PRICING_DATA = {
  setupFee: 299,
  monthlyFee: 59,
  annualMonthlyEquivalent: 49,
  currency: "USD",
  standardPlan: {
    name: "Plan Smart Website All-in-One",
    badge: "Más elegido por empresas en LATAM",
    description:
      "Todo lo que tu empresa necesita para tener un sitio web de clase mundial en Next.js, siempre rápido, seguro y actualizado por nosotros.",
    setupTitle: "Setup & Desarrollo Inicial",
    setupSubtitle: "Pago único al comenzar (creación desde cero o migración completa)",
    monthlyTitle: "Suscripción Todo Incluido",
    monthlySubtitle: "Hosting Edge, mantenimiento, seguridad y cambios por WhatsApp",
    features: [
      "Diseño y desarrollo a medida en Next.js + TypeScript + Tailwind",
      "Migración completa desde WordPress, Wix o Webflow sin caída de SEO",
      "Velocidad garantizada (98–100 en Google PageSpeed Insights)",
      "AI SEO incluido: Schema JSON-LD avanzado + protocolo /llms.txt",
      "Actualizaciones ilimitadas de contenido pedidas por WhatsApp o Email",
      "Enlace de vista previa (Preview) en menos de 30 minutos",
      "Hosting global en Red Edge + Certificado SSL + Protección DDoS",
      "Sin contratos de permanencia forzosa: tú eres dueño de tu dominio y contenido",
    ],
  },
  enterprisePlan: {
    name: "Plan Corporate & Custom",
    badge: "Para grandes operaciones y requerimientos a medida",
    priceLabel: "A medida",
    description:
      "Para compañías con múltiples sitios o países, integraciones con APIs propietarias, portales multi-idioma o acuerdos de nivel de servicio (SLA) dedicados.",
    features: [
      "Todo lo incluido en el Plan Smart Website All-in-One",
      "Arquitectura multi-idioma (ES / EN / PT) y multi-región",
      "Integraciones personalizadas vía API con ERP, CRM o sistemas internos",
      "Ingeniero de cuenta dedicado y canal exclusivo en Slack / WhatsApp",
      "Flujos de aprobación multi-usuario para equipos de Marketing y Legal",
      "Facturación corporativa e informes mensuales de rendimiento y SEO",
    ],
  },
  comparisonRows: [
    {
      feature: "Costo inicial de creación / migración",
      yrrg: "$299 USD (Pago único)",
      agency: "$2,500 a $8,000+ USD",
      diy: "$0 a $500 USD + semanas de tu tiempo",
    },
    {
      feature: "Tiempo de lanzamiento",
      yrrg: "5 a 7 días hábiles",
      agency: "2 a 5 meses",
      diy: "Indefinido (nunca queda terminado)",
    },
    {
      feature: "Cómo haces un cambio en la web",
      yrrg: "Mandas un WhatsApp y está listo en < 30 min",
      agency: "Ticket + presupuesto extra + 1 a 2 semanas",
      diy: "Entras tú mismo al panel y rezas para que no se rompa",
    },
    {
      feature: "Tecnología y Velocidad (PageSpeed)",
      yrrg: "Next.js en Edge (98–100/100)",
      agency: "WordPress pesado (45–70/100)",
      diy: "Plantillas lentas (35–65/100)",
    },
    {
      feature: "Seguridad contra hackeos",
      yrrg: "Inmutable en Edge (Sin plugins ni BD expuesta)",
      agency: "Vulnerable si no actualizan plugins cada semana",
      diy: "Alta exposición a malware y caídas",
    },
    {
      feature: "AI SEO (ChatGPT, Perplexity, Google)",
      yrrg: "Nativo (JSON-LD + /llms.txt incluido)",
      agency: "Se cobra como consultoría SEO aparte",
      diy: "Básico o inexistente",
    },
  ],
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: "grupo-logistico-andino",
    company: "Grupo Logístico Andino",
    country: "Chile & Perú",
    industry: "Logística B2B & Comercio Exterior",
    previousStack: "WordPress + Elementor (19 plugins)",
    headline:
      "De una web que tardaba 6.2 segundos a duplicar las solicitudes de cotización en 45 días",
    summary:
      "Su antiguo sitio en WordPress sufría caídas constantes y tardaba más de 6 segundos en abrir desde celulares de clientes en puerto. Migramos sus 18 páginas a Next.js en 6 días sin perder una sola posición en Google.",
    metrics: [
      {
        label: "Velocidad Mobile (PageSpeed)",
        before: "38 / 100",
        after: "100 / 100",
        improvement: "+163% rendimiento",
      },
      {
        label: "Tiempo de Carga (LCP)",
        before: "6.2 seg",
        after: "0.4 seg",
        improvement: "15x más rápido",
      },
      {
        label: "Conversión de Visita a Lead",
        before: "1.4%",
        after: "3.6%",
        improvement: "+157% consultas B2B",
      },
    ],
    quote:
      "Lo que más valoramos no es solo que el sitio vuele, sino que cuando abrimos una nueva ruta comercial mando un mensaje por WhatsApp y en 20 minutos ya tenemos la página lista para mandar a clientes.",
    author: "Rodrigo Valenzuela",
    role: "Gerente Comercial Regional",
  },
  {
    id: "clinica-avanza-salud",
    company: "Centro Médico Avanza",
    country: "Argentina",
    industry: "Salud & Especialidades Médicas",
    previousStack: "Wix Premium",
    headline:
      "Posicionamiento en Google y buscadores de IA con agenda de turnos por WhatsApp siempre al día",
    summary:
      "Contaban con más de 25 profesionales y actualizar especialidades, coberturas médicas u horarios era un caos. Con YRRG.ai estructuramos cada especialidad con Schema médico y gestión instantánea por WhatsApp.",
    metrics: [
      {
        label: "Velocidad Mobile (PageSpeed)",
        before: "44 / 100",
        after: "99 / 100",
        improvement: "Carga instantánea",
      },
      {
        label: "Tiempo en actualizar cartilla",
        before: "5 días",
        after: "18 min",
        improvement: "Vía WhatsApp",
      },
      {
        label: "Tráfico Orgánico Mensual",
        before: "1,800 visitas",
        after: "4,950 visitas",
        improvement: "+175% en 90 días",
      },
    ],
    quote:
      "Nuestra coordinación médica simplemente reenvía por WhatsApp las novedades de horarios o nuevas especialidades y el equipo de YRRG.ai nos devuelve el preview listo para aprobar.",
    author: "Dra. Mariana Estévez",
    role: "Directora de Operaciones",
  },
  {
    id: "firma-legal-montoya",
    company: "Montoya & Asociados Legal",
    country: "México & Colombia",
    industry: "Firma Legal Corporativa",
    previousStack: "Sitio a medida desactualizado (PHP)",
    headline:
      "Autoridad corporativa impecable y aparición directa en respuestas de ChatGPT y Perplexity",
    summary:
      "Necesitaban proyectar solidez ante clientes internacionales y posicionar sus áreas de práctica en derecho corporativo y fiscal. Implementamos su nuevo Smart Website con arquitectura bilingüe y AI SEO nativo.",
    metrics: [
      {
        label: "Puntaje Core Web Vitals",
        before: "51 / 100",
        after: "100 / 100",
        improvement: "Estándar máximo",
      },
      {
        label: "Tiempo de Carga Inicial",
        before: "4.8 seg",
        after: "0.35 seg",
        improvement: "Sub-segundo real",
      },
      {
        label: "Consultas desde Buscadores IA",
        before: "0 / mes",
        after: "22+ / mes",
        improvement: "Canal nuevo B2B",
      },
    ],
    quote:
      "Varios clientes corporativos nos comentaron que llegaron al estudio porque Perplexity y ChatGPT nos recomendaron al buscar asesoría legal para inversión extranjera.",
    author: "Lic. Carlos Montoya",
    role: "Socio Fundador",
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "por-que-wordpress-frena-crecimiento-b2b",
    title:
      "Por qué WordPress está frenando tus ventas en 2026 (y por qué Next.js es el nuevo estándar)",
    excerpt:
      "Analizamos el costo oculto de los plugins, la lentitud en redes móviles y cómo la arquitectura moderna en Next.js multiplica la conversión comercial.",
    category: "Arquitectura Web",
    readTime: "5 min de lectura",
    date: "Actualizado 2026",
    author: "Equipo de Ingeniería YRRG.ai",
    keyTakeaways: [
      "El 53% de los usuarios móviles abandona una página si tarda más de 3 segundos en cargar.",
      "WordPress nació hace más de 20 años para blogs; hoy requiere decenas de parches para competir en velocidad.",
      "Next.js pre-genera el contenido en el Edge, logrando cargas de 0.4 segundos y seguridad blindada.",
    ],
  },
  {
    slug: "que-es-ai-seo-como-aparecer-en-chatgpt-perplexity",
    title:
      "Guía práctica de AI SEO: Cómo lograr que ChatGPT, Perplexity y Gemini recomienden a tu empresa",
    excerpt:
      "Tus clientes ya no solo buscan en Google: ahora le piden recomendaciones directas a la inteligencia artificial. Descubre qué necesita tu web para ser elegida.",
    category: "AI SEO & Visibilidad",
    readTime: "6 min de lectura",
    date: "Actualizado 2026",
    author: "Equipo de Estrategia YRRG.ai",
    keyTakeaways: [
      "Los modelos de lenguaje priorizan sitios con HTML semántico limpio, datos estructurados JSON-LD y archivo /llms.txt.",
      "Las páginas confusas o bloqueadas por exceso de JavaScript quedan invisibles para los agentes de búsqueda IA.",
      "Explicar con precisión qué problema resuelves, en qué región operas y para qué tipo de cliente es clave en GEO.",
    ],
  },
  {
    slug: "el-fin-de-los-paneles-cms-gestion-web-por-whatsapp",
    title:
      "El fin de los paneles de autogestión: Por qué ningún dueño de negocio quiere aprender otro CMS",
    excerpt:
      "La promesa del 'hazlo tú mismo' terminó convirtiendo a dueños y gerentes en diseñadores frustrados. Conoce el modelo de gestión asistida por WhatsApp + IA.",
    category: "Productividad & Operaciones",
    readTime: "4 min de lectura",
    date: "Actualizado 2026",
    author: "Equipo de Producto YRRG.ai",
    keyTakeaways: [
      "Los paneles autogestionables suelen quedar abandonados a las pocas semanas del lanzamiento.",
      "Combinar agentes de IA especializados en código con revisión humana permite entregar cambios en menos de 30 minutos.",
      "El flujo por WhatsApp con enlace Preview elimina el riesgo de romper el diseño en producción.",
    ],
  },
];

export const FAQS = [
  {
    question: "¿Realmente puedo pedir cualquier cambio por WhatsApp sin entrar a ningún panel?",
    answer:
      "Sí, 100%. Ese es el corazón de YRRG.ai. Nos envías un mensaje de texto, un audio de WhatsApp o un correo indicando qué quieres actualizar (precios, textos, fotos, una nueva promoción o una nueva sección) y nuestro sistema de agentes de IA junto a nuestros ingenieros genera un enlace de vista previa (Preview) en menos de 30 minutos para que lo apruebes antes de publicarlo.",
  },
  {
    question: "¿Qué incluye exactamente el pago inicial de $299 USD y los $59 USD/mes?",
    answer:
      "El pago único de $299 USD cubre todo el levantamiento inicial: nuestra reunión estratégica de 45 minutos, el diseño UX/UI a medida, la programación completa en Next.js (o la migración de tu sitio actual) y la configuración de SEO + AI SEO. La suscripción de $59 USD/mes incluye el hosting global de alta velocidad, certificado SSL, seguridad anti-hackeos, monitoreo 24/7 y todas las actualizaciones de contenido que pidas por WhatsApp.",
  },
  {
    question: "Ya tengo un sitio en WordPress o Wix, ¿pierdo mi posicionamiento en Google al migrar?",
    answer:
      "Al contrario: tu posicionamiento suele mejorar notablemente. Aplicamos nuestro protocolo de Migración sin Dolor donde conservamos tus URLs o configuramos redirecciones 301 exactas, migramos todos tus títulos, descripciones y contenidos, y multiplicamos por 10 la velocidad de carga, lo cual es premiado por Google.",
  },
  {
    question: "¿Soy dueño de mi dominio y de mi sitio web?",
    answer:
      "Siempre. Tu dominio (.com, .ar, .cl, .mx, .co, etc.) está a tu nombre. Además, no tenemos cláusulas de permanencia forzosa: confiamos en que te quedarás con nosotros por la velocidad y comodidad del servicio. Si algún día decides migrar, te entregamos todo el código fuente limpio de tu sitio.",
  },
  {
    question: "¿En cuánto tiempo está listo mi nuevo Smart Website?",
    answer:
      "Luego de nuestra charla inicial de 45 minutos, entregamos la primera versión completa de tu sitio en un enlace Preview entre 5 y 7 días hábiles para sitios comerciales estándar. Una vez que lo revisas y ajustamos cualquier detalle que desees, salimos en vivo de forma instantánea.",
  },
  {
    question: "¿Qué pasa si necesito agregar páginas nuevas a medida que mi empresa crece?",
    answer:
      "Está contemplado dentro del servicio. A diferencia de las agencias que te cobran un presupuesto nuevo por cada sección o anuncio que quieras lanzar, con YRRG.ai nos pides sumar una página de servicio, un caso de éxito o una landing para tu próxima campaña y lo construimos manteniendo la línea visual y velocidad de tu sitio.",
  },
];
