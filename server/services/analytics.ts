const GA_MEASUREMENT_ID = 'G-N0MQZMQFVC';
const GA_API_SECRET = process.env.GA_API_SECRET;
const GA_ENDPOINT = 'https://www.google-analytics.com/mp/collect';
const GA_DEBUG_ENDPOINT = 'https://www.google-analytics.com/debug/mp/collect';

interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

interface GA4Event {
  name: string;
  params?: EventParams;
}

interface GA4Payload {
  client_id: string;
  user_id?: string;
  timestamp_micros?: number;
  events: GA4Event[];
  user_properties?: Record<string, { value: string | number }>;
}

export async function trackEvent(
  clientId: string,
  eventName: string,
  params?: EventParams,
  userId?: string,
  userProperties?: Record<string, string | number>
): Promise<boolean> {
  if (!GA_API_SECRET) {
    console.log('[Analytics] GA_API_SECRET not configured, skipping event:', eventName);
    return false;
  }

  const payload: GA4Payload = {
    client_id: clientId,
    events: [
      {
        name: eventName,
        params: {
          session_id: Date.now().toString(),
          engagement_time_msec: 100,
          ...params,
        },
      },
    ],
  };

  if (userId) {
    payload.user_id = userId;
  }

  if (userProperties) {
    payload.user_properties = {};
    for (const [key, value] of Object.entries(userProperties)) {
      payload.user_properties[key] = { value };
    }
  }

  try {
    const url = `${GA_ENDPOINT}?measurement_id=${GA_MEASUREMENT_ID}&api_secret=${GA_API_SECRET}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log('[Analytics] Event tracked:', eventName, params);
      return true;
    } else {
      console.error('[Analytics] Failed to track event:', eventName, response.status);
      return false;
    }
  } catch (error) {
    console.error('[Analytics] Error tracking event:', eventName, error);
    return false;
  }
}

export async function trackDnsLookup(
  clientId: string,
  domain: string,
  recordType: string,
  userId?: string,
  userPlan?: string
): Promise<void> {
  await trackEvent(
    clientId,
    'dns_lookup',
    {
      domain,
      record_type: recordType,
      user_plan: userPlan || 'anonymous',
    },
    userId,
    userPlan ? { subscription_plan: userPlan } : undefined
  );
}

export async function trackSignup(
  clientId: string,
  userId: string,
  email: string
): Promise<void> {
  await trackEvent(
    clientId,
    'sign_up',
    {
      method: 'email',
    },
    userId
  );
}

export async function trackLogin(
  clientId: string,
  userId: string,
  userPlan?: string
): Promise<void> {
  await trackEvent(
    clientId,
    'login',
    {
      method: 'email',
      user_plan: userPlan || 'free',
    },
    userId,
    userPlan ? { subscription_plan: userPlan } : undefined
  );
}

export async function trackSubscription(
  clientId: string,
  userId: string,
  plan: string,
  value: number,
  currency: string = 'USD'
): Promise<void> {
  await trackEvent(
    clientId,
    'purchase',
    {
      transaction_id: `sub_${userId}_${Date.now()}`,
      value,
      currency,
      items: JSON.stringify([{ item_name: `${plan}_subscription`, price: value }]),
    },
    userId,
    { subscription_plan: plan }
  );

  await trackEvent(
    clientId,
    'subscription_started',
    {
      plan,
      value,
      currency,
    },
    userId,
    { subscription_plan: plan }
  );
}

export async function trackPageView(
  clientId: string,
  pagePath: string,
  pageTitle: string,
  userId?: string
): Promise<void> {
  await trackEvent(
    clientId,
    'page_view',
    {
      page_location: `https://reviewmydns.com${pagePath}`,
      page_title: pageTitle,
    },
    userId
  );
}

export function generateClientId(): string {
  return `${Math.floor(Math.random() * 1000000000)}.${Math.floor(Date.now() / 1000)}`;
}

export function extractClientId(cookies: string | undefined): string {
  if (!cookies) return generateClientId();
  
  const gaCookie = cookies.split(';').find(c => c.trim().startsWith('_ga='));
  if (gaCookie) {
    const parts = gaCookie.split('=')[1]?.split('.');
    if (parts && parts.length >= 4) {
      return `${parts[2]}.${parts[3]}`;
    }
  }
  
  return generateClientId();
}
