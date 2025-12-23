import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ChevronRight, Search, Lock, Crown } from "lucide-react";
import { insertDnsLookupSchema, DNS_RECORD_TYPES, type DnsLookupWithResults } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { trackDnsCheck } from "@/lib/analytics";
import { z } from "zod";
import { Link } from "wouter";

const formSchema = insertDnsLookupSchema.extend({
  domain: z.string().min(1, "Domain is required").regex(/^[a-zA-Z0-9][a-zA-Z0-9-_.]*[a-zA-Z0-9]$/, "Invalid domain format"),
});

type FormData = z.infer<typeof formSchema>;

interface DnsLookupFormProps {
  onLookupComplete: (results: DnsLookupWithResults) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

interface UsageStats {
  plan: string;
  dailyLimit: number | null;
  used: number;
  remaining: number;
  resetAt: string;
  allowedRecordTypes: string[];
}

export function DnsLookupForm({ onLookupComplete, isLoading, setIsLoading }: DnsLookupFormProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const { toast } = useToast();

  // Fetch usage stats to check allowed record types
  const { data: usageStats } = useQuery<UsageStats>({
    queryKey: ['/api/usage/stats'],
    refetchInterval: 30000,
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      domain: "",
      recordType: "A",
      expectedValue: "",
      matchType: "exact",
    },
  });

  const lookupMutation = useMutation({
    mutationFn: async (data: FormData) => {
      setIsLoading(true);
      const response = await apiRequest("POST", "/api/dns/lookup", data);
      return response.json() as Promise<DnsLookupWithResults>;
    },
    onSuccess: (data) => {
      onLookupComplete(data);
      trackDnsCheck({
        domain: data.domain,
        recordType: data.recordType,
        serverCount: data.stats.totalServers,
        hasErrors: data.stats.unresolvedCount > 0,
      });
      toast({
        title: "DNS Lookup Complete",
        description: `Found ${data.stats.resolvedCount} of ${data.stats.totalServers} DNS servers responding.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "DNS Lookup Failed",
        description: error.message || "An error occurred during DNS lookup.",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit = (data: FormData) => {
    lookupMutation.mutate(data);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Domain Input and Record Type */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="domain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domain or Hostname</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter domain (e.g., example.com)"
                          className="text-lg h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <div className="sm:w-48">
                <FormField
                  control={form.control}
                  name="recordType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Record Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {DNS_RECORD_TYPES.map((type) => {
                            const isAllowed = usageStats?.allowedRecordTypes.includes(type) !== false;
                            return (
                              <SelectItem 
                                key={type} 
                                value={type}
                                disabled={!isAllowed}
                                className={!isAllowed ? "opacity-50 cursor-not-allowed" : ""}
                                data-testid={`record-type-option-${type.toLowerCase()}`}
                              >
                                <div className="flex items-center gap-2">
                                  {type}
                                  {!isAllowed && (
                                    <div className="flex items-center gap-1">
                                      <Lock className="h-3 w-3 text-muted-foreground" />
                                      <span className="text-xs text-muted-foreground">Pro</span>
                                    </div>
                                  )}
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            
            {/* Advanced Options */}
            <Collapsible open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium p-0 h-auto"
                >
                  <ChevronRight 
                    className={`h-4 w-4 mr-1 transition-transform ${isAdvancedOpen ? 'rotate-90' : ''}`} 
                  />
                  Advanced Options
                </Button>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="space-y-4 mt-4">
                <div className="p-4 bg-gray-50 rounded-md space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="expectedValue"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expected Value</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Optional: Expected IP or value"
                              value={field.value || ""}
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              name={field.name}
                              ref={field.ref}
                              disabled={field.disabled}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="matchType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Match Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value || "exact"}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="exact">Exact Match</SelectItem>
                              <SelectItem value="contains">Contains</SelectItem>
                              <SelectItem value="regex">Regular Expression</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="autoRefresh" />
                      <Label htmlFor="autoRefresh" className="text-sm">
                        Enable auto-refresh (30s)
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ipv6" />
                      <Label htmlFor="ipv6" className="text-sm">
                        Use IPv6 servers
                      </Label>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </Collapsible>
            
            {/* Search Button */}
            <div className="flex justify-center">
              <Button 
                type="submit" 
                size="lg"
                disabled={isLoading}
                className="px-8"
              >
                <Search className="h-5 w-5 mr-2" />
                {isLoading ? "Checking DNS Propagation..." : "Check DNS Propagation"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
