# Environment Variables Setup

Copy this file to `.env.local` and fill in your actual values.

## Quick Setup

1. Copy the template:
   ```bash
   cp env.template .env.local
   ```

2. Edit `.env.local` and replace the placeholder values with your actual configuration.

## Required Environment Variables

### Database Configuration
```env
DATABASE_URL="postgresql://user:password@localhost:5432/tenerife_music?schema=public"
```

### Email Configuration (Resend)

**RESEND_API_KEY** - Your Resend API key
- Get it from: https://resend.com/api-keys
- Sign up at: https://resend.com (free tier: 100 emails/day)
- Replace `re_YOUR_API_KEY_HERE` with your actual key

**FROM_EMAIL** - The sender email address
- Format: `"Display Name <email@domain.com>"`
- For development: `"Tenerife.Music <onboarding@resend.dev>"`
- For production: Verify your domain in Resend and use your own domain

**ADMIN_EMAIL** - Where contact form notifications are sent
- Replace with your admin email address

**NEXT_PUBLIC_SITE_URL** - Your site URL (used in email links)
- Development: `http://localhost:3000`
- Production: `https://tenerife.music`

## Example `.env.local` file

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/tenerife_music?schema=public"

# Email Configuration
RESEND_API_KEY="re_abc123xyz789..."
FROM_EMAIL="Tenerife.Music <onboarding@resend.dev>"
ADMIN_EMAIL="ev.zhdanov@gmail.com"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

## Important Notes

- Never commit `.env.local` to git (it's already in `.gitignore`)
- The `env.template` file is safe to commit as it contains no sensitive data
- Restart your development server after changing environment variables
- For production, set these variables in your hosting platform's environment settings


