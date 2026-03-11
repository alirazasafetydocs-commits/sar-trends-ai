import { NextResponse } from 'next/server';

const users = [];
const JWT_SECRET = 'demo-secret-key';

function generateToken(userId) {
  return 'demo-token-' + userId;
}

export async function POST(request) {
  const { email, password, name } = await request.json();
  
  // Simple demo mode - no real database
  const existingUser = users.find(u => u.email === email);
  
  if (password === undefined) {
    // Register mode
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }
    const user = { id: Date.now().toString(), email, name, password, plan: 'free', generationsLeft: 5 };
    users.push(user);
    const token = generateToken(user.id);
    return NextResponse.json({ token, user: { id: user.id, name: user.name, email: user.email, plan: user.plan, generationsLeft: user.generationsLeft } });
  }
  
  // Login mode
  if (!existingUser || existingUser.password !== password) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
  }
  const token = generateToken(existingUser.id);
  return NextResponse.json({ token, user: existingUser });
}

export async function GET(request) {
  const token = request.headers.get('authorization');
  if (!token) {
    return NextResponse.json({ message: 'No token' }, { status: 401 });
  }
  return NextResponse.json({ user: { plan: 'demo', generationsLeft: 5 } });
}
