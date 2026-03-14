// src/data/services.ts
/**
 * Services, amenities, and benefits for property rental apartments
 *
 * Note: Contact information is now managed in src/config/site.config.ts
 * The contactInfo export below is kept for backward compatibility but
 * pulls data from the centralized config.
 */

import { getContactEmail, getContactPhone, getAddress, getCoordinates } from '../config';

export interface Service {
  /** Service title */
  title: string;
  /** Detailed description */
  description: string;
  /** Tabler icon name */
  icon: string;
}

export interface Benefit {
  /** Benefit title */
  title: string;
  /** Description of the benefit */
  description: string;
  /** Optional icon */
  icon?: string;
}

export interface LocalRecommendation {
  /** Name of place/activity */
  name: string;
  /** Type (restaurant, attraction, activity, etc.) */
  type: 'restaurant' | 'attraction' | 'activity' | 'transport' | 'other';
  /** Description */
  description: string;
  /** Distance from property */
  distance?: string;
  /** Optional website or contact */
  website?: string;
}

/**
 * Core services and amenities included with all apartments
 */
export const coreServices: Service[] = [
  {
    title: 'WiFi ad alta velocità',
    description:
      'Rimani sempre connesso con una connessione veloce e stabile, ideale per lavorare da remoto o per lo streaming dei tuoi contenuti preferiti.',
    icon: 'tabler:wifi',
  },
  {
    title: 'Check-in flessibile a partire dalle 16:00',
    description:
      "Arriva quando vuoi dalle 16:00 in poi, hai la libertà di scegliere l'orario di arrivo più comodo per te. Check-out alle 10:00.",
    icon: 'tabler:door-enter',
  },
  {
    title: 'Riscaldamento e raffrescamento',
    description: "Il massimo del comfort termico in ogni stagione, per un ambiente sempre alla temperatura ideale. Impianto a pompa di calore, zero emissioni e nessun pericolo di fughe di gas o monossido di carbonio. App per la gestione remota in autonomia della temperatura.",
    icon: 'tabler:air-conditioning',
  },
  {
    title: 'Cucina ben attrezzata',
    description:
      "El Bombet dispone di una cucina completa, dotata di tutto il necessario per preparare e gustare i tuoi pasti preferiti. Moderno piano ad induzione, forno ventilato, forno microonde, bollitore, ampio frigorifero con cella freezer.",
    icon: 'tabler:tools-kitchen',
  },
  {
    title: 'Biancheria e asciugamani inclusi',
    description:
      'Troverai tutto ciò di cui hai bisogno per un soggiorno confortevole, con biancheria e asciugamani forniti per ogni ospite.',
    icon: 'tabler:bed',
  },
];

/**
 * Additional premium services (for specific apartments)
 */
export const premiumServices: Service[] = [
  {
    title: 'Lavatrice e asciugatrice',
    description:
      'Lavatrice e asciugatrice disponibili per soggiorni prolungati, garantendo massima comodità e autonomia.',
    icon: 'tabler:wash',
  },
  {
    title: 'TV Smart di grandi dimensioni',
    description:
      'Smart TV con accesso a piattaforme streaming e ampia selezione di canali per il tuo intrattenimento.',
    icon: 'tabler:device-tv',
  },
  {
    title: 'Cucina professionale',
    description:
      'Cucina completamente equipaggiata con elettrodomestici di fascia alta e tutto il necessario per gli amanti della cucina.',
    icon: 'tabler:chef-hat',
  },
];

/**
 * Trentino Guest Card benefits
 */
export const trentinoGuestCardBenefits: Benefit[] = [
  {
    title: 'Trasporti pubblici gratuiti',
    description:
      'Accesso illimitato a tutti i mezzi pubblici del Trentino, inclusi autobus urbani ed extraurbani per spostarsi comodamente in tutta la regione.',
    icon: 'tabler:bus',
  },
  {
    title: 'Ingressi a musei e castelli',
    description:
      'Accesso gratuito o scontato a oltre 60 musei, castelli e siti culturali del Trentino, inclusi il MUSE, Castello del Buonconsiglio e molto altro.',
    icon: 'tabler:building-castle',
  },
  {
    title: 'Funivie e impianti di risalita',
    description:
      'Tariffe agevolate per funivie, seggiovie e skilift in numerose località montane, per raggiungere facilmente i sentieri e i panorami più belli.',
    icon: 'tabler:stairs-up',
  },
  {
    title: 'Attività outdoor e sport',
    description:
      'Sconti su attività come rafting, canyoning, noleggio biciclette, passeggiate guidate e esperienze nella natura trentina.',
    icon: 'tabler:mountain',
  },
  {
    title: 'Piscine e centri benessere',
    description:
      'Accesso scontato a piscine, terme e centri benessere convenzionati per momenti di relax e rigenerazione.',
    icon: 'tabler:pool',
  },
  {
    title: 'Degustazioni e cantine',
    description:
      'Visite guidate e degustazioni presso cantine, malghe e produttori locali per scoprire i sapori autentici del Trentino.',
    icon: 'tabler:glass',
  },
];

/**
 * Local recommendations and attractions
 */
export const localRecommendations: LocalRecommendation[] = [
  {
    name: 'Centro storico di Trento',
    type: 'attraction',
    description:
      'Bellissimo centro medievale con Piazza Duomo, Castello del Buonconsiglio e vie storiche ricche di negozi e caffè.',
    distance: '0 m',
  },
  {
    name: 'MUSE - Museo delle Scienze',
    type: 'attraction',
    description:
      'Museo interattivo e innovativo progettato da Renzo Piano, perfetto per famiglie e appassionati di scienza.',
    distance: '1,5 km a piedi',
  },
  {
    name: 'Monte Bondone',
    type: 'attraction',
    description:
      "L'altopiano di Trento, ideale per escursioni estive, sci invernale e panorami mozzafiato. Raggiungibile in 30 minuti.",
    distance: '15 km',
  },
  {
    name: 'Lago di Garda',
    type: 'attraction',
    description:
      'Il più grande lago italiano, con borghi pittoreschi, spiagge e attività acquatiche. Torbole e Riva del Garda a 40 minuti.',
    distance: '35 km',
  },
  {
    name: 'Dolomiti di Brenta',
    type: 'attraction',
    description:
      'Patrimonio UNESCO, ideale per trekking, arrampicata e fotografia naturalistica. Madonna di Campiglio a 60 km.',
    distance: '60 km',
  },
  {
    name: 'Mercatini di Natale',
    type: 'attraction',
    description:
      'Durante il periodo natalizio, Trento ospita famosi mercatini con artigianato locale, gastronomia e atmosfera magica.',
    distance: '200 m',
  },
  {
    name: "Festival dell'Economia",
    type: 'attraction',
    description:
      "Durante il Festival dell'Economia, Trento diventa un palcoscenico internazionale: grandi premi Nobel ed esperti si incontrano tra le piazze e i palazzi del centro per dibattiti e riflessioni sul futuro.",
    distance: '400 m',
  },
  {
    name: 'Trento Filmfestival della Montagna',
    type: 'attraction',
    description:
      "A fine aprile con il Trento Film Festival, la città celebra il cinema di montagna con la rassegna più antica del mondo: proiezioni d'autore, alpinisti e grandi anteprime internazionali tra cultura e avventura.",
    distance: '200 m',
  },
  {
    name: 'Festival dello Sport',
    type: 'attraction',
    description:
      'In autunno con il Festival dello Sport, Trento si trasforma in un villaggio olimpico a cielo aperto: grandi campioni internazionali e leggende dello sport si raccontano tra i palazzi del centro.',
    distance: '400 m',
  },
  {
    name: 'Orrido di Ponte Alto',
    type: 'attraction',
    description:
      'Spettacolare gola naturale scavata dal torrente Fersina, con passerelle panoramiche e cascate. Perfetto per passeggiate.',
    distance: '3 km',
  },
  {
    name: 'Fermate autobus urbano',
    type: 'transport',
    description:
      'Fermata autobus nelle vicinanze con collegamenti frequenti per la stazione dei treni, dei pullman ed i sobborghi della collina, Poli Universitari e Centri di Ricerca.',
    distance: '100 m',
  },
  {
    name: 'Supermercato',
    type: 'other',
    description: 'Supermercati e negozi di alimentari nelle immediate vicinanze per la spesa quotidiana.',
    distance: '500 m',
  },
  {
    name: 'Ristoranti tipici trentini',
    type: 'restaurant',
    description:
      'Numerosi ristoranti nella zona che servono specialità trentine come canederli, polenta, carne salada e piatti a base di selvaggina.',
    distance: '1-3 km',
  },
];

/**
 * House rules and important information
 */
export interface HouseRule {
  title: string;
  description: string;
  icon?: string;
}

export const houseRules: HouseRule[] = [
  {
    title: 'Check-in / Check-out',
    description: 'Check-in dalle 16:00, check-out entro le 10:00. Orari flessibili su richiesta.',
    icon: 'tabler:clock',
  },
  {
    title: 'Non fumatori',
    description: 'È vietato fumare all\'interno degli appartamenti. È possibile fumare sul balcone.',
    icon: 'tabler:smoking-no',
  },
  {
    title: 'Animali domestici',
    description: 'Gli animali domestici sono ammessi previo accordo con i proprietari.',
    icon: 'tabler:paw',
  },
  {
    title: 'Feste e rumori',
    description: 'Si prega di rispettare la quiete serale dopo le 22:00 per il comfort di tutti gli ospiti.',
    icon: 'tabler:volume',
  },
  {
    title: 'Pulizia',
    description: 'Pulizia finale inclusa. Pulizie intermedie disponibili su richiesta per soggiorni prolungati.',
    icon: 'tabler:vacuum-cleaner',
  },
];

/**
 * Contact information
 * Now pulls from centralized config (src/config/site.config.ts)
 */
export const contactInfo = {
  get email() {
    return getContactEmail();
  },
  get phone() {
    return getContactPhone() || '';
  },
  get address() {
    return getAddress();
  },
  get coordinates() {
    return getCoordinates();
  },
};

/**
 * Pricing information (optional - can be customized)
 */
export interface PricingPeriod {
  name: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export const pricingPeriods: PricingPeriod[] = [
  {
    name: 'Bassa stagione',
    startDate: 'Novembre - Marzo (escluso Natale/Capodanno)',
    endDate: '',
    description: 'Periodo ideale per visitare i mercatini di Natale e godersi la quiete invernale.',
  },
  {
    name: 'Media stagione',
    startDate: 'Aprile - Maggio, Settembre - Ottobre',
    endDate: '',
    description: 'Stagione perfetta per escursioni e temperature miti.',
  },
  {
    name: 'Alta stagione',
    startDate: 'Giugno - Agosto',
    endDate: '',
    description: 'Estate con clima ideale per attività outdoor e lago di Garda.',
  },
  {
    name: 'Festività',
    startDate: 'Natale, Capodanno, Pasqua',
    endDate: '',
    description: 'Periodi speciali con eventi e atmosfera unica.',
  },
];
