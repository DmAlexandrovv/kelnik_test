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
npm run build
```

Locally preview production build:

```bash
npm run json-server
npm run preview
```

### Note: Do not close DB connection, run this commands in 2 terminals and keep

Open `http://localhost:3000` and use the app

## Development Server

Start the development server on `http://localhost:3000`:

Start the DB server on `http://localhost:3001`:

### Note: Do not close DB connection, run this commands in 2 terminals and keep

```bash
# Run DB
npm run json-server
# Run UI
npm run dev
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
