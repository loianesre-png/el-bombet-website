import { getPermalink } from './utils/permalinks';
import {
  getContactEmail,
  getFormattedRegistrationCodes,
  getCopyrightText,
  getSiteName,
} from './config';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: '/',
    },
    {
      text: 'Chi Siamo',
      href: '/#about',
    },
    {
      text: 'Appartamento',
      href: '/#properties',
    },
    {
      text: 'Servizi',
      href: '/#amenities',
    },
    {
      text: 'Recensioni',
      href: '/#testimonials',
    },
  ],
  actions: [
    {
      text: 'Contattaci',
      href: '/contatti',
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Link Rapidi',
      links: [
        { text: 'Home', href: '/' },
        { text: 'Chi Siamo', href: '/#about' },
        { text: 'Appartamento', href: '/#properties' },
        { text: 'Servizi', href: '/#amenities' },
        { text: 'Recensioni', href: '/#testimonials' },
        { text: 'Contatti', href: '/contact' },
      ],
    },
    {
      title: 'Informazioni',
      links: [
        { text: 'El Bombet', href: '/properties/el-bombet' },
        { text: 'Check-in: 15:00-23:30', href: '/#properties' },
        { text: 'Check-out: 08:00-11:00', href: '/#properties' },
        { text: 'Centro Storico Trento', href: '/#about' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Cookies', href: getPermalink('/cookies') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
    { text: getContactEmail(), href: `mailto:${getContactEmail()}` },
  ],
  socialLinks: [
    // { ariaLabel: 'X', icon: 'tabler:brand-x', href: '#' },
    // { ariaLabel: 'Instagram', icon: 'tabler:brand-instagram', href: '#' },
    // { ariaLabel: 'Facebook', icon: 'tabler:brand-facebook', href: '#' },
    // { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    // { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/onwidget/astrowind' },
  ],
  footNote: `
      Registration Codes: ${getFormattedRegistrationCodes()}
      <br />
      ${getCopyrightText()}. All rights reserved.

  `,
};
