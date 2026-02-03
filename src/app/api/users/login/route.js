import { User } from '@/models/user.models';
import { NextResponse } from 'next/server';
import connectDB from '@/db/connectdb';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  await connectDB();

  try {
    const { email, password } = await request.json();

    if (!email || !password)
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });

    const user = await User.findOne({ email });

    if (!user)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const compare = await bcrypt.compare(password, user.password);
    if (!compare)
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    const response = NextResponse.json(
      { success: true, message: 'User signed in successfully', user },
      { status: 200 }
    );

    response.cookies.set('token', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60, path: '/' });

    return response;
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}
