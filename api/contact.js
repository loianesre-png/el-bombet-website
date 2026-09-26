import { generateHtmlEmail, generateTextEmail } from '../lib/contact-email.js';

const emailPattern = /^[^\s<>@,;]+@[^\s<>@,;]+\.[^\s<>@,;]+$/;
const hasNewline = /[\r\n]/;

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Metodo non consentito.' });
  }

  // Accept browser requests only from this deployment, without enabling CORS.
  try {
    if (!req.headers.origin || new URL(req.headers.origin).host !== req.headers.host) {
      return res.status(403).json({ error: 'Origine non consentita.' });
    }
  } catch {
    return res.status(403).json({ error: 'Origine non consentita.' });
  }
  if (req.headers['content-type']?.split(';')[0].trim() !== 'application/json') {
    return res.status(415).json({ error: 'Formato non supportato.' });
  }

  let data;
  try {
    const raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    if (!raw || Buffer.byteLength(raw) > 16000) {
      return res.status(413).json({ error: 'Richiesta troppo grande.' });
    }
    data = JSON.parse(raw);
  } catch {
    return res.status(400).json({ error: 'Richiesta non valida.' });
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return res.status(400).json({ error: 'Richiesta non valida.' });
  }
  // Honeypot: ordinary visitors leave this field empty.
  if (data.website) return res.status(200).json({ ok: true });

  const { name, email, guests, message = '', checkIn, checkOut } = data;
  const validDate = (value) =>
    value == null || (typeof value === 'string' && value.length <= 30 && Number.isFinite(Date.parse(value)));
  if (
    typeof name !== 'string' ||
    !name.trim() ||
    name.length > 120 ||
    hasNewline.test(name) ||
    typeof email !== 'string' ||
    email.length > 254 ||
    !emailPattern.test(email) ||
    !['string', 'number'].includes(typeof guests) ||
    !Number.isInteger(Number(guests)) ||
    Number(guests) < 1 ||
    Number(guests) > 20 ||
    typeof message !== 'string' ||
    message.length > 5000 ||
    !validDate(checkIn) ||
    !validDate(checkOut) ||
    (checkIn && checkOut && Date.parse(checkOut) <= Date.parse(checkIn))
  ) {
    return res.status(400).json({ error: 'Controlla i dati inseriti.' });
  }

  const key = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN || 'mg.fiemmenelcuore.it';
  const region = process.env.MAILGUN_REGION || 'EU';
  const to = process.env.CONTACT_EMAIL_TO || 'loianes.re@gmail.com';
  const from = process.env.MAILGUN_FROM || `El Bombet <contatti@${domain}>`;
  if (!key || !['EU', 'US'].includes(region) || !emailPattern.test(to) || hasNewline.test(from)) {
    return res.status(503).json({ error: 'Invio temporaneamente non disponibile.' });
  }

  const emailData = {
    name: name.trim(),
    email,
    guests: Number(guests),
    message: message.trim(),
    checkIn,
    checkOut,
    submitDate: new Date().toISOString(),
  };
  const body = new FormData();
  body.set('from', from);
  body.set('to', to);
  body.set('h:Reply-To', email);
  body.set('subject', 'Nuova richiesta dal sito El Bombet');
  body.set('text', generateTextEmail(emailData));
  body.set('html', generateHtmlEmail(emailData));
  body.set('o:tracking', 'no');

  try {
    const host = region === 'EU' ? 'api.eu.mailgun.net' : 'api.mailgun.net';
    const result = await fetch(`https://${host}/v3/${encodeURIComponent(domain)}/messages`, {
      method: 'POST',
      headers: { Authorization: `Basic ${Buffer.from(`api:${key}`).toString('base64')}` },
      body,
      signal: AbortSignal.timeout(8000),
    });
    if (!result.ok) {
      // Never log the API key, message contents, or the provider response body.
      console.error('Mailgun contact delivery failed', result.status);
      return res.status(502).json({ error: 'Invio non riuscito. Riprova più tardi.' });
    }
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ error: 'Invio non riuscito. Riprova più tardi.' });
  }
}
