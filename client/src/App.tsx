import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { usePageTracking } from "@/hooks/useAnalytics";
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
import LogoPreview from "@/pages/logo-preview";
import LogoOptions from "@/pages/logo-options";
import NotFound from "@/pages/not-found";
import DnsPropagationChecker from "@/pages/dns-propagation-checker";
import MxRecordLookup from "@/pages/mx-record-lookup";
import TxtRecordChecker from "@/pages/txt-record-checker";
import Embed from "@/pages/embed";
import Widget from "@/pages/widget";
import Guide from "@/pages/guide";
import GuidesIndex from "@/pages/guides-index";
import FaqPage from "@/pages/faq";
import Blog from "@/pages/blog";
import BlogArticle from "@/pages/blog-article";

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
      <Route path="/logo-preview" component={LogoPreview} />
      <Route path="/logo-options" component={LogoOptions} />
      <Route path="/dns-propagation-checker" component={DnsPropagationChecker} />
      <Route path="/mx-record-lookup" component={MxRecordLookup} />
      <Route path="/txt-record-checker" component={TxtRecordChecker} />
      <Route path="/embed" component={Embed} />
      <Route path="/widget" component={Widget} />
      <Route path="/guides" component={GuidesIndex} />
      <Route path="/guides/:slug" component={Guide} />
      <Route path="/faq/:slug" component={FaqPage} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogArticle} />
      <Route component={NotFound} />
    </Switch>
  );
}

function PageTracker() {
  usePageTracking();
  return null;
}

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <PageTracker />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
