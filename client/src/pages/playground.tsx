import { useState } from "react";
import { Layout } from "@/components/layout";
import { useApiKeys } from "@/hooks/use-api-keys";
import { useSolve } from "@/hooks/use-compute";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Terminal, 
  Play, 
  RefreshCw, 
  Info,
  ChevronRight,
  Code
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

export default function Playground() {
  const { data: apiKeys } = useApiKeys();
  const solveMutation = useSolve();
  const { toast } = useToast();

  const [expression, setExpression] = useState("sin(45 * pi / 180) + 2^3");
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const handleRun = async () => {
    setResponse(null);
    setError(null);

    // If no key selected but user has keys, pick first
    const keyToUse = selectedKey || (apiKeys && apiKeys.length > 0 ? apiKeys[0].key : undefined);

    if (!keyToUse) {
      toast({
        title: "No API Key",
        description: "Please create an API key in the Dashboard first.",
        variant: "destructive"
      });
      return;
    }

    try {
      const result = await solveMutation.mutateAsync({
        expression,
        apiKey: keyToUse
      });
      setResponse(result);
    } catch (err: any) {
      console.error(err);
      if (err.paymentUrl) {
         setError(err); // 402 Payment Required special object
      } else {
        setError({ message: err.message || "Unknown error occurred" });
      }
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-full max-h-[800px]">
        <div className="mb-6">
          <h1 className="text-3xl font-display mb-2 flex items-center gap-3">
            <Terminal className="w-8 h-8 text-primary" />
            API Playground
          </h1>
          <p className="text-muted-foreground">Test compute endpoints directly in your browser.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Request Panel */}
          <div className="bg-card border border-border rounded-xl flex flex-col shadow-lg overflow-hidden">
            <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-muted-foreground">Request</span>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">POST</span>
                <span className="text-xs font-mono text-muted-foreground">/api/compute/solve</span>
              </div>
            </div>
            
            <div className="p-6 space-y-6 flex-1">
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase">Authorization (X-Payment-Token)</Label>
                <Select value={selectedKey} onValueChange={setSelectedKey}>
                  <SelectTrigger className="font-mono text-xs">
                    <SelectValue placeholder="Select an API Key..." />
                  </SelectTrigger>
                  <SelectContent>
                    {apiKeys?.map((key) => (
                      <SelectItem key={key.id} value={key.key} className="font-mono text-xs">
                        {key.name} ({key.key.substring(0, 8)}...) - Bal: ${Number(key.balance).toFixed(2)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {(!apiKeys || apiKeys.length === 0) && (
                   <p className="text-xs text-yellow-500 flex items-center gap-1">
                     <Info className="w-3 h-3" /> You need an API Key to run requests.
                   </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground uppercase">Body (JSON)</Label>
                <div className="relative">
                  <Input
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                    className="font-mono text-sm bg-background border-input pr-24"
                    placeholder="e.g. 2 + 2"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                    expression
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Supports basic arithmetic, trigonometry (sin, cos, tan), and standard math constants (pi, e).
                </p>
              </div>

              <div className="pt-4">
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                  <Code className="w-4 h-4 text-muted-foreground" />
                  cURL Example
                </h4>
                <div className="bg-black/50 p-4 rounded-lg font-mono text-xs text-muted-foreground overflow-x-auto whitespace-pre">
{`curl -X POST https://${window.location.host}/api/compute/solve \\
  -H "Content-Type: application/json" \\
  -H "X-Payment-Token: ${selectedKey || 'YOUR_API_KEY'}" \\
  -d '{"expression": "${expression}"}'`}
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/30 border-t border-border">
              <Button 
                onClick={handleRun} 
                className="w-full gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40"
                disabled={solveMutation.isPending || (!selectedKey && (!apiKeys || apiKeys.length === 0))}
              >
                {solveMutation.isPending ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                Execute Request
              </Button>
            </div>
          </div>

          {/* Response Panel */}
          <div className="bg-card border border-border rounded-xl flex flex-col shadow-lg overflow-hidden h-full min-h-[400px]">
             <div className="bg-muted/50 px-4 py-3 border-b border-border">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-muted-foreground">Response</span>
            </div>

            <div className="flex-1 p-0 font-mono text-sm overflow-auto relative bg-[#1e1e1e]">
              {solveMutation.isPending ? (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <div className="flex flex-col items-center gap-4">
                    <RefreshCw className="w-8 h-8 animate-spin text-primary" />
                    <span className="animate-pulse">Processing request...</span>
                  </div>
                </div>
              ) : error ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 text-red-400"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="font-bold">Request Failed</span>
                  </div>
                  <pre className="whitespace-pre-wrap break-all bg-red-950/30 p-4 rounded border border-red-900/50">
                    {JSON.stringify(error, null, 2)}
                  </pre>
                  
                  {error.error === "Payment Required" && (
                    <div className="mt-6 p-4 bg-yellow-950/30 border border-yellow-900/50 rounded-lg">
                      <h4 className="text-yellow-500 font-bold flex items-center gap-2 mb-2">
                        <Info className="w-4 h-4" /> 402 Payment Required
                      </h4>
                      <p className="text-yellow-200/80 mb-4">
                        This endpoint requires micropayments. Your balance is insufficient.
                      </p>
                      <Button 
                        variant="outline" 
                        className="border-yellow-700 text-yellow-500 hover:bg-yellow-900/20 hover:text-yellow-400"
                        onClick={() => window.open(error.paymentUrl, '_blank')}
                      >
                        Add Funds (Simulated)
                      </Button>
                    </div>
                  )}
                </motion.div>
              ) : response ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-6 text-green-400"
                >
                  <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                      <span className="font-bold text-green-500">200 OK</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Cost: ${response.cost.toFixed(4)}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <span className="text-gray-500">// Result</span>
                    <div className="text-xl text-white font-bold mb-6">
                      {response.result}
                    </div>
                    
                    <span className="text-gray-500">// Full Response JSON</span>
                    <pre className="text-blue-300">
                      {JSON.stringify(response, null, 2)}
                    </pre>
                  </div>
                </motion.div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30">
                  <div className="text-center">
                    <ChevronRight className="w-12 h-12 mx-auto mb-2 opacity-20" />
                    <p>Send a request to see the response</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
