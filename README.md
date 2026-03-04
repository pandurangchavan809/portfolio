# Portfolio App

Single-page portfolio built with:
- HTML
- Tailwind CSS (CDN)
- Vanilla JavaScript
- Netlify Functions (for contact email sending)
- Vercel API Route support (`api/send-email.js`)

## Run (UI only)
Open `index.html` in your browser.

## Contact Email Service
The contact form sends requests to `/api/send-email`.

- Netlify mapping: `netlify/functions/send-email.js` (via redirect in `netlify.toml`)
- Vercel mapping: `api/send-email.js` (native Vercel Serverless Function)

### Netlify environment variables
Set these in Netlify Site Settings -> Environment Variables:
- `RESEND_API_KEY`: API key from Resend
- `CONTACT_TO_EMAIL`: your inbox email
- `CONTACT_FROM_EMAIL`: verified sender email (example: `Portfolio <noreply@yourdomain.com>`)

If `CONTACT_FROM_EMAIL` is not set, the function falls back to `Portfolio Contact <onboarding@resend.dev>` (only suitable for quick testing).

### Vercel deployment
1. Import this repo in Vercel.
2. Add the same environment variables: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`.
3. Deploy. `vercel.json` is already configured for Node 20 API runtime.

## Add your files
- Resume PDF: `assets/resume/Resume.pdf`
- Profile image: `assets/images/profile.jpg`
- Certificate images: `assets/documents/certifications/`

## Update certificate verification links later
In `index.html`, edit each certification JSON block and replace `"link": "#"` with your Credly/public verification URL.
