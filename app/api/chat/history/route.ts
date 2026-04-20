import { NextResponse } from 'next/server';
import { getAuth } from '@clerk/nextjs/server';
import { getChatHistory } from '@/lib/db-helpers';

export async function GET(req: Request) {
  const { userId } = getAuth(req as any);
  if (!userId) return NextResponse.json({ messages: [] });

  const history = await getChatHistory(userId, 30);
  return NextResponse.json({ messages: history });
}
