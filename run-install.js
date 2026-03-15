const { execSync } = require('child_process');
const path = require('path');

console.log('Installing dependencies...');

try {
  process.chdir(path.join(__dirname, 'sartrends-store-site'));
  console.log('Current directory:', process.cwd());
  
  execSync('npm install three @react-three/fiber @react-three/drei', { 
    stdio: 'inherit',
    env: { ...process.env }
  });
  
  console.log('\n✅ Dependencies installed successfully!');
  console.log('Now run FIXED_START.bat to start the servers');
  
} catch (error) {
  console.error('Error:', error.message);
}

console.log('\nPress Enter to exit...');
process.stdin.resume();
