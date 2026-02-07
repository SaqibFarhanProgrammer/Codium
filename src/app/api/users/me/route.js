// app/api/me/route.ts
import { User } from '@/models/user.models';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookie = cookies();
  const token = (await cookie).get('token')?.value;
  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);

    const userData = await User.findById(user.id);
    return NextResponse.json({
      authenticated: true,
      userData,
    });
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
