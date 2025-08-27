import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSubscriptionSchema } from "@shared/schema";
import { kitAPI } from "./kit";

export async function registerRoutes(app: Express): Promise<Server> {
  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const data = { ...req.body, subscriptionType: "newsletter" };
      const validatedData = insertNewsletterSubscriptionSchema.parse(data);
      const subscription = await storage.createNewsletterSubscription(validatedData);
      
      // Sync to Kit in background (non-blocking)
      kitAPI.syncSubscriberToKit(subscription).catch(error => {
        console.error('Kit sync failed (newsletter):', error);
      });
      
      res.json({ success: true, data: subscription });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Invalid data" 
      });
    }
  });

  // Course interest subscription endpoint
  app.post("/api/course-interest", async (req, res) => {
    try {
      const data = { ...req.body, subscriptionType: "course_interest" };
      const validatedData = insertNewsletterSubscriptionSchema.parse(data);
      const subscription = await storage.createNewsletterSubscription(validatedData);
      
      // Sync to Kit in background (non-blocking)
      kitAPI.syncSubscriberToKit(subscription).catch(error => {
        console.error('Kit sync failed (course interest):', error);
      });
      
      res.json({ success: true, data: subscription });
    } catch (error) {
      console.error("Course interest subscription error:", error);
      res.status(400).json({ 
        success: false, 
        error: error instanceof Error ? error.message : "Invalid data" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
