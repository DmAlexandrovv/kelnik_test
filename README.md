# Minimal Starter

## Setup

Node.js version: **20.15.1**. Compatibility with other Node.js versions is not guaranteed:

```bash
nvm install 20.15.1
nvm use 20.15.1
```

Make sure to install dependencies:

```bash
npm install
```

## Production

Build the application for production:

```bash
npm run generate
```

Locally preview production build:

```bash
npm run preview
```

Open `http://localhost:3000` and use the app

## Production deploy

### Note: For deploy need authentication in netlify for this app. Roots - Dmitry Alexandrov

```bash
npm run deploy
```

Open https://helpful-nasturtium-11a55a.netlify.app/

## Development Server

```bash
# Run DB
npm run dev
```

Open `http://localhost:3000` and use the app

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
