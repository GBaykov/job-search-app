import { API_ENDPOINTS } from '@/constants/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const { client_id, client_secret } = process.env;

  if (!client_secret) {
    return NextResponse.json({
      error: 'Secret key is missing. Check .env variables.',
    });
  }

  if (!client_id) {
    return NextResponse.json({
      error: 'Client ID is missing. Check .env variables.',
    });
  }

  searchParams.append('client_id', client_id);
  searchParams.append('client_secret', client_secret);

  const response = await fetch(`${API_ENDPOINTS.REFRESH}?${searchParams}`, {
    headers: {
      method: 'GET',
      'Content-Type': 'application/json',
      'X-Api-App-Id': client_secret,
    },
  });
  const data = await response.json();

  return NextResponse.json(data);
}
