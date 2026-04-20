import { eq, desc, asc } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { db } from './db';
import { sessions, messages, bookingAttempts } from './schema';

export async function getOrCreateSession(userId: string, language: string) {
  const existing = await db
    .select()
    .from(sessions)
    .where(eq(sessions.userId, userId))
    .orderBy(desc(sessions.updatedAt))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(sessions)
      .set({ updatedAt: new Date(), language })
      .where(eq(sessions.id, existing[0].id));
    return existing[0];
  }

  const newSession = {
    id: nanoid(),
    userId,
    language,
  };
  await db.insert(sessions).values(newSession);
  return newSession;
}

export async function saveMessage(
  sessionId: string,
  userId: string,
  role: 'user' | 'assistant',
  content: string,
  toolCalls?: unknown
) {
  await db.insert(messages).values({
    id: nanoid(),
    sessionId,
    userId,
    role,
    content,
    toolCalls: (toolCalls ?? null) as any,
  });
}

export async function getChatHistory(userId: string, limit = 20) {
  const session = await db
    .select()
    .from(sessions)
    .where(eq(sessions.userId, userId))
    .orderBy(desc(sessions.updatedAt))
    .limit(1);

  if (!session.length) return [];

  return db
    .select()
    .from(messages)
    .where(eq(messages.sessionId, session[0].id))
    .orderBy(asc(messages.createdAt))
    .limit(limit);
}

export async function saveBookingAttempt(data: {
  userId: string;
  bankName: string;
  amount: number;
  tenorMonths: number;
  rate: number;
  language: string;
}) {
  await db.insert(bookingAttempts).values({
    id: nanoid(),
    ...data,
    status: 'initiated',
  });
}

export async function updateBookingStatus(userId: string, status: string) {
  await db
    .update(bookingAttempts)
    .set({ status })
    .where(eq(bookingAttempts.userId, userId));
}
