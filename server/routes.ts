import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { performDnsLookup } from "./services/dns-resolver";
import { insertDnsLookupSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // DNS Lookup endpoint
  app.post("/api/dns/lookup", async (req, res) => {
    try {
      const validatedData = insertDnsLookupSchema.parse(req.body);
      
      // Create the lookup record
      const lookup = await storage.createDnsLookup(validatedData);
      
      // Get active DNS servers
      const dnsServers = await storage.getActiveDnsServers();
      const serverList = dnsServers.map(server => ({ id: server.id, ip: server.ip }));
      
      // Perform DNS lookup across all servers
      const dnsResults = await performDnsLookup(
        validatedData.domain,
        validatedData.recordType as any,
        serverList
      );
      
      // Store results
      for (const { serverId, result } of dnsResults) {
        await storage.createDnsResult({
          lookupId: lookup.id,
          serverId,
          status: result.success ? 'resolved' : 'failed',
          response: result.response || result.error || null,
          responseTime: result.responseTime,
        });
      }
      
      // Return the lookup with results
      const lookupWithResults = await storage.getDnsLookupWithResults(lookup.id);
      res.json(lookupWithResults);
      
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: "Validation error",
          errors: error.errors
        });
      } else {
        console.error("DNS lookup error:", error);
        res.status(500).json({
          message: "Internal server error during DNS lookup"
        });
      }
    }
  });
  
  // Get lookup results by ID
  app.get("/api/dns/lookup/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid lookup ID" });
      }
      
      const lookup = await storage.getDnsLookupWithResults(id);
      if (!lookup) {
        return res.status(404).json({ message: "Lookup not found" });
      }
      
      res.json(lookup);
    } catch (error) {
      console.error("Error fetching lookup:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Get all DNS servers
  app.get("/api/dns/servers", async (req, res) => {
    try {
      const servers = await storage.getAllDnsServers();
      res.json(servers);
    } catch (error) {
      console.error("Error fetching DNS servers:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const httpServer = createServer(app);
  return httpServer;
}
