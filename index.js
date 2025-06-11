import express from 'express';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import startAsciiAnimation from './lib/@cr1bl3-cli/animate.js';
import { funkyConsoleLog } from './lib/@cr1bl3-cli/funkyConsoleLog.js';
require('dotenv').config();
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.get('/', (req, res) => {
  res.sendFile(`${process.cwd()}/html/index.html`);
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve HTML pages
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/audio', express.static(path.join(__dirname, 'audio')));
app.use('/lib', express.static(path.join(__dirname, 'lib')));
// Serve static files (images, audio, scripts, etc.)
app.use(express.static(process.cwd()));
app.use(express.static(path.join(__dirname, 'html')));
// Serve HTML routes
app.get('/', (req, res) => res.sendFile(`${process.cwd()}/html/index.html`));
app.get('/home', (req, res) => res.sendFile(`${process.cwd()}/html/home.html`));
app.get('/gallery', (req, res) => res.sendFile(`${process.cwd()}/html/gallery.html`));
app.get('/hoopalong', (req, res) => res.sendFile(`${process.cwd()}/html/hoopalong.html`));
app.get('/offer', (req, res) => res.sendFile(`${process.cwd()}/html/offer.html`));
app.get('/skills', (req, res) => res.sendFile(`${process.cwd()}/html/skills.html`));
wss.on('connection', (ws) => {
  funkyConsoleLog('Client connected', ['yellow']);
  ws.on('close', () => funkyConsoleLog('Client disconnected', ['yellow']));
});
app.get('/firebase-config', (req, res) => {
  res.json({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  });
});
server.listen(7410, () => {
  console.clear();
  startAsciiAnimation();
  funkyConsoleLog('🍩 Donuts are ready to serve! 🍩', ['pink', 'green']);
  console.log('Server running on http://localhost:7410');
});
