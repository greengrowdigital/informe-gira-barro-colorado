export const recorridoIntro = {
  kicker: { es: 'Descripción de la gira', en: 'Trip description' },
  heading: { es: 'De Gamboa a los seis senderos', en: 'From Gamboa to the six trails' },
  lede: {
    es: 'La gira fue principalmente sobre Barro Colorado, el lugar principal visitado. Salimos de Gamboa e hicimos el recorrido de seis senderos distintos. El recorrido completo lo hicimos el 18 de julio y nos tomó 3 horas con 12 minutos. La principal actividad fue el senderismo: caminar por las rutas observando los distintos tipos de flora y fauna.',
    en: 'The trip centred on Barro Colorado, the main place we visited. We left from Gamboa and walked six different trails. The full route took place on 18 July and lasted 3 hours and 12 minutes. The main activity was hiking: walking the trails while observing the different kinds of flora and fauna.',
  },
}

/** Los seis senderos, en el orden en que los caminamos. */
export const senderos = [
  {
    n: 1,
    name: 'Donato Carrillo',
    findings: [
      { es: 'Planta ecuatoriana', en: 'Ecuadorian plant' },
      { es: 'Espavé', en: 'Espavé tree' },
      { es: 'Piel de iguana', en: 'Iguana skin' },
      { es: 'Arañas', en: 'Spiders' },
      { es: 'Tronador', en: 'Tronador tree' },
    ],
    body: {
      es: 'En el primer sendero pudimos observar la planta ecuatoriana —una planta traída por los ecuatorianos a Panamá— y también un espavé. En este mismo sendero vimos piel de iguana y varias arañas. El último árbol de este tramo fue el tronador, que se caracteriza por tener pinchos.',
      en: 'On the first trail we saw the Ecuadorian plant — brought to Panama by Ecuadorians — and also an espavé. On this same trail we found iguana skin and several spiders. The last tree of this stretch was the tronador, recognisable by its spines.',
    },
    note: {
      es: 'Luego nos encontramos un árbol caído. El guía nos explicó que por lo general se dejan si no molestan el paso; este sí lo hacía, así que se hizo el reporte correspondiente.',
      en: 'Further on we came across a fallen tree. The guide explained that they are usually left in place if they do not block the way; this one did, so it was duly reported.',
    },
    photo: '/img/guia-palma',
    alt: {
      es: 'El guía señalando con una vara las raíces zancudas de una palma en el sendero.',
      en: 'The guide pointing with a rod at the stilt roots of a palm on the trail.',
    },
  },
  {
    n: 2,
    name: 'James Zetek',
    findings: [{ es: 'Monos aulladores', en: 'Howler monkeys' }],
    body: {
      es: 'En el sendero James Zetek pudimos ver monos aulladores, que hacen sonidos por distintas razones: sentirse amenazados, la lluvia, marcar territorio o mantener el contacto entre ellos.',
      en: 'On the James Zetek trail we saw howler monkeys, which call out for different reasons: feeling threatened, rain, marking territory, or keeping in contact with each other.',
    },
    photo: '/img/mono-aullador',
    alt: {
      es: 'Silueta de un mono aullador entre las ramas altas, fotografiado a contraluz.',
      en: 'The silhouette of a howler monkey among high branches, photographed against the light.',
    },
  },
  {
    n: 3,
    name: 'David Fairchild',
    findings: [],
    body: {
      es: 'Tramo intermedio del recorrido. El registro detallado del grupo se concentró en los senderos donde el guía se detuvo a explicar especies concretas.',
      en: 'A middle stretch of the route. The group’s detailed record focused on the trails where the guide stopped to explain specific species.',
    },
    photo: '/img/sendero-bosque',
    alt: {
      es: 'Sendero entre troncos altos y delgados, con el suelo cubierto de hojarasca.',
      en: 'A trail between tall slim trunks, the ground covered in leaf litter.',
    },
  },
  {
    n: 4,
    name: 'Fausto',
    findings: [],
    body: {
      es: 'Continuación del recorrido por el interior de la isla, con observación constante de campo.',
      en: 'The route continued through the interior of the island, with steady field observation.',
    },
    photo: '/img/bosque-abierto',
    alt: {
      es: 'Zona de bosque más abierta, con luz llegando hasta el sotobosque.',
      en: 'A more open patch of forest, with light reaching the understory.',
    },
  },
  {
    n: 5,
    name: 'William Wheeler',
    findings: [],
    body: {
      es: 'Uno de los seis senderos recorridos durante las tres horas de caminata.',
      en: 'One of the six trails walked during the three hours on foot.',
    },
    photo: '/img/escaleras-sendero',
    alt: {
      es: 'Escaleras de concreto con barandal que suben por una pendiente del sendero.',
      en: 'Concrete steps with a handrail climbing a slope on the trail.',
    },
  },
  {
    n: 6,
    name: 'Thomas Barbour',
    findings: [
      { es: 'Árbol Panamá', en: 'Panama tree' },
      { es: 'Barrigón', en: 'Barrigón tree' },
    ],
    body: {
      es: 'En el sendero Thomas Barbour pudimos observar el árbol Panamá, que alcanzó una altura impresionante. Otro árbol que vimos fue el barrigón, cuya descripción física es tal cual lo dice su nombre.',
      en: 'On the Thomas Barbour trail we saw the Panama tree, which reached an impressive height. Another tree we saw was the barrigón — its shape is exactly what its name says.',
    },
    photo: '/img/tronco-panama',
    alt: {
      es: 'Tronco de gran altura visto desde el suelo, subiendo recto hacia el dosel.',
      en: 'A very tall trunk seen from the ground, rising straight toward the canopy.',
    },
  },
]

export const cierre = {
  heading: { es: 'De vuelta al comedor', en: 'Back to the dining hall' },
  body: {
    es: 'Ya cuando estábamos volviendo al comedor, vimos un gato solo y un mono aullador.',
    en: 'On our way back to the dining hall we saw a coati and a howler monkey.',
  },
  photo: '/img/mirador-lago',
  alt: {
    es: 'Vista del Lago Gatún desde la baranda de la estación, con el bosque a ambos lados.',
    en: 'A view of Gatun Lake from the station railing, with forest on either side.',
  },
}

export const logistica = {
  heading: { es: 'Cómo se organizó', en: 'How it was organised' },
  items: [
    {
      label: { es: 'Salida', en: 'Departure' },
      body: {
        es: 'El recorrido se inició desde Gamboa y continuó en lancha hasta la isla.',
        en: 'The route started in Gamboa and continued by boat to the island.',
      },
    },
    {
      label: { es: 'Grupos', en: 'Groups' },
      body: {
        es: 'El grupo se dividió en dos subgrupos, acompañados por los profesores Edwin Loaiza y Diego Hill, lo que facilitó un manejo óptimo de las rutas.',
        en: 'The group split into two, led by teachers Edwin Loaiza and Diego Hill, which made the routes easier to manage.',
      },
    },
    {
      label: { es: 'Tiempo', en: 'Time' },
      body: {
        es: 'Las 3 horas y 12 minutos se aprovecharon en senderismo activo y observación constante de campo, a pesar del calor y la humedad.',
        en: 'The 3 hours and 12 minutes were spent hiking and observing continuously, despite the heat and humidity.',
      },
    },
  ],
}
