<<<<<<< HEAD
# Frontend (my-ecommerse)
=======
# Backend (backecomm)
>>>>>>> ef329fda8f94438d3362f2b599eebd4da74abb95

## Local development

1. Install packages:

<<<<<<< HEAD
	npm install

2. Create env file:

	Copy .env.example to .env

3. Set local API URL in .env:

	VITE_API_BASE_URL=http://localhost:3000

4. Start dev server:

	npm run dev

Default Vite local port is 5173. If 5173 is busy, Vite may auto-switch to 5174.

## Build check

Run:

npm run build

## Deployment flow

1. Deploy backend first.
2. After backend URL is available, set frontend env:

	VITE_API_BASE_URL=https://your-backend-domain.com

3. Build and deploy frontend.

Do not add a trailing slash in VITE_API_BASE_URL.
=======
   npm install

2. Create env file:

   Copy .env.example to .env

3. Start server:

   npm run dev

Server runs on PORT (default 3000).

## Required environment variables

- JWT_SECRET
- MONGODB_URL
- CLIENT_URL (comma-separated allowed origins)
- PORT
- CLOUDINARY_CLOUD_NAME
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- NODE_ENV
- COOKIE_SAME_SITE
- COOKIE_SECURE

## Deployment settings

For production, use:

- NODE_ENV=production
- COOKIE_SAME_SITE=none
- COOKIE_SECURE=true
- CLIENT_URL=https://your-frontend-domain.com

Health check endpoint:

- /api/health
>>>>>>> ef329fda8f94438d3362f2b599eebd4da74abb95
