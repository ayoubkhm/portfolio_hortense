import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.FROM_EMAIL || "noreply@hortensederuidiaz.fr";

interface ContactNotificationData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  message: string;
}

export async function sendContactNotification(
  data: ContactNotificationData
): Promise<boolean> {
  const notificationEmail =
    process.env.NOTIFICATION_EMAIL || "hortense.deruidiaz@gmail.com";
  const submittedAt = new Date().toLocaleString("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/Paris",
  });

  try {
    await resend.emails.send({
      from: `Hortense de Ruidiaz <${FROM_EMAIL}>`,
      to: notificationEmail,
      subject: `Nouvelle demande — ${data.service} — ${data.name}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; background-color: #ffffff;">
          <h1 style="font-family: 'Playfair Display', Georgia, serif; color: #2C2C2C; font-size: 22px; margin: 0 0 24px;">
            Nouvelle demande de contact
          </h1>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 12px 16px; color: #6B6560; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #E8E0D4; width: 130px; vertical-align: top;">
                Nom
              </td>
              <td style="padding: 12px 16px; color: #2C2C2C; font-size: 15px; border-bottom: 1px solid #E8E0D4;">
                ${data.name}
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; color: #6B6560; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #E8E0D4; vertical-align: top;">
                Email
              </td>
              <td style="padding: 12px 16px; font-size: 15px; border-bottom: 1px solid #E8E0D4;">
                <a href="mailto:${data.email}" style="color: #C9A96E; text-decoration: none;">${data.email}</a>
              </td>
            </tr>
            ${
              data.phone
                ? `<tr>
              <td style="padding: 12px 16px; color: #6B6560; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #E8E0D4; vertical-align: top;">
                Téléphone
              </td>
              <td style="padding: 12px 16px; color: #2C2C2C; font-size: 15px; border-bottom: 1px solid #E8E0D4;">
                ${data.phone}
              </td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding: 12px 16px; color: #6B6560; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid #E8E0D4; vertical-align: top;">
                Prestation
              </td>
              <td style="padding: 12px 16px; color: #2C2C2C; font-size: 15px; border-bottom: 1px solid #E8E0D4;">
                <span style="display: inline-block; background-color: #C9A96E; color: #ffffff; padding: 4px 12px; border-radius: 4px; font-size: 13px; font-weight: 600;">
                  ${data.service}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; color: #6B6560; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; vertical-align: top;">
                Message
              </td>
              <td style="padding: 12px 16px; color: #2C2C2C; font-size: 15px; line-height: 1.6;">
                ${data.message.replace(/\n/g, "<br />")}
              </td>
            </tr>
          </table>
          <p style="color: #6B6560; font-size: 12px; margin: 0 0 4px;">
            Reçu le ${submittedAt}
          </p>
          <hr style="border: none; border-top: 1px solid #E8E0D4; margin: 20px 0;" />
          <p style="color: #6B6560; font-size: 12px; margin: 0;">
            Hortense de Ruidiaz — Photographe &amp; Drone — Bordeaux
          </p>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error("Contact notification email error:", error);
    return false;
  }
}

export async function sendPasswordResetEmail(
  to: string,
  resetUrl: string
): Promise<boolean> {
  try {
    await resend.emails.send({
      from: `Hortense de Ruidiaz <${FROM_EMAIL}>`,
      to,
      subject: "Réinitialisation de votre mot de passe",
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-family: 'Playfair Display', Georgia, serif; color: #2C2C2C; font-size: 24px; margin-bottom: 20px;">
            Réinitialisation du mot de passe
          </h1>
          <p style="color: #6B6560; line-height: 1.6; margin-bottom: 20px;">
            Vous avez demandé la réinitialisation de votre mot de passe pour le site d'Hortense de Ruidiaz.
          </p>
          <p style="color: #6B6560; line-height: 1.6; margin-bottom: 30px;">
            Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe. Ce lien expire dans 1 heure.
          </p>
          <a href="${resetUrl}" style="display: inline-block; background-color: #C9A96E; color: white; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px;">
            Réinitialiser mon mot de passe
          </a>
          <p style="color: #6B6560; font-size: 13px; line-height: 1.6; margin-top: 30px;">
            Si vous n'avez pas fait cette demande, ignorez simplement cet email.
          </p>
          <hr style="border: none; border-top: 1px solid #E8E0D4; margin: 30px 0;" />
          <p style="color: #6B6560; font-size: 12px;">
            Hortense de Ruidiaz — Photographe & Drone — Bordeaux
          </p>
        </div>
      `,
    });
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
}
