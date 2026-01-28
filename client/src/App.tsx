import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Playground from "@/pages/playground";
import Transactions from "@/pages/transactions";
import Landing from "@/pages/landing";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

function PrivateRoute({ component: Component, ...rest }: any) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background text-primary">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    // Let the landing page handle the redirect or show login options
    // But typically wouter just renders the component
    // We'll redirect at the page level or show Landing
    return <Landing />;
  }

  return <Component {...rest} />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <PrivateRoute component={Dashboard} />} />
      <Route path="/playground" component={() => <PrivateRoute component={Playground} />} />
      <Route path="/transactions" component={() => <PrivateRoute component={Transactions} />} />
      <Route path="/landing" component={Landing} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
