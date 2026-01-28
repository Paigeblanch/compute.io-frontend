import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

export function useSolve() {
  return useMutation({
    mutationFn: async ({ expression, apiKey }: { expression: string; apiKey?: string }) => {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (apiKey) {
        headers["X-Payment-Token"] = apiKey;
      }

      const res = await fetch(api.compute.solve.path, {
        method: api.compute.solve.method,
        headers,
        body: JSON.stringify({ expression }),
        credentials: "include", // Important for playground if using session auth implicitly
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 402) {
          const error = api.compute.solve.responses[402].parse(data);
          throw error; // Throw object for specific handling
        }
        if (res.status === 400) {
           const error = api.compute.solve.responses[400].parse(data);
           throw new Error(error.message);
        }
        throw new Error("Computation failed");
      }

      return api.compute.solve.responses[200].parse(data);
    },
  });
}
