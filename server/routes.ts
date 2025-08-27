import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertNewsletterSubscriptionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Newsletter subscription endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const data = { ...req.body, subscriptionType: "newsletter" };
      const validatedData = insertNewsletterSubscriptionSchema.parse(data);
      const subscription = await storage.createNewsletterSubscription(validatedData);
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
