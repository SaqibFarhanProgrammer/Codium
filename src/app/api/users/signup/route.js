import connectDB from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import sendMail from '@/helpers/mailer.helper';
import { User } from '@/models/user.models';


await connectDB();
console.log("connect MONGODB");


export async function POST(request) {
  await connectDB();

  const { username, email, password } = await request.json();
  // Validation
  if (!username || !email || !password) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json(
      { message: 'Password must be at least 6 characters' },
      { status: 400 }
    );
  }

  if (!email.includes('@')) {
    return NextResponse.json({ message: 'Invalid email format' }, { status: 400 });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists with this email' }, { status: 400 });
  }

  const createdUser = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const response = await sendMail(email, 'VERIFY', createdUser._id);
  console.log(response);

  return NextResponse.json(
    {
      message: 'User created successfully',
      user: createdUser,
    },
    { status: 200 }
  );
}
