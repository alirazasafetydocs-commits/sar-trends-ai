// Simple launcher - Website only (no MongoDB needed)
const { spawn } = require('child_process');
const path = require('path');

console.log('Starting SAR Trends Website Only...');
console.log('This will run the Next.js website without MongoDB.');

// Start website
const website = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'sartrends-store-site'),
  shell: true,
  stdio: 'inherit'
});

website.on('error', (err) => {
  console.error('Website error:', err.message);
});

console.log('\nWebsite starting at http://localhost:3000');
console.log('Wait about 20 seconds for it to fully start...\n');

// Handle cleanup
process.on('SIGINT', () => {
  website.kill();
  process.exit();
});
