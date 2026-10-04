# Deployment guide

## 1. Backend (Render)
Set these in Render > Environment, then redeploy:

| Variable | Value |
|---|---|
| DB_URL / DB_USERNAME / DB_PASSWORD | your MySQL details |
| GEMINI_API_KEY | your Gemini key |
| RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET | Razorpay **test** keys (rotate the old ones, the old secret was in the repo) |
| ALLOWED_ORIGINS | `https://gaming-frontend-ten.vercel.app` (comma-separate more, e.g. your custom domain) |
| JWT_SECRET | long random string, 32+ chars |
| ADMIN_SETUP_KEY | long random string (needed to create an admin) |

Create an admin once:
```
curl -X POST https://YOUR-BACKEND.onrender.com/api/auth/create-admin \
  -H "Content-Type: application/json" -H "X-Admin-Setup-Key: YOUR_ADMIN_SETUP_KEY" \
  -d '{"name":"Admin","email":"you@example.com","password":"StrongPass123"}'
```

## 2. Frontend (Vercel)
- Root directory: `gaming-frontend`, framework: Create React App.
- Environment variables: `REACT_APP_API_URL`, `REACT_APP_RAZORPAY_KEY_ID`, `REACT_APP_CONTACT_EMAIL` (see `.env.example`).
- `vercel.json` already handles page refreshes on routes like /login.

## 3. Clear the Chrome warning
1. Redeploy with this version (real title, favicon, demo notice, footer).
2. Add the site to Google Search Console (URL-prefix, HTML tag verification) > Security issues > Request review.
3. Best long-term fix: attach a custom domain in Vercel > Settings > Domains, then add it to ALLOWED_ORIGINS.
