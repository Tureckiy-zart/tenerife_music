# Email API Setup Guide

This project uses [Resend](https://resend.com) for sending transactional emails. This guide will help you set up email functionality.

## 📧 Email Features

The email API supports:

1. **Contact Form Notifications** - Sends an email to the admin when someone submits the contact form
2. **Contact Form Confirmations** - Sends a confirmation email to the user who submitted the contact form
3. **Welcome Emails** - Sends a welcome email when someone subscribes to the newsletter

## 🚀 Setup Instructions

### 1. Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day on free tier)
3. Verify your email address

### 2. Get Your API Key

1. Navigate to [API Keys](https://resend.com/api-keys) in your Resend dashboard
2. Click "Create API Key"
3. Give it a name (e.g., "Tenerife Music Production")
4. Copy the API key (starts with `re_`)

### 3. Verify Your Domain (Optional but Recommended)

For production, you should verify your domain:

1. Go to [Domains](https://resend.com/domains) in your Resend dashboard
2. Click "Add Domain"
3. Follow the DNS configuration instructions
4. Once verified, you can use emails like `noreply@yourdomain.com`

For development/testing, you can use Resend's test domain: `onboarding@resend.dev`

### 4. Configure Environment Variables

Create a `.env.local` file in the root of your project (or add to your existing `.env` file):

```env
# Email Configuration (Resend)
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxx"

# Email Settings
# The email address that will appear as the sender
# Format: "Display Name <email@domain.com>" or just "email@domain.com"
# For development, you can use: "Tenerife.Music <onboarding@resend.dev>"
FROM_EMAIL="Tenerife.Music <noreply@tenerife.music>"

# Admin email - where contact form notifications will be sent
ADMIN_EMAIL="ev.zhdanov@gmail.com"

# Site URL (used in email links)
NEXT_PUBLIC_SITE_URL="https://tenerife.music"
```

### 5. Test the Email API

1. Start your development server:
   ```bash
   pnpm dev
   ```

2. Test the contact form:
   - Navigate to `/contact`
   - Fill out and submit the form
   - Check your admin email inbox for the notification
   - Check the submitter's email for the confirmation

3. Test the subscription:
   - Use the subscription modal on the homepage
   - Enter an email address
   - Check the email inbox for the welcome email

## 📁 File Structure

```
lib/
  └── email.ts              # Email utility functions

app/api/
  ├── contact/
  │   └── route.ts          # Contact form API (sends notification + confirmation)
  └── subscribe/
      └── route.ts          # Subscription API (sends welcome email)
```

## 🔧 Email Functions

### `sendContactNotification(data)`
Sends an email to the admin when a contact form is submitted.

**Parameters:**
- `data.name` - User's name
- `data.email` - User's email
- `data.message` - User's message

### `sendContactConfirmation(data)`
Sends a confirmation email to the user who submitted the contact form.

**Parameters:**
- `data.name` - User's name
- `data.email` - User's email

### `sendWelcomeEmail(email)`
Sends a welcome email to new newsletter subscribers.

**Parameters:**
- `email` - Subscriber's email address

## 🎨 Email Templates

All emails use HTML templates with:
- Responsive design
- Brand colors (#00A6A6, #003A4D)
- Professional styling
- Plain text fallback

You can customize the templates in `lib/email.ts`.

## 🔒 Security

- All user input is sanitized to prevent XSS attacks
- Email addresses are validated before sending
- API keys are stored in environment variables (never commit to git)

## 🐛 Troubleshooting

### Emails not sending?

1. **Check your API key**: Make sure `RESEND_API_KEY` is set correctly in your `.env.local` file
2. **Check Resend dashboard**: Look for error logs in the [Resend dashboard](https://resend.com/emails)
3. **Verify domain**: If using a custom domain, ensure it's verified in Resend
4. **Check rate limits**: Free tier has a limit of 100 emails/day

### "Invalid API key" error?

- Make sure your API key starts with `re_`
- Ensure there are no extra spaces or quotes in your `.env.local` file
- Restart your development server after changing environment variables

### Emails going to spam?

- Verify your domain in Resend
- Set up SPF and DKIM records (Resend provides instructions)
- Use a professional "from" email address
- Avoid spam trigger words in subject lines

## 📚 Resources

- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)
- [Email Best Practices](https://resend.com/docs/send-with-nodejs)

## 💡 Next Steps

Consider adding:
- Email templates for different languages
- Email queue system for high volume
- Email analytics and tracking
- Unsubscribe functionality for newsletters
- Email preferences management


