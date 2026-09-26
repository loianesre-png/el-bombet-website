import assert from 'node:assert/strict';
import { test } from 'node:test';
import { generateHtmlEmail, generateTextEmail } from '../lib/contact-email.js';

test('template escapes visitor content and preserves multiline messages', () => {
  const data = {
    name: '<img src=x onerror=alert(1)>',
    email: 'guest"test@example.com',
    guests: 2,
    message: 'First line\n<script>alert(1)</script> & last line',
    checkIn: '2026-10-01T22:00:00Z',
    checkOut: '2026-10-04T22:00:00Z',
    submitDate: '2026-09-26T12:00:00Z',
  };
  const html = generateHtmlEmail(data);
  assert.match(html, /&lt;img/);
  assert.match(html, /&lt;script&gt;/);
  assert.match(html, /guest&quot;test@example.com/);
  assert.doesNotMatch(html, /<script>|<img/);
  assert.match(html, /First line\n/);
  assert.match(html, /2 ottobre 2026/);
  assert.match(html, /Questo messaggio è stato inviato da El Bombet/);
  assert.match(generateTextEmail(data), /NUOVA RICHIESTA DI PRENOTAZIONE - El Bombet/);
});

test('optional message and dates render without empty sections or invalid dates', () => {
  const data = { name: 'Mario', email: 'mario@example.com', guests: 2, submitDate: '2026-09-26T12:00:00Z' };
  const html = generateHtmlEmail(data);
  assert.match(html, /Non specificata/);
  assert.doesNotMatch(html, />Messaggio<|undefined|Invalid Date/);
});
