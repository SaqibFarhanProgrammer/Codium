import { cookies } from 'next/headers';
import connectDB from '@/db/connectdb';
import jwt from 'jsonwebtoken';
import { User } from '@/models/user.models';
export async function GET() {
  connectDB();

  try {
    const cookie = cookies();
    const token = (await cookie).get('token').value || ''; // Assuming you have a function to find token by token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!token) {
      return new Response(JSON.stringify({ error: 'Token not found' }), { status: 401 });
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    // Find token by token (example)

    return new Response(JSON.stringify({ success: true, data: user }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
