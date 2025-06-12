import express from 'express';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import startAsciiAnimation from './lib/@cr1bl3-cli/animate.js';
import { funkyConsoleLog } from './lib/@cr1bl3-cli/funkyConsoleLog.js';
import dotenv from 'dotenv';

dotenv.config();
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
const htmlRoutes = ['/', '/home', '/gallery', '/hoopalong', '/offer', '/skills'];
htmlRoutes.forEach((route) => {
  const page = route === '/' ? 'index' : route.substring(1);
  app.get(route, (req, res) => res.sendFile(path.join(__dirname, 'html', `${page}.html`)));
}); 
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
import fs from 'fs';

app.get('/api/art', (req, res) => {
  const artDir = path.join(__dirname, 'art');
  fs.readdir(artDir, (err, files) => {
    if (err) {
      console.error('Error reading art directory:', err);
      return res.status(500).json({ error: 'Unable to read art directory' });
    }
    const images = files.filter(file => file.match(/\.(jpg|jpeg|png|gif)$/i));
    res.json(images);
  });
});
app.use('/art', express.static(path.join(__dirname, 'art')));
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});
const PORT = process.env.PORT || 7410;

server.listen(PORT, () => {
  console.clear();
  startAsciiAnimation();
  funkyConsoleLog('🍩 Donuts are ready to serve! 🍩', ['pink', 'green']);
  console.log(`Server running on http://localhost:${PORT}`);
});
