import { API_ENDPOINTS } from '@/constants/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const { login, password, client_id, client_secret } = process.env;

  if (!client_secret) {
    return NextResponse.json({
      error: 'Secret key is missing. Check .env variables.',
    });
  }
  if (!password) {
    return NextResponse.json({
      error: 'Password is missing. Check .env variables.',
    });
  }
  if (!login) {
    return NextResponse.json({
      error: 'Login is missing. Check .env variables.',
    });
  }
  if (!client_id) {
    return NextResponse.json({
      error: 'Client ID is missing. Check .env variables.',
    });
  }
  searchParams.append('login', login);
  searchParams.append('password', password);
  searchParams.append('client_id', client_id);
  searchParams.append('client_secret', client_secret);

  const response = await fetch(`${API_ENDPOINTS.LOGIN}?${searchParams}`, {
    headers: {
      method: 'GET',
      //   Authorization: `Bearer ${ACCESS_TOKEN_VALUE}`,
      'X-Api-App-Id': client_secret,
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();

  return NextResponse.json(data);
}
