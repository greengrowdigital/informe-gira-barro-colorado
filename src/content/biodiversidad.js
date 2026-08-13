export const bioIntro = {
  kicker: { es: 'Conocimientos adquiridos', en: 'What we recorded' },
  heading: { es: 'Nueve registros de campo', en: 'Nine field records' },
  lede: {
    es: 'Se logró identificar directamente en el campo diversas especies botánicas y faunísticas características de la región. Cada ficha recoge lo que el guía nos explicó y en qué sendero lo vimos.',
    en: 'We identified a range of plants and animals characteristic of the region directly in the field. Each record holds what the guide explained to us and which trail we saw it on.',
  },
  note: {
    es: 'Las fotografías del recorrido están reunidas en Anexos. Aquí registramos la observación, no una identificación taxonómica formal.',
    en: 'The photographs from the walk are collected in the Appendix. What we record here is the observation, not a formal taxonomic identification.',
  },
}

export const flora = {
  label: { es: 'Flora', en: 'Flora' },
  count: 5,
  items: [
    {
      id: 'planta-ecuatoriana',
      name: { es: 'Planta ecuatoriana', en: 'Ecuadorian plant' },
      trail: 'Donato Carrillo',
      fact: {
        es: 'Es una planta traída por los ecuatorianos a Panamá; no es originaria de la isla.',
        en: 'A plant brought to Panama by Ecuadorians — it is not native to the island.',
      },
    },
    {
      id: 'espave',
      name: { es: 'Espavé', en: 'Espavé' },
      trail: 'Donato Carrillo',
      fact: {
        es: 'Uno de los árboles grandes del bosque, observado en el primer tramo del recorrido.',
        en: 'One of the large trees of the forest, seen on the first stretch of the route.',
      },
    },
    {
      id: 'tronador',
      name: { es: 'Tronador', en: 'Tronador' },
      trail: 'Donato Carrillo',
      fact: {
        es: 'Se reconoce por los pinchos que cubren su tronco. Fue el último árbol que vimos en ese sendero.',
        en: 'Recognisable by the spines covering its trunk. It was the last tree we saw on that trail.',
      },
    },
    {
      id: 'arbol-panama',
      name: { es: 'Árbol Panamá', en: 'Panama tree' },
      trail: 'Thomas Barbour',
      fact: {
        es: 'Alcanzó una altura impresionante; hubo que echar la cabeza atrás para verle la copa.',
        en: 'It reached an impressive height — you had to tip your head back to see the crown.',
      },
    },
    {
      id: 'barrigon',
      name: { es: 'Barrigón', en: 'Barrigón' },
      trail: 'Thomas Barbour',
      fact: {
        es: 'Su descripción física es tal cual lo dice el nombre: el tronco se ensancha por el medio.',
        en: 'Its shape is exactly what the name says — the trunk swells out in the middle.',
      },
      photo: '/img/barrigon',
      alt: {
        es: 'Tronco de un árbol que se ensancha notablemente en su parte media, visto desde el suelo del bosque.',
        en: 'A tree trunk that widens noticeably at its middle, seen from the forest floor.',
      },
    },
  ],
}

export const fauna = {
  label: { es: 'Fauna', en: 'Fauna' },
  count: 4,
  items: [
    {
      id: 'mono-aullador',
      name: { es: 'Mono aullador', en: 'Howler monkey' },
      trail: 'James Zetek',
      fact: {
        es: 'Lo vimos en el sendero James Zetek y otra vez al volver al comedor.',
        en: 'We saw one on the James Zetek trail and again on the way back to the dining hall.',
      },
      photo: '/img/mono-aullador',
      alt: {
        es: 'Mono aullador entre el follaje de las ramas altas, fotografiado a contraluz.',
        en: 'A howler monkey among the foliage of high branches, photographed against the light.',
      },
      /** Las cuatro razones que nos explicó el guía. */
      reasons: [
        { es: 'Sentirse amenazados', en: 'Feeling threatened' },
        { es: 'La lluvia', en: 'Rain' },
        { es: 'Marcar territorio', en: 'Marking territory' },
        { es: 'Mantener el contacto', en: 'Keeping in contact' },
      ],
      reasonsLabel: {
        es: 'Por qué vocalizan',
        en: 'Why they call out',
      },
    },
    {
      id: 'aranas',
      name: { es: 'Arañas', en: 'Spiders' },
      trail: 'Donato Carrillo',
      fact: {
        es: 'Vimos varias a lo largo del primer sendero, entre la vegetación baja.',
        en: 'We saw several along the first trail, among the low vegetation.',
      },
    },
    {
      id: 'iguana',
      name: { es: 'Iguana', en: 'Iguana' },
      trail: 'Donato Carrillo',
      fact: {
        es: 'No vimos al animal, sino su piel: la muda que dejó atrás es evidencia de que estuvo ahí.',
        en: 'We did not see the animal itself but its skin — the shed left behind is evidence it was there.',
      },
    },
    {
      id: 'gato-solo',
      name: { es: 'Gato solo', en: 'Coati' },
      alias: { es: 'niño de la selva · coatí', en: 'coatimundi' },
      trail: { es: 'Regreso al comedor', en: 'Return to the dining hall' },
      fact: {
        es: 'Apareció ya de vuelta, cerca del comedor, cuando el recorrido terminaba.',
        en: 'It turned up on the way back, near the dining hall, as the walk was ending.',
      },
    },
  ],
}

export const curricular = {
  heading: { es: 'Lo que confirmamos en el campo', en: 'What the field confirmed' },
  body: {
    es: 'La experiencia permitió validar en un escenario real las teorías sobre biodiversidad, dinámicas ecológicas y conservación de ecosistemas tropicales. Asimismo, se comprendió el valor de la Isla Barro Colorado como un centro neurálgico para la investigación científica a nivel internacional.',
    en: 'The experience let us test, in a real setting, the theory about biodiversity, ecological dynamics and the conservation of tropical ecosystems. It also showed us the value of Barro Colorado Island as a hub for international scientific research.',
  },
  photos: [
    {
      src: '/img/craneos-coleccion',
      alt: {
        es: 'Cráneos de reptil conservados sobre una bandeja blanca en el laboratorio de la estación.',
        en: 'Preserved reptile skulls on a white tray in the station laboratory.',
      },
      caption: {
        es: 'Colección de referencia de la estación científica.',
        en: 'Reference collection at the research station.',
      },
    },
    {
      src: '/img/panel-biodiversidad',
      alt: {
        es: 'Panel informativo del Smithsonian con fotografías de especies y mapas de la isla.',
        en: 'A Smithsonian interpretive panel with species photographs and maps of the island.',
      },
      caption: {
        es: 'La charla del final resumió la biodiversidad registrada en la isla.',
        en: 'The closing talk summed up the biodiversity recorded on the island.',
      },
    },
  ],
}
