import { useState } from "react";
import { Layout } from "@/components/layout";
import { useApiKeys, useCreateApiKey, useDeleteApiKey, useTopUpApiKey } from "@/hooks/use-api-keys";
import { useAuth } from "@/hooks/use-auth";
import { 
  Plus, 
  Trash2, 
  Copy, 
  CreditCard, 
  Check, 
  AlertCircle,
  TrendingUp,
  DollarSign,
  Key
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

export default function Dashboard() {
  const { user } = useAuth();
  const { data: apiKeys, isLoading } = useApiKeys();
  const createApiKey = useCreateApiKey();
  const deleteApiKey = useDeleteApiKey();
  const topUpApiKey = useTopUpApiKey();
  const { toast } = useToast();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [selectedKeyId, setSelectedKeyId] = useState<number | null>(null);
  const [topUpAmount, setTopUpAmount] = useState<number>(5);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
    toast({
      title: "Copied to clipboard",
      description: "API key has been copied securely.",
    });
  };

  const handleCreate = async () => {
    try {
      await createApiKey.mutateAsync({ name: newKeyName });
      setIsCreateOpen(false);
      setNewKeyName("");
      toast({
        title: "Success",
        description: "API Key created successfully.",
      });
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to revoke this key? This action cannot be undone.")) {
      try {
        await deleteApiKey.mutateAsync(id);
        toast({ title: "Revoked", description: "API Key has been revoked." });
      } catch (err: any) {
        toast({ title: "Error", description: err.message, variant: "destructive" });
      }
    }
  };

  const handleTopUp = async () => {
    if (!selectedKeyId) return;
    try {
      await topUpApiKey.mutateAsync({ id: selectedKeyId, amount: topUpAmount });
      setIsTopUpOpen(false);
      setSelectedKeyId(null);
      toast({
        title: "Top Up Successful",
        description: `$${topUpAmount} added to your balance.`,
      });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  const totalBalance = apiKeys?.reduce((acc, key) => acc + Number(key.balance), 0) || 0;

  if (isLoading) {
    return (
      <Layout>
        <div className="space-y-4">
          <div className="h-32 bg-card/50 rounded-xl animate-pulse" />
          <div className="h-64 bg-card/50 rounded-xl animate-pulse" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-display mb-2">Welcome back, {user?.firstName || 'Developer'}</h1>
          <p className="text-muted-foreground">Manage your API keys and monitor your usage.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <DollarSign className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Balance</p>
              <h2 className="text-4xl font-mono font-bold text-primary">${totalBalance.toFixed(2)}</h2>
              <p className="text-xs text-muted-foreground mt-2">Available across {apiKeys?.length} keys</p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Key className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <p className="text-sm font-medium text-muted-foreground mb-1">Active Keys</p>
              <h2 className="text-4xl font-mono font-bold text-foreground">{apiKeys?.filter(k => k.active).length || 0}</h2>
              <p className="text-xs text-muted-foreground mt-2">API credentials active</p>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl relative overflow-hidden group border-primary/20 bg-primary/5">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp className="w-24 h-24 text-primary" />
            </div>
            <div className="relative z-10">
              <p className="text-sm font-medium text-primary/80 mb-1">System Status</p>
              <h2 className="text-4xl font-mono font-bold text-primary">Operational</h2>
              <p className="text-xs text-primary/60 mt-2">All systems normal</p>
            </div>
          </div>
        </div>

        {/* API Keys Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Key className="w-5 h-5 text-primary" />
              API Keys
            </h2>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">
                  <Plus className="w-4 h-4" /> Create New Key
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md bg-card border-border">
                <DialogHeader>
                  <DialogTitle>Create API Key</DialogTitle>
                  <DialogDescription>
                    Generate a new key to access the compute API.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Key Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Development, Production"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                      className="bg-background border-input focus:ring-primary"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreate} disabled={!newKeyName || createApiKey.isPending}>
                    {createApiKey.isPending ? "Creating..." : "Create Key"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {apiKeys?.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-border rounded-2xl bg-card/30">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Key className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">No API Keys Found</h3>
                  <p className="text-muted-foreground max-w-sm mx-auto mt-2">
                    Create your first API key to start using the compute services.
                  </p>
                </div>
              ) : (
                apiKeys?.map((key) => (
                  <motion.div
                    key={key.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, height: 0 }}
                    className="group bg-card border border-border rounded-xl p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-lg">{key.name}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full border ${key.active ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                            {key.active ? 'Active' : 'Revoked'}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground font-mono">Created on {format(new Date(key.createdAt!), 'MMM d, yyyy')}</p>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Balance</p>
                          <p className="text-2xl font-mono font-bold">${Number(key.balance).toFixed(4)}</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="gap-2"
                            onClick={() => {
                              setSelectedKeyId(key.id);
                              setIsTopUpOpen(true);
                            }}
                          >
                            <CreditCard className="w-4 h-4" /> Top Up
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleDelete(key.id)}
                            disabled={deleteApiKey.isPending}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-3 bg-background rounded-lg border border-border flex items-center justify-between font-mono text-sm relative group/key">
                      <span className="truncate max-w-[80%] text-muted-foreground select-all">
                        {key.key}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                        onClick={() => handleCopy(key.key)}
                      >
                        {copiedKey === key.key ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        )}
                      </Button>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Top Up Dialog */}
        <Dialog open={isTopUpOpen} onOpenChange={setIsTopUpOpen}>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle>Add Funds</DialogTitle>
              <DialogDescription>Simulate a payment to add credits to this API key.</DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-3 gap-4 py-4">
              {[5, 10, 25, 50, 100].map((amount) => (
                <div
                  key={amount}
                  className={`
                    cursor-pointer rounded-xl border-2 p-4 text-center transition-all
                    ${topUpAmount === amount 
                      ? 'border-primary bg-primary/10 text-primary font-bold shadow-sm' 
                      : 'border-border hover:border-primary/50 hover:bg-muted'
                    }
                  `}
                  onClick={() => setTopUpAmount(amount)}
                >
                  ${amount}
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsTopUpOpen(false)}>Cancel</Button>
              <Button onClick={handleTopUp} disabled={topUpApiKey.isPending} className="bg-primary hover:bg-primary/90">
                {topUpApiKey.isPending ? "Processing..." : `Pay $${topUpAmount}`}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
