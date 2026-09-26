// Adapted from casa-vacanze-ianes-ziano-website's contact email template.
function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character]
  );
}

function formatDate(dateString) {
  if (!dateString) return 'Non specificata';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      timeZone: 'Europe/Rome',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Generate HTML email body
 */
export function generateHtmlEmail(input, siteName = 'El Bombet') {
  const data = {
    ...input,
    name: escapeHtml(input.name),
    email: escapeHtml(input.email),
    guests: escapeHtml(input.guests),
    message: escapeHtml(input.message || ''),
  };
  siteName = escapeHtml(siteName);
  return `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nuova Richiesta di Prenotazione</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #c9a961 0%, #a98b5f 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
    <h1 style="color: white; margin: 0; font-size: 24px;">${siteName}</h1>
    <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Nuova Richiesta di Prenotazione</p>
  </div>
  
  <div style="background: #f9f9f9; padding: 30px; border: 1px solid #ddd; border-top: none;">
    <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #c9a961; padding-bottom: 10px;">Dettagli Ospite</h2>
    
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 40%;">Nome:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.name}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
          <a href="mailto:${data.email}" style="color: #c9a961;">${data.email}</a>
        </td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Numero Ospiti:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.guests || 'Non specificato'}</td>
      </tr>
    </table>

    <h2 style="color: #333; margin-top: 30px; border-bottom: 2px solid #c9a961; padding-bottom: 10px;">Date Soggiorno</h2>
    
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; width: 40%;">Check-in:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${formatDate(data.checkIn)}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold;">Check-out:</td>
        <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${formatDate(data.checkOut)}</td>
      </tr>
    </table>

    ${
      data.message
        ? `
    <h2 style="color: #333; margin-top: 30px; border-bottom: 2px solid #c9a961; padding-bottom: 10px;">Messaggio</h2>
    <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #c9a961;">
      <p style="margin: 0; white-space: pre-wrap;">${data.message}</p>
    </div>
    `
        : ''
    }

    <div style="margin-top: 30px; padding: 15px; background: #fff3cd; border-radius: 4px; border-left: 4px solid #ffc107;">
      <p style="margin: 0; font-size: 14px;">
        <strong>📧 Rispondi direttamente</strong> a questa email per contattare l'ospite.
      </p>
    </div>
  </div>
  
  <div style="text-align: center; padding: 20px; color: #666; font-size: 12px;">
    <p>Ricevuto il ${formatDate(data.submitDate)}</p>
    <p style="margin: 0;">Questo messaggio è stato inviato da ${siteName}</p>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generate plain text email body
 */
export function generateTextEmail(data, siteName = 'El Bombet') {
  return `
NUOVA RICHIESTA DI PRENOTAZIONE - ${siteName}
============================================

DETTAGLI OSPITE
---------------
Nome: ${data.name}
Email: ${data.email}
Numero Ospiti: ${data.guests || 'Non specificato'}

DATE SOGGIORNO
--------------
Check-in: ${formatDate(data.checkIn)}
Check-out: ${formatDate(data.checkOut)}

${
  data.message
    ? `MESSAGGIO
---------
${data.message}

`
    : ''
}
---
Ricevuto il ${formatDate(data.submitDate)}
Rispondi direttamente a questa email per contattare l'ospite.
  `.trim();
}
