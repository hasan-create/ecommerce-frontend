# Frontend (my-ecommerse)

## Local development

1. Install packages:

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
