import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Tools from "@/pages/tools";
import ApiDocs from "@/pages/api-docs";
import Documentation from "@/pages/documentation";
import BulkLookup from "@/pages/bulk-lookup";
import DnsCompare from "@/pages/dns-compare";
import Monitor from "@/pages/monitor";
import History from "@/pages/history";
import Analytics from "@/pages/analytics";
import Security from "@/pages/security";
import DNSSEC from "@/pages/dnssec";
import SignIn from "@/pages/signin";
import Pricing from "@/pages/pricing";
import Dashboard from "@/pages/dashboard";
import Contact from "@/pages/contact";
import Subscribe from "@/pages/subscribe";
import SharedResult from "@/pages/shared-result";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/r/:shareId" component={SharedResult} />
      <Route path="/tools" component={Tools} />
      <Route path="/api-docs" component={ApiDocs} />
      <Route path="/documentation" component={Documentation} />
      <Route path="/bulk-lookup" component={BulkLookup} />
      <Route path="/compare" component={DnsCompare} />
      <Route path="/monitor" component={Monitor} />
      <Route path="/history" component={History} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/security" component={Security} />
      <Route path="/dnssec" component={DNSSEC} />
      <Route path="/signin" component={SignIn} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/subscribe" component={Subscribe} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/contact" component={Contact} />
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
