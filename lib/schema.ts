import {
  pgTable,
  text,
  timestamp,
  integer,
  jsonb,
  boolean,
} from 'drizzle-orm/pg-core';

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  language: text('language').notNull().default('hi'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const messages = pgTable('messages', {
  id: text('id').primaryKey(),
  sessionId: text('session_id')
    .notNull()
    .references(() => sessions.id),
  userId: text('user_id').notNull(),
  role: text('role').notNull(), // 'user' or 'assistant'
  content: text('content').notNull(),
  toolCalls: jsonb('tool_calls'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const fdRatesCache = pgTable('fd_rates_cache', {
  id: text('id').primaryKey(),
  bankName: text('bank_name').notNull(),
  rateGeneral: integer('rate_general').notNull(),
  rateSenior: integer('rate_senior').notNull(),
  tenorMonths: integer('tenor_months').notNull(),
  bankType: text('bank_type').notNull(),
  dicgcInsured: boolean('dicgc_insured').default(true),
  fetchedAt: timestamp('fetched_at').defaultNow(),
  expiresAt: timestamp('expires_at').notNull(),
});

export const bookingAttempts = pgTable('booking_attempts', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull(),
  bankName: text('bank_name').notNull(),
  amount: integer('amount').notNull(),
  tenorMonths: integer('tenor_months').notNull(),
  rate: integer('rate').notNull(),
  status: text('status').notNull().default('initiated'), // initiated, completed, abandoned
  language: text('language').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
