import { Resend } from 'resend'

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY)

// Email configuration
// For development/testing, use Resend's test domain: onboarding@resend.dev
// For production, verify your domain in Resend and use your own domain
const FROM_EMAIL = process.env.FROM_EMAIL || 'Tenerife.Music <onboarding@resend.dev>'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'ev.zhdanov@gmail.com'
const SITE_NAME = 'Tenerife.Music'

// Validate that API key is set
if (!process.env.RESEND_API_KEY) {
  console.warn('⚠️  RESEND_API_KEY is not set. Email functionality will not work.')
}

/**
 * Send a contact form notification email to admin
 */
export async function sendContactNotification(data: {
  name: string
  email: string
  message: string
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured')
  }

  try {
    console.log('📧 Sending contact notification email...', { to: ADMIN_EMAIL, from: FROM_EMAIL })
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      replyTo: data.email,
      subject: `New Contact Form Submission from ${data.name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #00A6A6 0%, #003A4D 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            </div>
            <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #003A4D; margin-top: 0; font-size: 20px;">Contact Information</h2>
                <p style="margin: 10px 0;"><strong>Name:</strong> ${escapeHtml(data.name)}</p>
                <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}" style="color: #00A6A6; text-decoration: none;">${escapeHtml(data.email)}</a></p>
              </div>
              
              <div style="background: white; padding: 20px; border-radius: 8px;">
                <h2 style="color: #003A4D; margin-top: 0; font-size: 20px;">Message</h2>
                <p style="white-space: pre-wrap; color: #4b5563; line-height: 1.8;">${escapeHtml(data.message)}</p>
              </div>
              
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
                <a href="mailto:${escapeHtml(data.email)}" style="display: inline-block; background: #00A6A6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">Reply to ${escapeHtml(data.name)}</a>
              </div>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
              <p>This email was sent from the ${SITE_NAME} contact form.</p>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission

Contact Information:
Name: ${data.name}
Email: ${data.email}

Message:
${data.message}

---
This email was sent from the ${SITE_NAME} contact form.
      `.trim(),
    })

    // Check if email was actually sent successfully
    if (!result.data?.id) {
      const errorMessage = 'Email send failed: No ID returned from Resend API'
      console.error('❌', errorMessage, { result })
      throw new Error(errorMessage)
    }

    console.log('✅ Contact notification email sent successfully', { id: result.data.id })
    return { success: true, id: result.data.id }
  } catch (error: any) {
    console.error('❌ Error sending contact notification email:', error)
    console.error('Error details:', {
      message: error?.message,
      name: error?.name,
      statusCode: error?.statusCode,
      result: error?.result,
    })
    throw error
  }
}

/**
 * Send a confirmation email to the user who submitted the contact form
 */
export async function sendContactConfirmation(data: {
  name: string
  email: string
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured')
  }

  try {
    console.log('📧 Sending contact confirmation email...', { to: data.email, from: FROM_EMAIL })
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [data.email],
      subject: `Thank you for contacting ${SITE_NAME}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank you for contacting us</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #00A6A6 0%, #003A4D 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Thank You, ${escapeHtml(data.name)}!</h1>
            </div>
            <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
              <p style="color: #4b5563; font-size: 16px; margin: 0 0 20px 0;">
                We've received your message and will get back to you as soon as possible. Our team typically responds within 24-48 hours.
              </p>
              <p style="color: #4b5563; font-size: 16px; margin: 0;">
                In the meantime, feel free to explore our website to discover the best music events and venues in Tenerife!
              </p>
              <div style="margin-top: 30px; text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://tenerife.music'}" style="display: inline-block; background: #00A6A6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">Visit Our Website</a>
              </div>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
              <p>This is an automated confirmation email from ${SITE_NAME}.</p>
            </div>
          </body>
        </html>
      `,
      text: `
Thank You, ${data.name}!

We've received your message and will get back to you as soon as possible. Our team typically responds within 24-48 hours.

In the meantime, feel free to explore our website to discover the best music events and venues in Tenerife!

Visit our website: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://tenerife.music'}

---
This is an automated confirmation email from ${SITE_NAME}.
      `.trim(),
    })

    // Check if email was actually sent successfully
    if (!result.data?.id) {
      const errorMessage = 'Email send failed: No ID returned from Resend API'
      console.error('❌', errorMessage, { result })
      throw new Error(errorMessage)
    }

    console.log('✅ Contact confirmation email sent successfully', { id: result.data.id })
    return { success: true, id: result.data.id }
  } catch (error: any) {
    console.error('❌ Error sending contact confirmation email:', error)
    console.error('Error details:', {
      message: error?.message,
      name: error?.name,
      statusCode: error?.statusCode,
      result: error?.result,
    })
    throw error
  }
}

/**
 * Send a welcome email to new subscribers
 */
export async function sendWelcomeEmail(email: string) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured')
  }

  try {
    console.log('📧 Sending welcome email...', { to: email, from: FROM_EMAIL })
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: [email],
      subject: `Welcome to ${SITE_NAME}!`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to ${SITE_NAME}</title>
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #00A6A6 0%, #003A4D 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Welcome to ${SITE_NAME}!</h1>
            </div>
            <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
              <p style="color: #4b5563; font-size: 16px; margin: 0 0 20px 0;">
                Thank you for subscribing! You're now part of the Tenerife music community.
              </p>
              <p style="color: #4b5563; font-size: 16px; margin: 0 0 20px 0;">
                We'll keep you updated with:
              </p>
              <ul style="color: #4b5563; font-size: 16px; margin: 0 0 20px 0; padding-left: 20px;">
                <li>🎵 Latest music events and festivals</li>
                <li>🎤 Exclusive artist announcements</li>
                <li>📍 New venue openings</li>
                <li>🎉 Special offers and early access</li>
              </ul>
              <p style="color: #4b5563; font-size: 16px; margin: 0 0 30px 0;">
                Get ready for the ultimate music experience in Tenerife!
              </p>
              <div style="text-align: center;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://tenerife.music'}" style="display: inline-block; background: #00A6A6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600;">Explore Events</a>
              </div>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #6b7280; font-size: 12px;">
              <p>You can unsubscribe at any time by replying to this email.</p>
              <p>This is an automated email from ${SITE_NAME}.</p>
            </div>
          </body>
        </html>
      `,
      text: `
Welcome to ${SITE_NAME}!

Thank you for subscribing! You're now part of the Tenerife music community.

We'll keep you updated with:
- Latest music events and festivals
- Exclusive artist announcements
- New venue openings
- Special offers and early access

Get ready for the ultimate music experience in Tenerife!

Explore events: ${process.env.NEXT_PUBLIC_SITE_URL || 'https://tenerife.music'}

---
You can unsubscribe at any time by replying to this email.
This is an automated email from ${SITE_NAME}.
      `.trim(),
    })

    // Check if email was actually sent successfully
    if (!result.data?.id) {
      const errorMessage = 'Email send failed: No ID returned from Resend API'
      console.error('❌', errorMessage, { result })
      throw new Error(errorMessage)
    }

    console.log('✅ Welcome email sent successfully', { id: result.data.id })
    return { success: true, id: result.data.id }
  } catch (error: any) {
    console.error('❌ Error sending welcome email:', error)
    console.error('Error details:', {
      message: error?.message,
      name: error?.name,
      statusCode: error?.statusCode,
      result: error?.result,
    })
    throw error
  }
}

/**
 * Utility function to escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

