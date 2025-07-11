import { Environment, Paddle } from '@paddle/paddle-node-sdk';

// Initialize Paddle with production credentials
export const paddle = new Paddle(
  process.env.PADDLE_API_KEY || '',
  {
    environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT === 'production' 
      ? Environment.production 
      : Environment.sandbox,
  }
);

// Paddle configuration constants
export const PADDLE_CONFIG = {
  environment: process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT || 'production',
  clientToken: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN || '',
  webhookSecret: process.env.PADDLE_WEBHOOK_SECRET || '',
  domain: process.env.NEXT_PUBLIC_DOMAIN || 'http://localhost:3000',
};

// Product configuration - PRODUCTION VALUES
export const PRODUCTS = {
  COMPLETE_SOLUTION: {
    // Production price ID from environment variable
    // Set NEXT_PUBLIC_PADDLE_PRICE_ID in .env.local
    id: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID || '', 
    name: 'Complete Solution Package',
    price: 299700, // $2,997.00 (Paddle uses cents)
    currency: 'USD',
    description: 'Professional AI-powered pitch deck creation service',
  },
};

// Customer metadata structure
export interface CustomerMetadata {
  email: string;
  name?: string;
  company?: string;
  phone?: string;
  projectDetails?: string;
}

// Checkout configuration
export const getCheckoutConfig = (customerData: CustomerMetadata) => ({
  items: [
    {
      priceId: PRODUCTS.COMPLETE_SOLUTION.id,
      quantity: 1,
    },
  ],
  customer: {
    email: customerData.email,
    name: customerData.name,
  },
  customData: {
    company: customerData.company,
    phone: customerData.phone,
    projectDetails: customerData.projectDetails,
  },
  settings: {
    displayMode: 'overlay',
    theme: 'dark',
    locale: 'en',
    allowLogout: false,
    successUrl: `${PADDLE_CONFIG.domain}/thank-you?success=true`,
    frameTarget: 'self',
    frameStyle: 'width: 100%; background-color: transparent; border: none;',
  },
});
