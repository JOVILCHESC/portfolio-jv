export const portfolio = {
  name: 'Josué Vilches Castro',
  shortName: 'Josué Vilches',
  headline:
    'Ingeniería Civil en Computación e Informática | Desarrollo, Datos y Soporte TI',
  degree: 'Ingeniería Civil en Computación e Informática',
  location: 'Alto Hospicio, Tarapacá, Chile',
  email: 'castro.samjv@gmail.com',
  cv: `${import.meta.env.BASE_URL}CV_Josue_Vilches.pdf`,
  socialLinks: [{ label: 'GitHub', href: 'https://github.com/JOVILCHESC' }],
  education: {
    institution: 'Universidad Arturo Prat (UNAP)',
    period: '2021 - Actualidad',
    location: 'Iquique, Tarapacá, Chile',
    status:
      'Etapa final de la carrera; pendiente únicamente de Práctica Profesional II.',
    certifications: {
      issuer: 'Cisco Networking Academy',
      items: [
        'Introducción a la Ciberseguridad',
        'Gestión de Amenazas Cibernéticas',
      ],
    },
  },
  experience: [
    {
      id: 'ymca-internship',
      role: 'Practicante — Desarrollo Web y Soporte TI',
      organization: 'YMCA Iquique',
      period: 'Enero 2025 - Febrero 2025',
      description:
        'Práctica en desarrollo web, mantenimiento de contenidos y soporte técnico interno.',
      highlights: [
        'Diseño y mantenimiento de sitios en WordPress con Visual Composer, actualización de contenidos y ajustes visuales con CSS.',
        'Soporte a computadores, notebooks y periféricos: diagnóstico inicial de hardware y software, y verificación del estado y funcionamiento de equipos.',
        'Creación de material digital y recursos con códigos QR para apoyar la comunicación de la organización.',
      ],
    },
  ],
  projects: [
    {
      id: 'beijing-datamart',
      number: '01',
      category: 'Business Intelligence / Data Analytics',
      title: 'Datamart y Business Intelligence Inmobiliario',
      year: 2026,
      description:
        'Proyecto académico en equipo: un datamart y dashboards para analizar el mercado residencial de Beijing.',
      tags: ['Power BI', 'PostgreSQL', 'KNIME', 'SQL'],
      visual: 'datamart',
      objective:
        'Organizar datos inmobiliarios para analizar liquidez, valor por metro cuadrado, ubicación y características de las propiedades.',
      development:
        'El equipo implementó ETL, un datamart y un modelo multidimensional híbrido estrella/copo de nieve. Una tabla de hechos de ventas conecta dimensiones de tiempo, ubicación, propiedad, construcción y accesibilidad; Power BI presenta KPI e informes analíticos.',
      contribution:
        'Participé como integrante del equipo académico en el desarrollo del proyecto. El trabajo técnico descrito corresponde al equipo.',
      outcome:
        'Datamart y dashboards académicos para explorar indicadores de liquidez, valor y comportamiento geográfico del mercado residencial.',
      technologies: [
        'Power BI',
        'PostgreSQL',
        'KNIME',
        'SQL',
        'ETL',
        'Data Warehousing',
        'Modelado dimensional',
        'Business Intelligence',
      ],
      image: null,
      links: [],
    },
    {
      id: 'real-estate-analytics',
      number: '02',
      category: 'Data Mining / Machine Learning / Data Analytics',
      title: 'Data Mining y Machine Learning Inmobiliario',
      year: 2026,
      description:
        'Proyecto académico en equipo con CRISP-DM para estimar precios, clasificar la rotación de ventas y pronosticar tendencias del mercado de Beijing.',
      tags: ['Python', 'KNIME', 'scikit-learn', 'CRISP-DM'],
      visual: 'analytics',
      objective:
        'Estimar el precio por metro cuadrado, distinguir rotación de ventas favorable o lenta y pronosticar la tendencia mensual del mercado.',
      development:
        'El equipo siguió CRISP-DM: comprensión del negocio y los datos, preparación, ETL, análisis exploratorio, modelado y evaluación. Comparó Random Forest y XGBoost en regresión; Random Forest y LightGBM en clasificación; SARIMA y ThetaForecaster en series temporales, seleccionando este último. Se aplicaron criterios de control de fuga de información para evitar datos no disponibles al predecir.',
      contribution:
        'Analista Data Mining — Preparación de Datos y ETL. Mi aporte se centró en preparación, calidad y transformación de datos analíticos, dentro del flujo CRISP-DM y en colaboración con el equipo responsable del proyecto completo.',
      outcome:
        'Prototipo académico interactivo con React y FastAPI, como simulación de despliegue, para consultar estimaciones de precios, clasificación de rotación y pronósticos.',
      technologies: [
        'Python',
        'KNIME',
        'scikit-learn',
        'Random Forest',
        'XGBoost',
        'LightGBM',
        'SARIMA',
        'ThetaForecaster',
        'Pronóstico de series temporales',
        'CRISP-DM',
        'React',
        'FastAPI',
      ],
      image: null,
      links: [],
    },
    {
      id: 'applied-ai-vision',
      number: '03',
      category: 'Inteligencia artificial / Visión computacional',
      title: 'IA Aplicada y Visión Computacional',
      description:
        'Prototipo en Python para detectar equipos de protección personal mediante un modelo de visión computacional preentrenado.',
      tags: ['Python', 'Visión computacional', 'Gemini'],
      visual: 'vision',
      objective:
        'Explorar la detección de equipos de protección personal y el uso práctico de herramientas de inteligencia artificial.',
      development:
        'Prototipado en Python con un modelo preentrenado de visión computacional y experimentación con Gemini mediante la API de Google AI Studio.',
      contribution:
        'Mi experiencia se centra en la experimentación práctica con herramientas de IA. El desarrollo descrito corresponde al alcance del proyecto.',
      outcome:
        'Prototipo experimental de detección con un modelo preentrenado, junto con una integración exploratoria de Gemini.',
      technologies: [
        'Python',
        'Visión computacional',
        'Modelo de IA preentrenado',
        'Gemini',
        'Google AI Studio API',
      ],
      image: null,
      links: [],
    },
  ],
}
