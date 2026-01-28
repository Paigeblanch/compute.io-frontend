import { z } from 'zod';
import { insertApiKeySchema, apiKeys, transactions } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  paymentRequired: z.object({
    error: z.literal("Payment Required"),
    message: z.string(),
    paymentUrl: z.string(),
    minCost: z.number(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  compute: {
    solve: {
      method: 'POST' as const,
      path: '/api/compute/solve',
      input: z.object({
        expression: z.string().min(1, "Expression is required"),
      }),
      responses: {
        200: z.object({
          result: z.union([z.string(), z.number()]),
          cost: z.number(),
          remainingBalance: z.number(),
        }),
        400: errorSchemas.validation,
        402: errorSchemas.paymentRequired,
      },
    },
  },
  keys: {
    list: {
      method: 'GET' as const,
      path: '/api/keys',
      responses: {
        200: z.array(z.custom<typeof apiKeys.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/keys',
      input: insertApiKeySchema,
      responses: {
        201: z.custom<typeof apiKeys.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
    topUp: {
      method: 'POST' as const,
      path: '/api/keys/:id/topup',
      input: z.object({ amount: z.number().positive() }),
      responses: {
        200: z.custom<typeof apiKeys.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/keys/:id',
      responses: {
        204: z.void(),
        404: errorSchemas.notFound,
      },
    },
  },
  transactions: {
    list: {
      method: 'GET' as const,
      path: '/api/transactions',
      responses: {
        200: z.array(z.custom<typeof transactions.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
