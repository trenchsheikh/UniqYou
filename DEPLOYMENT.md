# UniqYou - Vercel Deployment Guide

## 🚀 Deploy to Vercel

### 1. Connect Your GitHub Repository

1. Go to [Vercel](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your `trenchsheikh/UniqYou` repository
5. Vercel will automatically detect it's a Vite project

### 2. Configure Environment Variables

In your Vercel project settings, add these environment variables:

```bash
VITE_GEMINI_API_KEY=your_actual_api_key_here
VITE_GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
```

**Important**: Never commit your actual API key to the repository!

### 3. Build Settings

Vercel will automatically use these settings:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. Deploy

1. Click "Deploy"
2. Vercel will build and deploy your app
3. Your app will be available at `https://your-project-name.vercel.app`

## 🔧 Manual Deployment

If you prefer to deploy manually:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

## 📱 Custom Domain (Optional)

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Configure DNS records as instructed

## 🔒 Security Headers

The `vercel.json` includes security headers:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin

## 📊 Performance Optimization

- **Code Splitting**: Vendor and UI chunks are separated
- **Asset Caching**: Static assets are cached for 1 year
- **Minification**: Production builds are minified with Terser
- **Source Maps**: Disabled in production for security

## 🐛 Troubleshooting

### Build Fails?
1. Check environment variables are set
2. Verify API key is valid
3. Check build logs in Vercel dashboard

### API Not Working?
1. Verify `VITE_GEMINI_API_KEY` is set in Vercel
2. Check API key permissions
3. Test API endpoint manually

### App Not Loading?
1. Check Vercel deployment status
2. Verify build output in `dist` folder
3. Check browser console for errors

## 📈 Monitoring

- **Analytics**: Enable Vercel Analytics in project settings
- **Logs**: View function logs in Vercel dashboard
- **Performance**: Monitor Core Web Vitals
- **Uptime**: Check deployment status and uptime

## 🔄 Continuous Deployment

- **Auto-deploy**: Every push to `main` branch triggers deployment
- **Preview**: Pull requests get preview deployments
- **Rollback**: Easy rollback to previous versions

## 🎯 Next Steps

After deployment:
1. Test all features work in production
2. Verify API integration
3. Check mobile responsiveness
4. Test accessibility features
5. Monitor performance metrics

---

**Need Help?** Check Vercel's [documentation](https://vercel.com/docs) or [community](https://github.com/vercel/vercel/discussions).
