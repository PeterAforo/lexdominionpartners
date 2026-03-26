import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const FROM_EMAIL = process.env.EMAIL_FROM || 'Lex Dominion Partners <noreply@lexdominion.com>'
const COMPANY_EMAIL = process.env.COMPANY_EMAIL || 'info@lexdominion.com'

async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  if (!resend) {
    console.log('[EMAIL] Resend not configured. Would send:', { to, subject })
    return { success: false, reason: 'Email service not configured' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
    })

    if (error) {
      console.error('[EMAIL] Send error:', error)
      return { success: false, reason: error.message }
    }

    console.log('[EMAIL] Sent successfully:', data?.id)
    return { success: true, id: data?.id }
  } catch (error: any) {
    console.error('[EMAIL] Exception:', error.message)
    return { success: false, reason: error.message }
  }
}

// ─── Booking Emails ───

export async function sendBookingConfirmationToClient({
  firstName,
  lastName,
  email,
  date,
  time,
  serviceName,
}: {
  firstName: string
  lastName: string
  email: string
  date: string
  time: string
  serviceName?: string
}) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return sendEmail({
    to: email,
    subject: 'Booking Received – Lex Dominion Partners',
    html: `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #fff;">
        <div style="background: #1a2744; padding: 30px; text-align: center;">
          <h1 style="color: #c5a54e; margin: 0; font-size: 24px;">Lex Dominion Partners</h1>
          <p style="color: rgba(255,255,255,0.7); margin: 5px 0 0; font-size: 14px;">Law &amp; Leadership</p>
        </div>
        <div style="padding: 30px;">
          <h2 style="color: #1a2744; margin-top: 0;">Booking Confirmation</h2>
          <p style="color: #555; line-height: 1.6;">Dear ${firstName} ${lastName},</p>
          <p style="color: #555; line-height: 1.6;">Thank you for scheduling a consultation with us. We have received your booking and will confirm it shortly.</p>
          <div style="background: #f8f8f8; padding: 20px; border-left: 4px solid #c5a54e; margin: 20px 0;">
            <p style="margin: 5px 0; color: #333;"><strong>Date:</strong> ${formattedDate}</p>
            <p style="margin: 5px 0; color: #333;"><strong>Time:</strong> ${time}</p>
            ${serviceName ? `<p style="margin: 5px 0; color: #333;"><strong>Service:</strong> ${serviceName}</p>` : ''}
          </div>
          <p style="color: #555; line-height: 1.6;">If you need to reschedule, please contact us at <a href="tel:+233264511778" style="color: #c5a54e;">0264511778</a>.</p>
          <p style="color: #555; line-height: 1.6;">Best regards,<br/><strong>Lex Dominion Partners</strong></p>
        </div>
        <div style="background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #999;">
          DVLA Adenta, opposite Goil Filling Station @ Ritz Junction
        </div>
      </div>
    `,
  })
}

export async function sendBookingNotificationToCompany({
  firstName,
  lastName,
  email,
  phone,
  date,
  time,
  serviceName,
  message,
}: {
  firstName: string
  lastName: string
  email: string
  phone: string
  date: string
  time: string
  serviceName?: string
  message?: string
}) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return sendEmail({
    to: COMPANY_EMAIL,
    subject: `New Booking: ${firstName} ${lastName} – ${formattedDate} at ${time}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a2744; padding: 20px; text-align: center;">
          <h2 style="color: #c5a54e; margin: 0;">New Consultation Booking</h2>
        </div>
        <div style="padding: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888; width: 120px;">Name</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #333; font-weight: bold;">${firstName} ${lastName}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #c5a54e;">${email}</a></td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="tel:${phone}" style="color: #c5a54e;">${phone}</a></td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">Date</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;">${formattedDate}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">Time</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;">${time}</td></tr>
            ${serviceName ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">Service</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;">${serviceName}</td></tr>` : ''}
            ${message ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">Message</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;">${message}</td></tr>` : ''}
          </table>
          <p style="margin-top: 20px; text-align: center;"><a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/bookings" style="display: inline-block; padding: 10px 24px; background: #c5a54e; color: #1a2744; text-decoration: none; font-weight: bold; border-radius: 2px;">View in Admin</a></p>
        </div>
      </div>
    `,
  })
}

export async function sendBookingStatusToClient({
  firstName,
  lastName,
  email,
  date,
  time,
  status,
  serviceName,
}: {
  firstName: string
  lastName: string
  email: string
  date: string
  time: string
  status: 'CONFIRMED' | 'CANCELLED'
  serviceName?: string
}) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const isConfirmed = status === 'CONFIRMED'
  const statusColor = isConfirmed ? '#22c55e' : '#ef4444'
  const statusText = isConfirmed ? 'Confirmed' : 'Cancelled'

  return sendEmail({
    to: email,
    subject: `Booking ${statusText} – Lex Dominion Partners`,
    html: `
      <div style="font-family: 'Georgia', serif; max-width: 600px; margin: 0 auto; background: #fff;">
        <div style="background: #1a2744; padding: 30px; text-align: center;">
          <h1 style="color: #c5a54e; margin: 0; font-size: 24px;">Lex Dominion Partners</h1>
        </div>
        <div style="padding: 30px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <span style="display: inline-block; padding: 8px 20px; background: ${statusColor}; color: white; font-weight: bold; border-radius: 2px; font-size: 16px;">
              Booking ${statusText}
            </span>
          </div>
          <p style="color: #555; line-height: 1.6;">Dear ${firstName} ${lastName},</p>
          ${isConfirmed
            ? `<p style="color: #555; line-height: 1.6;">Your consultation has been <strong style="color: #22c55e;">confirmed</strong>. We look forward to meeting you.</p>`
            : `<p style="color: #555; line-height: 1.6;">Unfortunately, your consultation has been <strong style="color: #ef4444;">cancelled</strong>. Please contact us to reschedule.</p>`
          }
          <div style="background: #f8f8f8; padding: 20px; border-left: 4px solid ${statusColor}; margin: 20px 0;">
            <p style="margin: 5px 0; color: #333;"><strong>Date:</strong> ${formattedDate}</p>
            <p style="margin: 5px 0; color: #333;"><strong>Time:</strong> ${time}</p>
            ${serviceName ? `<p style="margin: 5px 0; color: #333;"><strong>Service:</strong> ${serviceName}</p>` : ''}
          </div>
          <p style="color: #555; line-height: 1.6;">Questions? Call us at <a href="tel:+233264511778" style="color: #c5a54e;">0264511778</a>.</p>
          <p style="color: #555; line-height: 1.6;">Best regards,<br/><strong>Lex Dominion Partners</strong></p>
        </div>
      </div>
    `,
  })
}

// ─── Contact Form Email ───

export async function sendContactNotificationToCompany({
  name,
  email,
  phone,
  subject,
  message,
}: {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}) {
  return sendEmail({
    to: COMPANY_EMAIL,
    subject: `Contact Form: ${subject} – from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #1a2744; padding: 20px; text-align: center;">
          <h2 style="color: #c5a54e; margin: 0;">New Contact Message</h2>
        </div>
        <div style="padding: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888; width: 100px;">From</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #333; font-weight: bold;">${name}</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">Email</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #c5a54e;">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">Phone</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${phone}</td></tr>` : ''}
            <tr><td style="padding: 8px; border-bottom: 1px solid #eee; color: #888;">Subject</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #333;">${subject}</td></tr>
          </table>
          <div style="background: #f8f8f8; padding: 15px; margin-top: 15px; border-radius: 4px;">
            <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 20px; text-align: center;"><a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/messages" style="display: inline-block; padding: 10px 24px; background: #c5a54e; color: #1a2744; text-decoration: none; font-weight: bold; border-radius: 2px;">View in Admin</a></p>
        </div>
      </div>
    `,
  })
}
