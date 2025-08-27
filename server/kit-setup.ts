import { kitAPI } from "./kit";

/**
 * One-time setup script to configure Kit forms and tags for proper segmentation
 * Run this to set up your Kit account with the necessary forms/tags
 */
async function setupKitIntegration() {
  try {
    console.log("Setting up Kit integration...");
    
    // Get existing forms and tags
    const [forms, tags] = await Promise.all([
      kitAPI.getForms(),
      kitAPI.getTags()
    ]);
    
    console.log("\n=== EXISTING FORMS ===");
    forms.forms.forEach(form => {
      console.log(`ID: ${form.id} | Name: ${form.name}`);
    });
    
    console.log("\n=== EXISTING TAGS ===");
    tags.tags.forEach(tag => {
      console.log(`ID: ${tag.id} | Name: ${tag.name}`);
    });
    
    console.log("\n=== SETUP INSTRUCTIONS ===");
    console.log("1. In your Kit dashboard, create these tags if they don't exist:");
    console.log("   - 'Newsletter' (for newsletter subscribers)");
    console.log("   - 'Course Interest' (for course launch notifications)");
    console.log("");
    console.log("2. Optionally create forms:");
    console.log("   - 'Newsletter Signup' form");
    console.log("   - 'Course Interest' form");
    console.log("");
    console.log("3. Update server/kit.ts with your specific form/tag IDs");
    console.log("4. Your database will automatically sync new subscribers to Kit with proper tags");
    
  } catch (error) {
    console.error("Setup error:", error);
  }
}

// Run setup if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupKitIntegration();
}

export { setupKitIntegration };