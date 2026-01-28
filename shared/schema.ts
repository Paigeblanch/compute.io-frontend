import { pgTable, text, serial, integer, boolean, timestamp, jsonb, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Re-export auth models
export * from "./models/auth";
import { users } from "./models/auth";

// === TABLE DEFINITIONS ===

export const apiKeys = pgTable("api_keys", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  key: text("key").notNull().unique(), // In a real app, hash this!
  name: text("name").notNull(),
  balance: numeric("balance", { precision: 10, scale: 4 }).default("0").notNull(), // Credits
  active: boolean("active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  apiKeyId: integer("api_key_id").notNull().references(() => apiKeys.id),
  operation: text("operation").notNull(), // e.g., "solve"
  cost: numeric("cost", { precision: 10, scale: 4 }).notNull(),
  input: text("input"), // Log the query
  success: boolean("success").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// === RELATIONS ===

export const apiKeysRelations = relations(apiKeys, ({ one, many }) => ({
  user: one(users, {
    fields: [apiKeys.userId],
    references: [users.id],
  }),
  transactions: many(transactions),
}));

export const transactionsRelations = relations(transactions, ({ one }) => ({
  apiKey: one(apiKeys, {
    fields: [transactions.apiKeyId],
    references: [apiKeys.id],
  }),
}));

// === BASE SCHEMAS ===

export const insertApiKeySchema = createInsertSchema(apiKeys).pick({
  name: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

// === EXPLICIT API CONTRACT TYPES ===

export type ApiKey = typeof apiKeys.$inferSelect;
export type Transaction = typeof transactions.$inferSelect;

export type CreateApiKeyRequest = z.infer<typeof insertApiKeySchema>;
export type TopUpRequest = { amount: number; apiKeyId: number };

export interface SolveRequest {
  expression: string;
}

export interface SolveResponse {
  result: string | number;
  cost: number;
  remainingBalance: number;
}

export interface Error402Response {
  error: string;
  message: string;
  paymentUrl: string; // URL to top up
  minCost: number;
}
