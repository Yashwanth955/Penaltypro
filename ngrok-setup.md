# ngrok Setup Guide

## Installation & Configuration

### 1. Install ngrok CLI
Visit [ngrok.com](https://ngrok.com) and download the ngrok CLI for your platform.

### 2. Authenticate ngrok
Get your authtoken from your ngrok dashboard and run:
```bash
ngrok config add-authtoken YOUR_AUTH_TOKEN
```

Or set the `NGROK_AUTHTOKEN` environment variable:
```bash
export NGROK_AUTHTOKEN=your_auth_token
# or on Windows:
set NGROK_AUTHTOKEN=your_auth_token
```

### 3. Install dependencies
```bash
npm install
```

## Running the App with ngrok

### Option 1: Run dev server and ngrok together
```bash
npm run dev:with-ngrok
```
This runs both the Vite dev server and ngrok tunnel simultaneously.

### Option 2: Run ngrok separately
Terminal 1 - Start the dev server:
```bash
npm run dev
```

Terminal 2 - Start the ngrok tunnel:
```bash
npm run dev:ngrok
```

## Configuration

Edit `ngrok.yml` to customize:
- **addr**: The local port (default: 5173 for Vite)
- **subdomain**: Custom subdomain (requires paid account)
- **region**: Geographic region for tunnel
- **auth**: Basic authentication credentials

## Using the Public URL

Once running, ngrok will display a public URL like:
```
https://abc123def456.ngrok.io
```

Use this URL to:
- Share your dev environment
- Test webhooks
- Test on mobile devices
- Demo the app remotely

## Notes

- The free plan generates random subdomains on each run
- Paid plans allow custom subdomains
- The `concurrently` package runs both processes in the same terminal
