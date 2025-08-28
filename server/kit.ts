import type { NewsletterSubscription } from "@shared/schema";

interface KitConfig {
  apiSecret: string;
  apiKey: string;
  baseUrl: string;
}

interface KitSubscribeResponse {
  subscription: {
    id: number;
    email_address: string;
    first_name?: string;
    state: string;
  };
}

interface KitFormResponse {
  forms: Array<{
    id: number;
    name: string;
    description?: string;
  }>;
}

interface KitTagResponse {
  tags: Array<{
    id: number;
    name: string;
  }>;
}

class KitAPI {
  private config: KitConfig;

  constructor() {
    if (!process.env.KIT_API_SECRET || !process.env.KIT_API_KEY) {
      throw new Error("KIT_API_SECRET and KIT_API_KEY environment variables are required");
    }

    this.config = {
      apiSecret: process.env.KIT_API_SECRET,
      apiKey: process.env.KIT_API_KEY,
      baseUrl: "https://api.convertkit.com/v3"
    };
  }

  private async makeRequest(method: string, endpoint: string, data?: any): Promise<any> {
    const url = `${this.config.baseUrl}/${endpoint}`;
    
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Kit API error (${response.status}): ${errorText}`);
    }

    return response.json();
  }

  async getForms(): Promise<KitFormResponse> {
    return this.makeRequest('GET', `forms?api_secret=${this.config.apiSecret}`);
  }

  async getTags(): Promise<KitTagResponse> {
    return this.makeRequest('GET', `tags?api_secret=${this.config.apiSecret}`);
  }

  async subscribeToForm(formId: string, subscriber: { email: string; firstName?: string; tags?: string[] }): Promise<KitSubscribeResponse> {
    const data = {
      api_key: this.config.apiKey,
      email: subscriber.email,
      ...(subscriber.firstName && { first_name: subscriber.firstName }),
      ...(subscriber.tags && { tags: subscriber.tags })
    };

    return this.makeRequest('POST', `forms/${formId}/subscribe`, data);
  }

  async addTagToSubscriber(tagId: string, email: string): Promise<any> {
    const data = {
      api_secret: this.config.apiSecret,
      email: email
    };

    return this.makeRequest('POST', `tags/${tagId}/subscribe`, data);
  }

  async syncSubscriberToKit(subscription: NewsletterSubscription): Promise<void> {
    try {
      // Map subscription types to Kit tag IDs (from your Kit account)
      const tagId = subscription.subscriptionType === 'newsletter' ? '10130247' : '10130249';
      const tagName = subscription.subscriptionType === 'newsletter' ? 'Newsletter' : 'Course Interest';
      
      console.log(`Syncing ${subscription.subscriptionType} subscriber: ${subscription.email} with tag: ${tagName}`);

      // Add subscriber to Kit with appropriate tag
      const result = await this.addTagToSubscriber(tagId, subscription.email);
      
      console.log(`✅ Successfully synced ${subscription.email} to Kit with ${tagName} tag`);
      return result;
      
    } catch (error) {
      console.error(`❌ Error syncing ${subscription.email} to Kit:`, error);
      throw error;
    }
  }
}

export const kitAPI = new KitAPI();