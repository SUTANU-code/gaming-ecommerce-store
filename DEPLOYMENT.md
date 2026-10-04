# Deployment guide

## 1. Backend (Render)
Set these in Render > Environment, then redeploy:

| Variable | Value |
|---|---|
| DB_URL / DB_USERNAME / DB_PASSWORD | your MySQL details |
| GEMINI_API_KEY | your Gemini key |
| RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET | Razorpay **test** keys (rotate the old ones, the old secret was in the repo) |
| ALLOWED_ORIGINS | every frontend URL you deploy, comma-separated, e.g. `https://your-app.pages.dev,https://your-app.netlify.app,https://your-app.vercel.app` plus your custom domain |
| JWT_SECRET | long random string, 32+ chars |
| ADMIN_SETUP_KEY | long random string (needed to create an admin) |

Create an admin once:
```
curl -X POST https://YOUR-BACKEND.onrender.com/api/auth/create-admin \
  -H "Content-Type: application/json" -H "X-Admin-Setup-Key: YOUR_ADMIN_SETUP_KEY" \
  -d '{"name":"Admin","email":"you@example.com","password":"StrongPass123"}'
```

## 2. Frontend

The frontend is a static Create React App build. Any static host works. Pick one:

### Cloudflare Pages (recommended for free tier)
Unlimited bandwidth, 500 builds/month, commercial use allowed, no credit card.

- Connect the repo, then set:
  | Setting | Value |
  |---|---|
  | Framework preset | Create React App |
  | Root directory | `gaming-frontend` |
  | Build command | `npm run build` |
  | Build output directory | `build` |
- Environment variables: `REACT_APP_API_URL` (see `.env.example`).
- `public/_headers` sets the CSP and security headers. `public/_redirects` handles
  client-side routes like `/login` on refresh. Both are copied into `build/` automatically.

### Netlify
Same four settings as above. Netlify reads the same `_headers` and `_redirects`
files, so no extra config is needed. Note the free tier is credit-based and the
project pauses if you exhaust the monthly credits.

### Vercel
- Root directory: `gaming-frontend`, framework: Create React App.
- `vercel.json` handles page refreshes and the same security headers.

### After deploying anywhere
1. Add the new frontend URL to `ALLOWED_ORIGINS` on Render and let it redeploy.
2. Confirm the backend URL baked into the bundle is the current one:
   ```
   npm run build
   grep -o 'gaming-ecommerce-store-[0-9]*' build/static/js/main.*.js
   ```
   If it prints an old number, `src/api/axios.js` still points at a dead backend.
3. Hard-refresh (Ctrl+Shift+R). A cached `index.html` can reference a JS bundle
   that a newer deploy already removed, which leaves the page blank.

## 3. Clear the Chrome warning
1. Redeploy with this version (real title, favicon, demo notice, footer).
2. Add the site to Google Search Console (URL-prefix, HTML tag verification) > Security issues > Request review.
3. Best long-term fix: attach a custom domain in Vercel > Settings > Domains, then add it to ALLOWED_ORIGINS.
