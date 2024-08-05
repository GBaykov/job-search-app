import { API_ENDPOINTS } from '@/constants/api';
import { getFromStorage } from '@/utils/localstorage';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const Authorization_header = request.headers;

  const { client_secret } = process.env;
  if (!client_secret) {
    return NextResponse.json({
      error: 'Secret key is missing. Check .env variables.',
    });
  }

  const response = await fetch(`${API_ENDPOINTS.VACANCIES}?${searchParams}`, {
    headers: { ...Authorization_header, 'X-Api-App-Id': client_secret },
  });
  const data = await response.json();

  return NextResponse.json(data);
}
