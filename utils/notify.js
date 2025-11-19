import nodemailer from 'nodemailer';
import twilio from 'twilio';

const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_SECURE,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_TO,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_WHATSAPP_FROM,
  TWILIO_WHATSAPP_TO
} = process.env;

let mailTransporter;
if (EMAIL_HOST && EMAIL_USER && EMAIL_PASS) {
  mailTransporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT) || 587,
    secure: EMAIL_SECURE === 'true',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });
}

let twilioClient;
if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN) {
  twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
}

export async function notifyInquiry({ name, email, phone, pkg, message }) {
  const subject = `New trip inquiry: ${pkg || 'Himalayan Trails package'}`;
  const bodyLines = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Package: ${pkg || 'N/A'}`,
    '',
    'Message:',
    message || ''
  ];
  const textBody = bodyLines.join('\n');

  const promises = [];

  if (mailTransporter && EMAIL_TO) {
    promises.push(
      mailTransporter.sendMail({
        from: EMAIL_USER,
        to: EMAIL_TO,
        subject,
        text: textBody,
        replyTo: email || undefined
      })
    );
  }

  if (twilioClient && TWILIO_WHATSAPP_FROM && TWILIO_WHATSAPP_TO) {
    promises.push(
      twilioClient.messages.create({
        from: TWILIO_WHATSAPP_FROM,
        to: TWILIO_WHATSAPP_TO,
        body: `${subject}\n${textBody}`
      })
    );
  }

  try {
    if (promises.length) {
      await Promise.all(promises);
    }
  } catch (err) {
    // Log notification problems for debugging but do not fail the main request
    console.error('Notification error:', err?.message || err);
  }
}
