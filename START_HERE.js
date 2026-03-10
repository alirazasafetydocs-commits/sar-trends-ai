// SAR Trends AI - Quick Start Server
// This script starts the marketing website and backend without needing MongoDB

const { spawn } = require('child_process');
const path = require('path');

console.log('='.repeat(50));
console.log('SAR Trends AI - Quick Launcher');
console.log('='.repeat(50));

// Start backend
console.log('\n[1/3] Starting Backend API...');
const backend = spawn('node', ['server.js'], {
  cwd: path.join(__dirname, 'sartrends-ai'),
  shell: true,
  stdio: 'inherit'
});

backend.on('error', (err) => {
  console.error('Backend error:', err.message);
});

// Start website after 3 seconds
setTimeout(() => {
  console.log('\n[2/3] Starting Marketing Website...');
  const website = spawn('npm', ['run', 'dev'], {
    cwd: path.join(__dirname, 'sartrends-store-site'),
    shell: true,
    stdio: 'inherit'
  });
  
  website.on('error', (err) => {
    console.error('Website error:', err.message);
  });
}, 3000);

// Start frontend after 6 seconds
setTimeout(() => {
  console.log('\n[3/3] Starting AI Frontend...');
  const frontend = spawn('npm', ['start'], {
    cwd: path.join(__dirname, 'sartrends-ai', 'frontend'),
    shell: true,
    stdio: 'inherit',
    env: { ...process.env, PORT: '3001' }
  });
  
  frontend.on('error', (err) => {
    console.error('Frontend error:', err.message);
  });
}, 6000);

console.log('\n' + '='.repeat(50));
console.log('All services are starting!');
console.log('Please wait about 30 seconds...');
console.log('='.repeat(50));
console.log('\nURLs:');
console.log('- Marketing Website: http://localhost:3000');
console.log('- Backend API: http://localhost:5000');
console.log('- AI Frontend: http://localhost:3001');
console.log('='.repeat(50));

// Handle cleanup
process.on('SIGINT', () => {
  console.log('\nShutting down...');
  backend.kill();
  process.exit();
});

