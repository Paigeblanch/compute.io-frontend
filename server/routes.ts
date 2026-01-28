import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { setupAuth, isAuthenticated } from "./replit_integrations/auth";
import { registerAuthRoutes } from "./replit_integrations/auth";
import { z } from "zod";
import * as math from "mathjs";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Setup Auth first
  await setupAuth(app);
  registerAuthRoutes(app);

  // === PROTECTED API (Dashboard) ===

  app.get(api.keys.list.path, isAuthenticated, async (req: any, res) => {
    const userId = req.user.claims.sub;
    const keys = await storage.getApiKeys(userId);
    res.json(keys);
  });

  app.post(api.keys.create.path, isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const input = api.keys.create.input.parse(req.body);
      const key = await storage.createApiKey(userId, input);
      res.status(201).json(key);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.post(api.keys.topUp.path, isAuthenticated, async (req, res) => {
    const apiKeyId = Number(req.params.id);
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    try {
      // Verify ownership (simplified for MVP: assuming if they can hit this with ID, check ownership inside storage or here)
      // In a real app, verify `apiKeyId` belongs to `req.user.claims.sub`
      // For now, let's assume the storage method handles it or we trust the ID (MVP shortcut)
      // Better:
      const key = await storage.getApiKey(apiKeyId);
      if (!key) return res.status(404).json({ message: "Key not found" });
      // @ts-ignore
      if (key.userId !== req.user!.claims.sub) {
         return res.status(403).json({ message: "Forbidden" });
      }

      const updated = await storage.updateApiKeyBalance(apiKeyId, amount);
      res.json(updated);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete(api.keys.delete.path, isAuthenticated, async (req: any, res) => {
     const apiKeyId = Number(req.params.id);
     const key = await storage.getApiKey(apiKeyId);
     if (!key) return res.status(404).json({ message: "Key not found" });
     if (key.userId !== req.user.claims.sub) {
        return res.status(403).json({ message: "Forbidden" });
     }
     await storage.deleteApiKey(apiKeyId);
     res.status(204).send();
  });

  app.get(api.transactions.list.path, isAuthenticated, async (req: any, res) => {
    const userId = req.user.claims.sub;
    const txs = await storage.getTransactions(userId);
    res.json(txs);
  });

  // === PUBLIC COMPUTE API (402 Protected) ===

  app.post(api.compute.solve.path, async (req, res) => {
    const token = req.headers['x-payment-token'] || req.headers['authorization']?.replace('Bearer ', '');
    const COST_PER_REQUEST = 0.01;

    if (!token) {
      return res.status(402).json({
        error: "Payment Required",
        message: "Missing X-Payment-Token header.",
        paymentUrl: `${req.protocol}://${req.get('host')}/`, // Link to dashboard
        minCost: COST_PER_REQUEST
      });
    }

    const apiKey = await storage.getApiKeyByToken(token as string);

    if (!apiKey) {
      return res.status(401).json({ message: "Invalid API token" });
    }

    if (parseFloat(apiKey.balance) < COST_PER_REQUEST) {
      return res.status(402).json({
        error: "Payment Required",
        message: "Insufficient balance.",
        paymentUrl: `${req.protocol}://${req.get('host')}/`,
        minCost: COST_PER_REQUEST,
        currentBalance: parseFloat(apiKey.balance)
      });
    }

    try {
      const { expression } = api.compute.solve.input.parse(req.body);
      
      // Limit expression length to prevent DoS
      if (expression.length > 1000) {
        return res.status(400).json({ message: "Expression too long (max 1000 characters)" });
      }
      
      // Block dangerous patterns in expression
      const blockedPatterns = [/import\s*\(/i, /require\s*\(/i, /eval\s*\(/i, /Function\s*\(/i];
      if (blockedPatterns.some(pattern => pattern.test(expression))) {
        return res.status(400).json({ message: "Expression contains blocked operations" });
      }
      
      // Perform computation
      let result;
      try {
        result = math.evaluate(expression);
        
        // Prevent returning functions or complex objects
        if (typeof result === 'function') {
          return res.status(400).json({ message: "Invalid result type" });
        }
      } catch (mathErr: any) {
        return res.status(400).json({ message: "Invalid mathematical expression" });
      }

      // Deduct balance and log
      await storage.updateApiKeyBalance(apiKey.id, -COST_PER_REQUEST);
      // Log transaction without storing the full expression (privacy)
      const truncatedInput = expression.length > 50 
        ? expression.substring(0, 50) + "..." 
        : expression;
      await storage.logTransaction(apiKey.id, "solve", COST_PER_REQUEST, truncatedInput, true);
      
      const updatedKey = await storage.getApiKey(apiKey.id);

      res.json({
        result,
        cost: COST_PER_REQUEST,
        remainingBalance: parseFloat(updatedKey?.balance || "0")
      });

    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  return httpServer;
}
