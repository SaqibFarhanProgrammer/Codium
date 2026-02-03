import { NextResponse } from 'next/server';

export async function GET() {
  const reponse = NextResponse.json(
    {
      success: true,
      message: 'log out successfully',
    },
    {
      status: 200,
    }
  );
  reponse.cookies.delete('token');
  return reponse;
}
