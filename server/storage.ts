import {
  apiKeys,
  transactions,
  type ApiKey,
  type CreateApiKeyRequest,
  type Transaction,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";
import { randomBytes } from "crypto";

export interface IStorage {
  // API Keys
  getApiKeys(userId: string): Promise<ApiKey[]>;
  getApiKey(id: number): Promise<ApiKey | undefined>;
  getApiKeyByToken(token: string): Promise<ApiKey | undefined>;
  createApiKey(userId: string, key: CreateApiKeyRequest): Promise<ApiKey>;
  updateApiKeyBalance(id: number, amount: number): Promise<ApiKey>;
  deleteApiKey(id: number): Promise<void>;

  // Transactions
  getTransactions(userId: string): Promise<Transaction[]>;
  logTransaction(
    apiKeyId: number,
    operation: string,
    cost: number,
    input: string,
    success: boolean
  ): Promise<Transaction>;
}

export class DatabaseStorage implements IStorage {
  async getApiKeys(userId: string): Promise<ApiKey[]> {
    return await db.select().from(apiKeys).where(eq(apiKeys.userId, userId));
  }

  async getApiKey(id: number): Promise<ApiKey | undefined> {
    const [key] = await db.select().from(apiKeys).where(eq(apiKeys.id, id));
    return key;
  }

  async getApiKeyByToken(token: string): Promise<ApiKey | undefined> {
    const [key] = await db.select().from(apiKeys).where(eq(apiKeys.key, token));
    return key;
  }

  async createApiKey(userId: string, request: CreateApiKeyRequest): Promise<ApiKey> {
    const token = "sk_" + randomBytes(16).toString("hex");
    const [key] = await db
      .insert(apiKeys)
      .values({
        userId,
        name: request.name,
        key: token,
        balance: "1.00", // Free trial credit
      })
      .returning();
    return key;
  }

  async updateApiKeyBalance(id: number, amount: number): Promise<ApiKey> {
    // Use raw SQL for atomic increment to prevent race conditions
    const result = await db.execute(
      `UPDATE api_keys 
       SET balance = balance + ${amount.toFixed(4)}::numeric 
       WHERE id = ${id} 
       RETURNING *`
    );
    
    if (!result.rows || result.rows.length === 0) {
      throw new Error("Key not found");
    }
    
    return result.rows[0] as ApiKey;
  }

  async deleteApiKey(id: number): Promise<void> {
    await db.delete(apiKeys).where(eq(apiKeys.id, id));
  }

  async getTransactions(userId: string): Promise<Transaction[]> {
    // Join with apiKeys to filter by user
    const result = await db
      .select({
        id: transactions.id,
        apiKeyId: transactions.apiKeyId,
        operation: transactions.operation,
        cost: transactions.cost,
        input: transactions.input,
        success: transactions.success,
        createdAt: transactions.createdAt,
      })
      .from(transactions)
      .innerJoin(apiKeys, eq(transactions.apiKeyId, apiKeys.id))
      .where(eq(apiKeys.userId, userId))
      .orderBy(desc(transactions.createdAt));
    return result;
  }

  async logTransaction(
    apiKeyId: number,
    operation: string,
    cost: number,
    input: string,
    success: boolean
  ): Promise<Transaction> {
    const [tx] = await db
      .insert(transactions)
      .values({
        apiKeyId,
        operation,
        cost: cost.toString(),
        input,
        success,
      })
      .returning();
    return tx;
  }
}

export const storage = new DatabaseStorage();
