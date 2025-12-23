declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackDnsCheck(params: {
  domain: string;
  recordType: string;
  serverCount: number;
  hasErrors: boolean;
}) {
  if (!window.gtag) return;

  window.gtag('event', 'dns_check', {
    domain: params.domain,
    record_type: params.recordType,
    server_count: params.serverCount,
    has_errors: params.hasErrors ? 'true' : 'false',
  });
}

export function trackToolClick(toolName: string) {
  if (!window.gtag) return;
  window.gtag('event', 'tool_click', {
    tool_name: toolName,
  });
}

export function trackGuideView(params: {
  slug: string;
  category?: string;
}) {
  if (!window.gtag) return;
  window.gtag('event', 'guide_view', {
    article_slug: params.slug,
    article_category: params.category || 'dns',
  });
}

export function trackScrollSection(sectionName: string) {
  if (!window.gtag) return;
  window.gtag('event', 'scroll_section', {
    section_name: sectionName,
  });
}

export function trackShareResult(params: {
  domain: string;
  method: 'link' | 'email' | 'twitter' | 'slack' | string;
}) {
  if (!window.gtag) return;
  window.gtag('event', 'share_result', {
    domain: params.domain,
    share_method: params.method,
  });
}

export function trackSignupStart(source: string) {
  if (!window.gtag) return;
  window.gtag('event', 'signup_start', {
    source,
  });
}

export function trackSignupComplete(plan: string) {
  if (!window.gtag) return;
  window.gtag('event', 'signup_complete', {
    plan,
  });
}
