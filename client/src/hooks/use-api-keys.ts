import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

export function useApiKeys() {
  return useQuery({
    queryKey: [api.keys.list.path],
    queryFn: async () => {
      const res = await fetch(api.keys.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch API keys");
      return api.keys.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateApiKey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: z.infer<typeof api.keys.create.input>) => {
      const validated = api.keys.create.input.parse(data);
      const res = await fetch(api.keys.create.path, {
        method: api.keys.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.keys.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create API key");
      }
      return api.keys.create.responses[201].parse(await res.json());
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.keys.list.path] }),
  });
}

export function useDeleteApiKey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.keys.delete.path, { id });
      const res = await fetch(url, { 
        method: api.keys.delete.method,
        credentials: "include" 
      });
      if (!res.ok) throw new Error("Failed to delete API key");
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [api.keys.list.path] }),
  });
}

export function useTopUpApiKey() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, amount }: { id: number, amount: number }) => {
      const url = buildUrl(api.keys.topUp.path, { id });
      const res = await fetch(url, {
        method: api.keys.topUp.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to top up API key");
      return api.keys.topUp.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.keys.list.path] });
      queryClient.invalidateQueries({ queryKey: [api.transactions.list.path] });
    },
  });
}
