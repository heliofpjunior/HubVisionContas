import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to next binary
const nextBin = path.join(__dirname, 'node_modules', 'next', 'dist', 'bin', 'next');

console.log('Starting Next.js Dev Server via wrapper to ignore invalid flags...');

const child = spawn('node', [nextBin, 'dev', '-p', '3000', '-H', '0.0.0.0'], {
  stdio: 'inherit',
});

child.on('close', (code) => {
  process.exit(code || 0);
});

child.on('error', (err) => {
  console.error('Failed to start Next.js dev server:', err);
  process.exit(1);
});
