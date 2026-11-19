const asset = (name) => `${import.meta.env.BASE_URL}projects/epp/${name}`

export const caseStudies = [
  {
    id: 'applied-ai-vision',
    path: 'projects/deteccion-epp/',
    name: 'Vigía',
    title: 'La seguridad,\na la vista.',
    subtitle: 'Detección de equipos de protección personal',
    category: 'IA aplicada / Visión computacional',
    description:
      'De la detección de personas y EPP a la consulta de evidencias. Un prototipo local que conecta visión computacional, registros históricos y una interfaz de supervisión.',
    metaTitle: 'Vigía — Detección de EPP | Josué Vilches Castro',
    metaDescription:
      'Caso de estudio de Vigía: prototipo local de detección de EPP con Python, YOLOv8, OpenCV, WebSocket y React. Capturas reales, arquitectura y límites del sistema.',
    tags: ['Python', 'YOLOv8', 'OpenCV', 'React', 'WebSocket'],
    problem:
      'Supervisar el uso de equipos de protección personal requiere observar el contexto y poder revisar lo ocurrido. Este proyecto explora cómo la visión computacional puede apoyar esa tarea: detectar personas y EPP, conservar imágenes y facilitar su consulta.',
    scope:
      'El alcance previsto verifica casco y chaleco, con botas opcionales. Es un prototipo local de apoyo a la supervisión; no sustituye una evaluación de seguridad ni acredita cumplimiento industrial.',
    architecture: [
      {
        title: 'Capturar',
        tool: 'Python + OpenCV',
        description:
          'Una cámara local entrega los fotogramas al controlador de detección.',
      },
      {
        title: 'Detectar',
        tool: 'Ultralytics YOLOv8',
        description:
          'El modelo identifica personas, cascos, chalecos y calzado. El controlador asocia los elementos a las personas y dibuja las detecciones.',
      },
      {
        title: 'Conservar',
        tool: 'MongoDB + archivos',
        description:
          'Se guardan etiquetas, fechas y rutas a las imágenes. La API HTTP permite consultar registros y gestionar observaciones.',
      },
      {
        title: 'Consultar',
        tool: 'React + WebSocket',
        description:
          'La interfaz consulta el archivo mediante HTTP y recibe fotogramas JPEG mediante WebSocket cuando hay una cámara disponible.',
      },
    ],
    technologies: [
      {
        title: 'Visión y procesamiento',
        items: ['Python', 'Ultralytics YOLOv8', 'OpenCV'],
      },
      {
        title: 'Interfaz de supervisión',
        items: ['React', 'Vite', 'JavaScript', 'HTML', 'CSS'],
      },
      {
        title: 'Comunicación y registros',
        items: ['WebSocket', 'HTTP', 'MongoDB', 'PyMongo'],
      },
    ],
    status: [
      {
        label: 'Implementado',
        title: 'Un archivo que se puede explorar.',
        description:
          'Dashboard, historial con búsqueda, filtros y paginación, detalle de evidencia y gestión de observaciones. La interfaz distingue conexión de transporte y recepción de video.',
      },
      {
        label: 'Límite actual',
        title: 'La cámara no está disponible.',
        description:
          'El código de detección y transmisión existe, pero no se verificó la inferencia en vivo en esta revisión. Las capturas muestran registros históricos y el estado real sin transmisión.',
      },
      {
        label: 'Pendiente técnico',
        title: 'Alinear la regla de EPP.',
        description:
          'Aunque la política prevista considera las botas opcionales, la condición heredada todavía las exige. También queda pendiente unificar el tratamiento de fechas del backend. Las etiquetas históricas se conservan sin reinterpretarlas.',
      },
    ],
    images: [
      {
        id: 'dashboard',
        title: 'Vista general',
        label: 'Dashboard',
        src: asset('dashboard.webp'),
        original: asset('dashboard.png'),
        width: 1440,
        height: 1275,
        alt: 'Dashboard de Vigía con indicadores del archivo, actividad histórica y cámara sin transmisión.',
        caption:
          'Una lectura del archivo: actividad por fecha, clasificación de registros y acceso a las evidencias. Los contadores representan registros históricos, no personas únicas ni precisión del modelo.',
      },
      {
        id: 'history',
        title: 'Del registro a su contexto',
        label: 'Historial',
        src: asset('history.webp'),
        original: asset('history.png'),
        width: 1440,
        height: 1242,
        alt: 'Historial de Vigía con categorías, búsqueda, filtros por fecha y evidencias con fotografías difuminadas.',
        caption:
          'Búsqueda, filtros y paginación para recorrer las evidencias. Las categorías agrupan etiquetas originales; no constituyen una nueva evaluación de cada imagen.',
      },
      {
        id: 'incident-detail',
        title: 'La evidencia, en detalle',
        label: 'Detalle',
        src: asset('incident-detail.webp'),
        original: asset('incident-detail.png'),
        width: 1440,
        height: 1000,
        alt: 'Detalle de un incidente con fotografía protegida, fecha, clasificación original y espacio para observaciones.',
        caption:
          'La fotografía se presenta junto a sus metadatos y observaciones. Si la etiqueta no indica qué elemento faltaba, la interfaz no lo deduce.',
      },
      {
        id: 'monitoring',
        title: 'Mostrar el estado real',
        label: 'Monitoreo',
        src: asset('monitoring.webp'),
        original: asset('monitoring.png'),
        width: 1440,
        height: 1000,
        alt: 'Pantalla de monitoreo de Vigía sin señal de cámara, con conexión manual e información de WebSocket y YOLOv8.',
        caption:
          'El monitoreo se inicia de forma explícita. Una conexión abierta no equivale a video disponible: solo la recepción de fotogramas activa la transmisión en la interfaz.',
      },
      {
        id: 'dashboard-mobile',
        title: 'Supervisión en formato móvil',
        label: 'Dashboard móvil',
        src: asset('dashboard-mobile.webp'),
        original: asset('dashboard-mobile.png'),
        width: 390,
        height: 2092,
        alt: 'Captura móvil completa del dashboard, con indicadores en dos columnas y paneles apilados.',
        caption:
          'La misma información se reorganiza para pantallas pequeñas, manteniendo el contexto del archivo y el estado de la cámara.',
      },
      {
        id: 'history-mobile',
        title: 'Evidencias a mano',
        label: 'Historial móvil',
        src: asset('history-mobile.webp'),
        original: asset('history-mobile.png'),
        width: 390,
        height: 3630,
        alt: 'Captura móvil completa del historial con filtros y tarjetas de evidencia con identidad protegida.',
        caption:
          'El historial dispone de una presentación en tarjetas para consultar las imágenes en móvil. Amplía la captura para recorrerla a su resolución original.',
      },
    ],
  },
]

export function findCaseStudy(pathname) {
  const relative = pathname.startsWith(import.meta.env.BASE_URL)
    ? pathname.slice(import.meta.env.BASE_URL.length)
    : pathname.replace(/^\//, '')
  return caseStudies.find(
    (project) => project.path === `${relative.replace(/\/$/, '')}/`,
  )
}
