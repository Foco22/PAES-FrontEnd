# Deployment Guide - PAES Frontend to Vercel

## Prerequisites

1. A Vercel account (sign up at https://vercel.com)
2. Your backend API_KEY from Cloud Run
3. Git repository with your code pushed

## Step 1: Prepare Environment Variables

Create a `.env` file in your local environment for testing (DO NOT commit this file):

```bash
VITE_API_BASE_URL=https://backendpaes-297922395976.northamerica-northeast1.run.app
VITE_API_KEY=your_actual_api_key_here
```

Replace `your_actual_api_key_here` with your actual API key from the backend.

## Step 2: Test Locally

Before deploying, test your application locally:

```bash
npm install
npm run dev
```

Visit http://localhost:5173 and verify that the application loads correctly and can fetch data from the backend.

## Step 3: Deploy to Vercel

### Option A: Using Vercel CLI (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy from your project directory:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? Yes
   - Which scope? Select your account
   - Link to existing project? No
   - Project name? paes-frontend (or your preferred name)
   - In which directory is your code located? ./
   - Override settings? No

5. Add environment variables:
```bash
vercel env add VITE_API_BASE_URL
# Paste: https://backendpaes-297922395976.northamerica-northeast1.run.app

vercel env add VITE_API_KEY
# Paste your API key
```

6. Deploy to production:
```bash
vercel --prod
```

### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard

2. Click "Add New Project"

3. Import your Git repository (GitHub, GitLab, or Bitbucket)

4. Configure Project:
   - Framework Preset: Vite
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. Add Environment Variables:
   - Click "Environment Variables"
   - Add:
     - Name: `VITE_API_BASE_URL`
     - Value: `https://backendpaes-297922395976.northamerica-northeast1.run.app`
   - Add:
     - Name: `VITE_API_KEY`
     - Value: Your actual API key

6. Click "Deploy"

## Step 4: Verify Deployment

1. Once deployed, Vercel will provide a URL (e.g., `https://paes-frontend.vercel.app`)

2. Visit the URL and test:
   - Map loads correctly
   - Can select region and comuna
   - Schools appear on the map
   - School details display when clicking markers

## Step 5: Configure Custom Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow Vercel's instructions to configure DNS

## Troubleshooting

### Issue: API calls failing with 401/403 errors

**Solution**: Verify that the `VITE_API_KEY` environment variable is set correctly in Vercel.

### Issue: Environment variables not updating

**Solution**: After changing environment variables in Vercel, you need to redeploy:
```bash
vercel --prod
```

Or trigger a new deployment from the Vercel dashboard.

### Issue: 404 errors on page refresh

**Solution**: The `vercel.json` file should handle this, but if you still have issues, verify that the rewrites configuration is correct.

### Issue: Map not loading

**Solution**: Check the browser console for CORS errors. Ensure your backend allows requests from your Vercel domain.

## Continuous Deployment

Once set up with Git integration, Vercel will automatically:
- Deploy on every push to your main branch (production)
- Create preview deployments for pull requests
- Run builds and tests before deploying

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_BASE_URL | Backend API URL | https://backendpaes-297922395976.northamerica-northeast1.run.app |
| VITE_API_KEY | API authentication key | Your secret API key |

## Security Notes

- Never commit `.env` files to your repository
- Keep your API_KEY secure
- Use Vercel's environment variables for production
- Consider using different API keys for development and production

## Support

For Vercel-specific issues, check:
- Vercel Documentation: https://vercel.com/docs
- Vercel Support: https://vercel.com/support