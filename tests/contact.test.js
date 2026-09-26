import assert from 'node:assert/strict';
import { test } from 'node:test';
import handler from '../api/contact.js';

const valid = {
  name: 'Test visitor',
  email: 'visitor@example.com',
  guests: '2',
  message: 'Test message',
  checkIn: '2026-10-01T22:00:00.000Z',
  checkOut: '2026-10-04T22:00:00.000Z',
};

async function invoke(body = valid, overrides = {}) {
  const response = {
    headers: {},
    setHeader(key, value) {
      this.headers[key] = value;
    },
    status(code) {
      this.code = code;
      return this;
    },
    json(value) {
      this.body = value;
      return this;
    },
  };
  await handler(
    {
      method: 'POST',
      headers: { host: 'elbombet.test', origin: 'https://elbombet.test', 'content-type': 'application/json' },
      body,
      ...overrides,
    },
    response
  );
  return response;
}

test('contact delivery and rejection behavior', async (t) => {
  const previousEnv = { ...process.env };
  const previousFetch = globalThis.fetch;
  t.after(() => {
    process.env = previousEnv;
    globalThis.fetch = previousFetch;
  });
  process.env.MAILGUN_API_KEY = 'test-only-secret';
  process.env.MAILGUN_DOMAIN = 'mg.fiemmenelcuore.it';
  process.env.MAILGUN_REGION = 'EU';
  process.env.CONTACT_EMAIL_TO = 'owner@example.com';
  process.env.MAILGUN_FROM = 'El Bombet <contatti@mg.fiemmenelcuore.it>';
  let calls = 0;
  globalThis.fetch = async (url, options) => {
    calls++;
    assert.equal(url, 'https://api.eu.mailgun.net/v3/mg.fiemmenelcuore.it/messages');
    assert.equal(options.body.get('to'), 'owner@example.com');
    assert.match(options.body.get('html'), /El Bombet/);
    assert.match(options.body.get('html'), /Dettagli Ospite/);
    assert.equal(options.body.get('h:Reply-To'), 'visitor@example.com');
    assert.equal(options.body.get('from'), process.env.MAILGUN_FROM);
    assert.match(options.body.get('text'), /2 ottobre 2026/);
    assert.equal(options.headers.Authorization, `Basic ${Buffer.from('api:test-only-secret').toString('base64')}`);
    return { ok: true };
  };
  const success = await invoke({ ...valid, to: 'attacker@example.com', from: 'attacker@example.com' });
  assert.equal(success.code, 200);
  assert.equal(success.headers['Cache-Control'], 'no-store');
  assert.equal(calls, 1);

  const rejected = [
    [valid, { method: 'GET' }, 405],
    [valid, { headers: { host: 'elbombet.test', origin: 'https://foreign.test' } }, 403],
    [valid, { headers: { host: 'elbombet.test' } }, 403],
    [valid, { headers: { host: 'elbombet.test', origin: 'https://elbombet.test', 'content-type': 'text/plain' } }, 415],
    ['{broken', {}, 400],
    [null, {}, 400],
    [{ ...valid, email: 'visitor@example.com\r\nBcc: other@example.com' }, {}, 400],
    [{ ...valid, name: ' ' }, {}, 400],
    [{ ...valid, guests: 1.5 }, {}, 400],
    [{ ...valid, checkOut: valid.checkIn }, {}, 400],
    [{ ...valid, checkIn: 'invalid' }, {}, 400],
    [{ ...valid, message: 'x'.repeat(5001) }, {}, 400],
    [{ ...valid, message: 'x'.repeat(17000) }, {}, 413],
  ];
  for (const [body, overrides, code] of rejected) assert.equal((await invoke(body, overrides)).code, code);
  assert.equal((await invoke({ ...valid, website: 'spam.test' })).code, 200);
  assert.equal(calls, 1, 'invalid and honeypot submissions must not reach Mailgun');

  delete process.env.MAILGUN_API_KEY;
  assert.equal((await invoke()).code, 503);
  assert.equal(calls, 1);
  process.env.MAILGUN_API_KEY = 'test-only-secret';
  globalThis.fetch = async () => ({ ok: false, status: 401 });
  assert.equal((await invoke()).code, 502);
  globalThis.fetch = async () => {
    throw new Error('private provider detail');
  };
  const failed = await invoke();
  assert.equal(failed.code, 502);
  assert.doesNotMatch(JSON.stringify(failed.body), /private|secret/);
});
