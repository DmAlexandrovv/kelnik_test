# Minimal Starter

## Setup

Make sure to install dependencies:

```bash
# npm
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

Start the DB server on `http://localhost:3001`:

Do not close DB connection, run this commands in 2 terminals and keep

```bash
# Run DB
npm run json-server
# Run UI
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run json-server
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
