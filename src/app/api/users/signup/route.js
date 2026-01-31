import connectDB from '@/lib/db';
import { Mongoose } from 'mongoose';

export async function POST(request) {
  await connectDB();

  const { Fullname, Email, Password } = await request.json();

  return Response.json({ message: 'POST request received' });
}
