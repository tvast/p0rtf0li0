import express from 'express';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';

import startAsciiAnimation from './lib/@cr1bl3-cli/animate.js';
import { funkyConsoleLog } from './lib/@cr1bl3-cli/funkyConsoleLog.js';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/index.html`);
});
// Serve HTML pages

// Serve static files (images, audio, scripts, etc.)
app.use(express.static(process.cwd()));

// Serve HTML routes
app.get('/', (req, res) => res.sendFile(`${process.cwd()}/index.html`));
app.get('/home', (req, res) => res.sendFile(`${process.cwd()}/home.html`));
app.get('/gallery', (req, res) => res.sendFile(`${process.cwd()}/gallery.html`));
app.get('/hoopalong', (req, res) => res.sendFile(`${process.cwd()}/hoopalong.html`));
app.get('/offer', (req, res) => res.sendFile(`${process.cwd()}/offer.html`));
app.get('/skills', (req, res) => res.sendFile(`${process.cwd()}/skills.html`));
wss.on('connection', (ws) => {
  funkyConsoleLog('Client connected', ['yellow']);
  ws.on('close', () => funkyConsoleLog('Client disconnected', ['yellow']));
});

server.listen(7410, () => {
  console.clear();
  startAsciiAnimation();
  funkyConsoleLog('🍩 Donuts are ready to serve! 🍩', ['pink', 'green']);
  console.log('Server running on http://localhost:7410');
});
