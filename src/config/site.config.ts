/**
 * Site Configuration
 * ===================
 * Main configuration file for your property rental website.
 *
 * Edit this file to customize:
 * - Site name and branding
 * - Contact information
 * - Social media links
 * - Legal/compliance info
 * - External integrations
 * - SEO settings
 *
 * For detailed documentation, see: docs/configuration/site-config.md
 */

import type { SiteConfig } from './schema/site';

const siteConfig: SiteConfig = {
  // ==========================================================================
  // SITE IDENTITY
  // ==========================================================================
  identity: {
    /** Your business/site name */
    name: 'El Bombet',

    /** Short tagline (shown in some components) */
    tagline: 'Il tuo rifugio fra charme e comfort nel cuore di Trento',

    /** Logo configuration (optional - uses text if not provided) */
    logo: {
      // src: 'images/logo.png',  // Uncomment and add your logo
      alt: 'El Bombet',
      useText: true, // Set to false when using an image logo
    },
  },

  // ==========================================================================
  // CONTACT INFORMATION
  // ==========================================================================
  contact: {
    /** Primary contact email */
    email: 'lorenzo@elbombet.it',

    /** Phone number with country code */
    phone: '+39 XXX XXX XXXX',

    /** WhatsApp number (optional) */
    // whatsapp: '+39 XXX XXX XXXX',

    /** Physical address */
    address: {
      street: 'Via Dietro le Mura B, 13 – Piano terra',
      city: 'Trento',
      region: 'Trentino-Alto Adige',
      postalCode: '38122',
      country: 'Italia',
    },

    /** GPS coordinates for maps */
    coordinates: {
      lat: 46.0664,
      lng: 11.1257,
    },
  },

  // ==========================================================================
  // SOCIAL MEDIA LINKS (optional)
  // ==========================================================================
  social: {
    // facebook: 'https://facebook.com/yourproperty',
    // instagram: 'https://instagram.com/yourproperty',
    // tripadvisor: 'https://tripadvisor.com/...',
    // airbnb: 'https://airbnb.com/rooms/...',
    // booking: 'https://booking.com/hotel/...',
  },

  // ==========================================================================
  // LEGAL & COMPLIANCE
  // ==========================================================================
  legal: {
    /** Legal business name (if different from site name) */
    companyName: 'El Bombet',

    /** VAT/Tax ID number */
    // vatNumber: 'XX12345678901',

    /** Registration codes (CIR, CIN, licenses, etc.) */
    registrationCodes: [
      'CIR: 022205-AT-019048',
      'CIN: IT022205C2TTLGJDR3',
    ],

    /** Legal page URLs */
    privacyPolicyUrl: '/privacy',
    cookiePolicyUrl: '/cookies',
    // termsUrl: '/terms',

    /** Copyright year (defaults to current year if not set) */
    copyrightYear: 2025,
  },

  // ==========================================================================
  // EXTERNAL INTEGRATIONS
  // ==========================================================================
  integrations: {
    /** Contact form configuration */
    contactForm: {
      enabled: true,
      provider: 'webhook',
      webhookUrl: 'https://your-webhook-url.com/endpoint',
      // Alternative: send to email
      // provider: 'email',
      // emailTo: 'contact@example.com',
    },

    /** Analytics configuration */
    analytics: {
      // googleAnalyticsId: 'G-XXXXXXXXXX',
      // plausibleDomain: 'yourdomain.com',
    },

    /** Maps configuration */
    maps: {
      provider: 'openstreetmap', // 'google' | 'openstreetmap' | 'none'
      // apiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Required for Google Maps
      defaultZoom: 15,
    },
  },

  // ==========================================================================
  // SEO & METADATA
  // ==========================================================================
  seo: {
    /** Default page title */
    defaultTitle: 'El Bombet - Appartamento nel centro storico di Trento',

    /** Title template (use %s for page title) */
    titleTemplate: '%s — El Bombet',

    /** Default meta description */
    description: 'Mini appartamento nel cuore di Trento, a 5 minuti da Piazza Duomo. Recentemente ristrutturato, ideale per coppie e famiglie. Prenotazioni disponibili.',

    /** Site language (ISO 639-1 code) */
    language: 'it',

    /** Text direction */
    textDirection: 'ltr',

    /** Robots meta settings */
    robots: {
      index: true,
      follow: true,
    },

    /** Open Graph settings */
    openGraph: {
      image: '~/assets/images/default.png',
      type: 'website',
    },

    /** Twitter card settings */
    twitter: {
      handle: '@elbombet',
      site: '@elbombet',
      cardType: 'summary_large_image',
    },

    /** Google site verification */
    // googleSiteVerificationId: 'your-verification-id',
  },

  // ==========================================================================
  // FEATURE FLAGS
  // ==========================================================================
  features: {
    /** Enable blog functionality */
    blog: false,

    /** Show testimonials section */
    testimonials: true,

    /** Show pricing information */
    pricing: false,

    /** Enable dark mode toggle */
    darkMode: false,
  },

  // ==========================================================================
  // SITE URLS
  // ==========================================================================
  /** Full site URL (for sitemap, canonical URLs) */
  url: 'https://elbombet.it',

  /** Base path (usually '/') */
  basePath: '/',

  /** Use trailing slashes in URLs */
  trailingSlash: false,
};

export default siteConfig;
