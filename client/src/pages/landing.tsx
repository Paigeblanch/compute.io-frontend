import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Terminal, 
  Cpu, 
  Zap, 
  Code, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function Landing() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  if (user) {
    setLocation("/"); // Redirect to dashboard if logged in
    return null;
  }

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const codeExample = `
// Request
curl -X POST https://api.compute.io/solve \\
  -H "X-Payment-Token: sk_live_..." \\
  -d '{"expression": "integrate(x^2, x)"}'

// Response (200 OK)
{
  "result": "x**3/3",
  "cost": 0.005,
  "remainingBalance": 14.995
}
`.trim();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
              <Cpu className="w-5 h-5" />
            </div>
            <span>Compute.io</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" className="text-sm font-medium hover:text-primary" onClick={handleLogin}>
              Log In
            </Button>
            <Button onClick={handleLogin} className="bg-white text-black hover:bg-white/90 font-semibold shadow-lg shadow-white/10">
              Get API Key
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-30 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Zap className="w-4 h-4 fill-primary" />
              <span>Serverless Math & Physics API</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-display font-bold leading-[1.1] tracking-tight text-glow">
              Offload your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-pink-400">
                heavy compute.
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              A lightweight, pay-per-request API for AI agents to solve equations, run simulations, and process logic without the LLM overhead.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" onClick={handleLogin} className="h-12 px-8 text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25">
                Start Building <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base border-white/10 hover:bg-white/5">
                View Documentation
              </Button>
            </div>

            <div className="pt-8 flex items-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>Sub-millisecond latency</span>
              </div>
            </div>
          </div>

          {/* Code Demo */}
          <div className="relative animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-30" />
            <div className="relative rounded-2xl bg-[#0d1117] border border-white/10 shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>
                <div className="text-xs font-mono text-muted-foreground ml-2">agent-script.js</div>
              </div>
              <div className="p-6 overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed">
                  <code className="language-bash text-gray-300">
                    {codeExample.split('\n').map((line, i) => (
                      <div key={i} className="table-row">
                        <span className="table-cell select-none text-gray-700 text-right pr-4 w-8">{i + 1}</span>
                        <span className="table-cell">
                          {line.startsWith('//') ? (
                            <span className="text-gray-500 italic">{line}</span>
                          ) : line.includes('curl') ? (
                            <span className="text-purple-400">{line}</span>
                          ) : line.includes('http') ? (
                            <span className="text-green-400">{line}</span>
                          ) : (
                            <span>{line}</span>
                          )}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 border-t border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Why use Compute.io?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Optimized for autonomous agents that need reliable, deterministic outputs for math and physics problems.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Terminal className="w-8 h-8 text-primary" />,
                title: "Simple API",
                desc: "One endpoint for all your mathematical needs. Just send the expression, get the result."
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-primary" />,
                title: "Secure & Metered",
                desc: "API key authentication with granular usage tracking and spending limits."
              },
              {
                icon: <Code className="w-8 h-8 text-primary" />,
                title: "Agent Native",
                desc: "Built specifically for LLM agents to offload deterministic tasks they struggle with."
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-2xl bg-card border border-white/5 hover:border-primary/50 transition-colors group">
                <div className="mb-6 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-white/5 text-center text-muted-foreground text-sm">
        <p>© 2024 Compute.io. All rights reserved.</p>
      </footer>
    </div>
  );
}
