import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'wouter';

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

function getVisitorId(): string {
  let visitorId = localStorage.getItem('_vid');
  if (!visitorId) {
    visitorId = generateId();
    localStorage.setItem('_vid', visitorId);
  }
  return visitorId;
}

function getSessionId(): string {
  let sessionId = sessionStorage.getItem('_sid');
  if (!sessionId) {
    sessionId = generateId();
    sessionStorage.setItem('_sid', sessionId);
  }
  return sessionId;
}

async function sendEvent(data: {
  eventType: string;
  eventName?: string;
  pathname?: string;
  referrer?: string;
  properties?: Record<string, unknown>;
}) {
  try {
    await fetch('/api/analytics/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: getSessionId(),
        visitorId: getVisitorId(),
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        referrer: document.referrer,
        ...data,
      }),
    });
  } catch (error) {
    console.error('Analytics error:', error);
  }
}

export function usePageTracking() {
  const [location] = useLocation();
  const lastPath = useRef<string>('');

  useEffect(() => {
    if (location !== lastPath.current) {
      lastPath.current = location;
      sendEvent({
        eventType: 'pageview',
        pathname: location,
        referrer: document.referrer,
      });
    }
  }, [location]);
}

export function useAnalytics() {
  const trackEvent = useCallback((eventName: string, properties?: Record<string, unknown>) => {
    sendEvent({
      eventType: 'event',
      eventName,
      pathname: window.location.pathname,
      properties,
    });
  }, []);

  return { trackEvent };
}
