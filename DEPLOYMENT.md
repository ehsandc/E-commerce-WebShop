# E-Commerce Demo - Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Push your code to GitHub
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Configure environment variables (see below)
5. Click "Deploy"

### Option 2: Deploy via CLI

```bash
npm install -g vercel
vercel
```

## Environment Variables

Add these to your Vercel project settings (Settings → Environment Variables):

### Required

```
NEXT_PUBLIC_API_URL=https://your-domain.vercel.app
SITE_URL=https://your-domain.vercel.app
```

### Optional (Analytics)

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Get GA4 Measurement ID from:

1. Google Analytics → Admin → Data Streams
2. Select your web stream
3. Copy the Measurement ID (format: `G-XXXXXXXXXX`)

### Optional (Error Monitoring)

```
NEXT_PUBLIC_SENTRY_DSN=https://xxx@sentry.io/xxx
```

## Build Settings

Vercel auto-detects Next.js projects. Default settings:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install`

## Custom Domain

1. Go to Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Wait for SSL certificate provisioning (automatic)

## Performance Checklist

- ✅ Images optimized with `next/image`
- ✅ Static generation for product pages
- ✅ API route caching headers configured
- ✅ Bundle size optimized (no large dependencies)
- ✅ Font optimization with `next/font`

## Post-Deployment

1. **Test Analytics**: Check GA4 Real-Time view
2. **Verify SEO**: Test with [Google Rich Results](https://search.google.com/test/rich-results)
3. **Performance**: Run [Lighthouse](https://pagespeed.web.dev/) audit
4. **Monitor**: Check Vercel Analytics dashboard

## Alternative Platforms

### Netlify

```bash
npm run build
# Deploy the .next folder
```

Add build settings:

- Build command: `npm run build`
- Publish directory: `.next`

### Docker (Self-hosted)

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t ecommerce-demo .
docker run -p 3000:3000 -e NEXT_PUBLIC_GA_ID=G-XXX ecommerce-demo
```

## Troubleshooting

### Build Fails

- Ensure Node.js 18+ is configured
- Check `package-lock.json` is committed
- Verify all dependencies are in `package.json`

### Images Not Loading

- Add image domains to `next.config.js` → `images.remotePatterns`
- Unsplash is already configured

### Analytics Not Working

- Verify `NEXT_PUBLIC_GA_ID` is set in environment variables
- Check browser console for GA debug messages
- Ensure GA4 property is active

## Production Checklist

- [ ] Environment variables configured
- [ ] Custom domain added (optional)
- [ ] Analytics tracking verified
- [ ] Error monitoring set up (optional)
- [ ] Performance audit passed (Lighthouse > 90)
- [ ] SEO meta tags verified
- [ ] SSL certificate active
- [ ] Sitemap accessible at `/sitemap.xml`
