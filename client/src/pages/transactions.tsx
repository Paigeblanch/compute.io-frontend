import { Layout } from "@/components/layout";
import { useTransactions } from "@/hooks/use-transactions";
import { useAuth } from "@/hooks/use-auth";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { format } from "date-fns";
import { 
  Activity, 
  Search, 
  ArrowUpRight, 
  ArrowDownLeft, 
  CheckCircle2, 
  XCircle 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function Transactions() {
  const { data: transactions, isLoading } = useTransactions();
  const [search, setSearch] = useState("");

  const filteredTransactions = transactions?.filter(t => 
    t.operation.toLowerCase().includes(search.toLowerCase()) ||
    t.input?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display mb-2">Usage Logs</h1>
          <p className="text-muted-foreground">Detailed history of all API calls and transactions.</p>
        </div>

        <div className="glass-card rounded-xl overflow-hidden border border-border">
          <div className="p-4 border-b border-border flex items-center justify-between gap-4 bg-card/30">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search logs..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-background/50 border-input"
              />
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="w-4 h-4" />
              <span>{transactions?.length || 0} Total Requests</span>
            </div>
          </div>

          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[180px]">Timestamp</TableHead>
                  <TableHead>Operation</TableHead>
                  <TableHead className="min-w-[200px]">Input / Details</TableHead>
                  <TableHead>Cost</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell><div className="h-4 w-24 bg-muted rounded animate-pulse" /></TableCell>
                      <TableCell><div className="h-4 w-16 bg-muted rounded animate-pulse" /></TableCell>
                      <TableCell><div className="h-4 w-48 bg-muted rounded animate-pulse" /></TableCell>
                      <TableCell><div className="h-4 w-12 bg-muted rounded animate-pulse" /></TableCell>
                      <TableCell><div className="h-4 w-16 bg-muted rounded animate-pulse ml-auto" /></TableCell>
                    </TableRow>
                  ))
                ) : filteredTransactions?.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                      No transactions found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions?.map((tx) => (
                    <TableRow key={tx.id} className="hover:bg-muted/20 transition-colors">
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        {format(new Date(tx.createdAt!), 'MMM d, HH:mm:ss')}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "p-1.5 rounded-md",
                            tx.operation === 'solve' ? "bg-blue-500/10 text-blue-500" : "bg-purple-500/10 text-purple-500"
                          )}>
                            {tx.operation === 'solve' ? <ArrowUpRight className="w-3 h-3" /> : <Activity className="w-3 h-3" />}
                          </span>
                          <span className="font-medium text-sm capitalize">{tx.operation}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="px-2 py-1 rounded bg-muted/50 text-xs font-mono text-foreground/80 break-all">
                          {tx.input || '-'}
                        </code>
                      </TableCell>
                      <TableCell>
                        <span className="font-mono text-sm font-medium">
                          ${Number(tx.cost).toFixed(4)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {tx.success ? (
                          <div className="flex items-center justify-end gap-1.5 text-green-500 text-xs font-medium">
                            <span>Success</span>
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                        ) : (
                          <div className="flex items-center justify-end gap-1.5 text-red-500 text-xs font-medium">
                            <span>Failed</span>
                            <XCircle className="w-4 h-4" />
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
