# SĀRI — Deployment Guide

## Prerequisites
- Node.js 18+
- Cloudflare account
- Wrangler CLI: `npm install -g wrangler`

## Local Development
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Cloudflare Setup

### 1. Create D1 Database
```bash
wrangler d1 create sari-db
# Copy the database_id into wrangler.toml
```

### 2. Run Schema & Seed
```bash
wrangler d1 execute sari-db --file=./worker/schema.sql
wrangler d1 execute sari-db --file=./worker/seed.sql
```

### 3. Create R2 Bucket
```bash
wrangler r2 bucket create sari-images
# Enable public access in Cloudflare Dashboard → R2 → sari-images → Settings
# Copy the public URL into wrangler.toml as R2_PUBLIC_URL
```

### 4. Deploy to Cloudflare Pages
```bash
npm run pages:build
wrangler pages deploy .vercel/output/static --project-name=sari
```

### 5. Environment Variables (in Cloudflare Dashboard)
Set these in Pages → Settings → Environment Variables:
- `JWT_SECRET` — A random secure string (32+ chars)
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — Your WhatsApp number (91XXXXXXXXXX)
- `R2_PUBLIC_URL` — Your R2 public bucket URL

## Admin Access
- URL: /admin/login
- Default email: admin@sari.com
- Default password: admin123
**CHANGE THIS IN PRODUCTION** via the D1 database

## Image Uploads
Images are stored in Cloudflare R2.
Upload via Admin → Products → Add/Edit Product → Image URLs

## Payment Gateway
The checkout is designed for Razorpay/Cashfree integration.
Add your keys as environment variables:
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`
Then implement the `/api/payments/create` route.

## WhatsApp Orders
Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to your business WhatsApp number (with country code, no +).
Example: `919876543210` for +91 98765 43210
