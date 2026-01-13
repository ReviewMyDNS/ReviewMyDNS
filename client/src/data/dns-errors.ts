export interface DnsError {
  slug: string;
  code: string;
  title: string;
  description: string;
  metaDescription: string;
  causes: string[];
  solutions: string[];
  technicalDetails: string;
  relatedErrors: string[];
  keywords: string[];
}

export const dnsErrors: DnsError[] = [
  {
    slug: "nxdomain",
    code: "NXDOMAIN",
    title: "NXDOMAIN Error: What It Means & How to Fix It",
    description: "The domain name does not exist in the DNS system",
    metaDescription: "Fix NXDOMAIN errors fast. Learn why you're seeing 'domain does not exist' and get step-by-step solutions for DNS resolution failures.",
    causes: [
      "Domain name is misspelled or doesn't exist",
      "Domain registration has expired",
      "DNS records have not been configured",
      "Domain was recently registered and hasn't propagated",
      "Authoritative nameservers are not responding"
    ],
    solutions: [
      "Double-check the domain spelling",
      "Verify domain registration status with your registrar",
      "Ensure nameservers are properly configured",
      "Wait for DNS propagation (up to 48 hours for new domains)",
      "Check if the domain was recently transferred"
    ],
    technicalDetails: "NXDOMAIN (Non-Existent Domain) is a DNS response code indicating that the queried domain name does not exist. The authoritative nameserver returns RCODE 3 (NXDOMAIN) when it has no records for the requested name. This is different from NOERROR with empty results, which means the domain exists but has no records of the requested type.",
    relatedErrors: ["servfail", "refused", "timeout"],
    keywords: ["NXDOMAIN", "domain not found", "DNS error", "domain does not exist", "name resolution failed"]
  },
  {
    slug: "servfail",
    code: "SERVFAIL",
    title: "SERVFAIL Error: Causes & Solutions for DNS Server Failures",
    description: "The DNS server encountered an error processing the query",
    metaDescription: "Troubleshoot SERVFAIL DNS errors. Understand why DNS servers fail and how to resolve server-side DNS issues quickly.",
    causes: [
      "Authoritative nameserver is down or unreachable",
      "DNSSEC validation failure",
      "Misconfigured DNS zone file",
      "Network connectivity issues between resolvers",
      "DNS server software crash or overload"
    ],
    solutions: [
      "Check if authoritative nameservers are online",
      "Verify DNSSEC configuration is correct",
      "Review zone file for syntax errors",
      "Test connectivity to nameservers from multiple locations",
      "Contact your DNS provider if issue persists"
    ],
    technicalDetails: "SERVFAIL (Server Failure) is DNS RCODE 2, indicating the nameserver encountered a problem while processing the query. Common causes include DNSSEC validation failures, unreachable authoritative servers, or internal server errors. Unlike NXDOMAIN, SERVFAIL means the resolver couldn't get a definitive answer.",
    relatedErrors: ["nxdomain", "refused", "timeout"],
    keywords: ["SERVFAIL", "DNS server failure", "server error", "DNS resolution failed", "nameserver error"]
  },
  {
    slug: "refused",
    code: "REFUSED",
    title: "REFUSED DNS Error: Why Your Query Was Rejected",
    description: "The DNS server refused to answer the query",
    metaDescription: "Fix REFUSED DNS errors. Learn why DNS servers reject queries and how to resolve access and configuration issues.",
    causes: [
      "DNS server doesn't allow queries from your IP",
      "Recursive queries disabled on authoritative server",
      "Firewall or ACL blocking DNS requests",
      "Rate limiting triggered on the DNS server",
      "Server configured to refuse queries for this zone"
    ],
    solutions: [
      "Use a different DNS resolver (8.8.8.8 or 1.1.1.1)",
      "Check if you're querying the correct nameserver type",
      "Verify your IP isn't blocked or rate-limited",
      "Contact the DNS server administrator",
      "Review firewall rules if you control the server"
    ],
    technicalDetails: "REFUSED is DNS RCODE 5, meaning the server chose not to answer. This typically occurs when querying an authoritative server for recursion, or when ACLs block your IP. It's a policy decision by the server, not a technical failure.",
    relatedErrors: ["nxdomain", "servfail", "timeout"],
    keywords: ["REFUSED", "DNS refused", "query refused", "access denied DNS", "DNS blocked"]
  },
  {
    slug: "timeout",
    code: "TIMEOUT",
    title: "DNS Timeout Error: Why Queries Take Too Long",
    description: "The DNS query did not receive a response within the time limit",
    metaDescription: "Solve DNS timeout issues. Understand why DNS queries time out and how to speed up resolution.",
    causes: [
      "DNS server is unreachable or offline",
      "Network congestion or packet loss",
      "Firewall blocking UDP port 53",
      "Server overloaded with requests",
      "Geographic distance causing latency"
    ],
    solutions: [
      "Try a different DNS resolver",
      "Check your network connectivity",
      "Verify UDP port 53 is not blocked",
      "Use a geographically closer DNS server",
      "Increase timeout value in your resolver"
    ],
    technicalDetails: "DNS timeout occurs when no response is received within the configured wait period (typically 2-5 seconds). The resolver may retry multiple times before declaring failure. Timeouts can indicate network issues, server problems, or packet filtering.",
    relatedErrors: ["servfail", "refused", "network-unreachable"],
    keywords: ["DNS timeout", "query timeout", "no response", "DNS slow", "resolution timeout"]
  },
  {
    slug: "noerror-empty",
    code: "NOERROR (Empty)",
    title: "NOERROR Empty Response: Domain Exists But No Records Found",
    description: "The domain exists but has no records of the requested type",
    metaDescription: "Understand empty DNS responses. Learn why a domain returns no records and how to troubleshoot missing DNS entries.",
    causes: [
      "No records exist for the queried type (e.g., no MX records)",
      "Records were deleted but domain still exists",
      "Querying for wrong record type",
      "Zone file missing the specific record",
      "Records configured at wrong subdomain level"
    ],
    solutions: [
      "Verify you're querying the correct record type",
      "Check the zone file for the expected records",
      "Query for different record types (A, AAAA, CNAME)",
      "Ensure records are at the correct domain/subdomain",
      "Add the missing DNS records"
    ],
    technicalDetails: "NOERROR with an empty answer section (ANCOUNT=0) means the domain is valid and the authoritative server responded, but no records of the requested type exist. This is different from NXDOMAIN where the entire domain doesn't exist.",
    relatedErrors: ["nxdomain", "cname-loop"],
    keywords: ["empty DNS response", "no records", "NOERROR empty", "missing DNS records", "no A record"]
  },
  {
    slug: "formerr",
    code: "FORMERR",
    title: "FORMERR: DNS Format Error Explained",
    description: "The DNS query was malformed or improperly formatted",
    metaDescription: "Fix FORMERR DNS errors. Learn what causes format errors in DNS queries and how to resolve them.",
    causes: [
      "Malformed DNS query packet",
      "Incompatible DNS protocol version",
      "DNS client software bug",
      "Corrupted network packets",
      "Unsupported query type or class"
    ],
    solutions: [
      "Update your DNS client software",
      "Try a different DNS resolver",
      "Check for network issues corrupting packets",
      "Use standard query types (A, AAAA, MX, TXT)",
      "Verify your DNS tools are configured correctly"
    ],
    technicalDetails: "FORMERR (Format Error) is DNS RCODE 1, indicating the server couldn't interpret the query. This is rare in normal operations and usually indicates a software bug, network corruption, or protocol mismatch.",
    relatedErrors: ["servfail", "notimpl"],
    keywords: ["FORMERR", "format error", "malformed DNS", "DNS query error", "protocol error"]
  },
  {
    slug: "notimpl",
    code: "NOTIMPL",
    title: "NOTIMPL: DNS Feature Not Implemented",
    description: "The requested DNS operation is not supported by the server",
    metaDescription: "Understand NOTIMPL DNS errors. Learn why servers return 'not implemented' and how to work around it.",
    causes: [
      "Unsupported DNS query type",
      "Server doesn't support the requested operation",
      "Older DNS server software",
      "Experimental or deprecated features requested",
      "Server configuration disabling certain features"
    ],
    solutions: [
      "Use standard, widely-supported query types",
      "Try a different DNS resolver",
      "Check if the feature is available on other servers",
      "Contact DNS provider about feature support",
      "Use alternative methods for the same result"
    ],
    technicalDetails: "NOTIMPL (Not Implemented) is DNS RCODE 4, indicating the server doesn't support the requested operation. This is uncommon and typically occurs when using advanced or experimental DNS features.",
    relatedErrors: ["formerr", "refused"],
    keywords: ["NOTIMPL", "not implemented", "unsupported DNS", "DNS feature", "operation not supported"]
  },
  {
    slug: "cname-loop",
    code: "CNAME Loop",
    title: "CNAME Loop: How to Detect & Fix Circular DNS References",
    description: "DNS records form a circular reference that never resolves",
    metaDescription: "Fix CNAME loop errors in DNS. Learn how circular references happen and step-by-step solutions to break the loop.",
    causes: [
      "CNAME record points to another CNAME that points back",
      "Misconfigured DNS migration",
      "Typo creating unintended circular reference",
      "Third-party service misconfiguration",
      "Copy-paste error in DNS records"
    ],
    solutions: [
      "Map out your CNAME chain to find the loop",
      "Replace one CNAME with an A/AAAA record",
      "Remove the circular reference",
      "Contact third-party service if they control the records",
      "Use our DNS checker to trace the full chain"
    ],
    technicalDetails: "A CNAME loop occurs when following CNAME records leads back to a previously visited name. Resolvers detect this and return SERVFAIL after hitting a loop limit (typically 8-16 hops). The RFC prohibits CNAME at zone apex partly to prevent such issues.",
    relatedErrors: ["servfail", "noerror-empty"],
    keywords: ["CNAME loop", "circular DNS", "CNAME chain", "infinite loop DNS", "alias loop"]
  },
  {
    slug: "dnssec-validation-failed",
    code: "DNSSEC Validation Failed",
    title: "DNSSEC Validation Failed: Signature & Chain of Trust Errors",
    description: "DNSSEC signatures could not be verified",
    metaDescription: "Troubleshoot DNSSEC validation failures. Fix signature errors, expired keys, and broken chain of trust issues.",
    causes: [
      "DNSSEC signatures have expired",
      "DS record doesn't match DNSKEY",
      "Missing or incorrect RRSIG records",
      "Clock skew between servers",
      "Zone resigned but DS not updated at parent"
    ],
    solutions: [
      "Check if DNSSEC keys need rotation",
      "Verify DS record matches current DNSKEY",
      "Ensure zone signing is properly configured",
      "Sync server clocks with NTP",
      "Update DS record at registrar after key rollover"
    ],
    technicalDetails: "DNSSEC validation fails when the resolver cannot verify the cryptographic chain of trust from the root zone to the queried domain. This results in SERVFAIL from validating resolvers. Common issues include expired signatures (RRSIG), mismatched DS/DNSKEY pairs, or missing records.",
    relatedErrors: ["servfail", "ds-mismatch"],
    keywords: ["DNSSEC failed", "validation error", "RRSIG expired", "chain of trust", "signature error"]
  },
  {
    slug: "network-unreachable",
    code: "Network Unreachable",
    title: "Network Unreachable DNS Error: Connectivity Troubleshooting",
    description: "Cannot establish network connection to DNS server",
    metaDescription: "Fix 'network unreachable' DNS errors. Diagnose connectivity issues preventing DNS resolution.",
    causes: [
      "No internet connectivity",
      "DNS server IP is unreachable",
      "Routing issues in your network",
      "ISP blocking DNS traffic",
      "VPN or proxy misconfiguration"
    ],
    solutions: [
      "Check your internet connection",
      "Try pinging the DNS server IP",
      "Use a different DNS resolver",
      "Disable VPN/proxy temporarily",
      "Check with your ISP if DNS is blocked"
    ],
    technicalDetails: "Network unreachable indicates an ICMP 'Destination Unreachable' response or inability to route packets to the DNS server. This is a network-layer issue, not a DNS protocol error. Troubleshoot using ping, traceroute, and checking routing tables.",
    relatedErrors: ["timeout", "connection-refused"],
    keywords: ["network unreachable", "DNS connectivity", "no route", "can't reach DNS", "network error"]
  },
  {
    slug: "connection-refused",
    code: "Connection Refused",
    title: "Connection Refused: DNS Server Port Closed",
    description: "The DNS server actively rejected the connection",
    metaDescription: "Troubleshoot 'connection refused' DNS errors. Fix issues when DNS servers reject your queries.",
    causes: [
      "DNS service not running on the server",
      "Server listening on different port",
      "Firewall rejecting connections",
      "Server at capacity/overloaded",
      "Wrong IP address for DNS server"
    ],
    solutions: [
      "Verify the DNS server address is correct",
      "Check if the DNS service is running",
      "Try port 53 on both UDP and TCP",
      "Use an alternative DNS resolver",
      "Contact server administrator"
    ],
    technicalDetails: "Connection refused (TCP RST or ICMP port unreachable for UDP) means the target host received the packet but has no service listening on port 53. This differs from timeout (no response) and indicates the server is reachable but DNS isn't running.",
    relatedErrors: ["timeout", "network-unreachable"],
    keywords: ["connection refused", "port closed", "DNS not running", "port 53 closed", "service unavailable"]
  },
  {
    slug: "truncated-response",
    code: "Truncated Response",
    title: "Truncated DNS Response: When UDP Isn't Enough",
    description: "DNS response was too large for UDP and was truncated",
    metaDescription: "Handle truncated DNS responses. Learn when to use TCP for DNS and how large responses work.",
    causes: [
      "Response exceeds 512 bytes (traditional limit)",
      "Response exceeds EDNS buffer size",
      "Many records in the answer section",
      "DNSSEC signatures adding size",
      "Client not supporting EDNS"
    ],
    solutions: [
      "Enable TCP fallback in your resolver",
      "Increase EDNS buffer size",
      "Reduce number of records if possible",
      "Use a resolver that handles TCP automatically",
      "Check if intermediate devices truncate responses"
    ],
    technicalDetails: "The TC (truncation) flag in DNS headers indicates the response was larger than could fit in UDP. Traditional DNS limited responses to 512 bytes; EDNS0 extended this. Clients seeing TC=1 should retry over TCP to get the complete response.",
    relatedErrors: ["timeout", "edns-failure"],
    keywords: ["truncated DNS", "TC flag", "UDP too small", "DNS over TCP", "response too large"]
  },
  {
    slug: "soa-mismatch",
    code: "SOA Mismatch",
    title: "SOA Mismatch: Zone Transfer & Replication Issues",
    description: "Start of Authority records don't match across nameservers",
    metaDescription: "Diagnose SOA mismatch problems. Fix zone synchronization issues between primary and secondary DNS servers.",
    causes: [
      "Zone transfer (AXFR/IXFR) failing",
      "Secondary nameserver out of sync",
      "SOA serial not incrementing on changes",
      "Network issues blocking zone transfers",
      "Misconfigured notify settings"
    ],
    solutions: [
      "Check zone transfer logs on secondary servers",
      "Verify network allows traffic on port 53 TCP",
      "Increment SOA serial after zone changes",
      "Review AXFR/IXFR permissions",
      "Force zone transfer manually to sync"
    ],
    technicalDetails: "SOA (Start of Authority) records contain the serial number used to track zone versions. When secondaries have different serials than the primary, zone data may be inconsistent. The REFRESH/RETRY/EXPIRE timers in SOA control sync behavior.",
    relatedErrors: ["servfail", "stale-records"],
    keywords: ["SOA mismatch", "zone transfer", "serial mismatch", "AXFR failed", "secondary sync"]
  },
  {
    slug: "ttl-expired",
    code: "Stale/Expired TTL",
    title: "Stale DNS Records: TTL Expiration & Cache Issues",
    description: "Cached DNS records have expired and may be returning stale data",
    metaDescription: "Understand DNS TTL and cache expiration. Learn how stale records affect resolution and how to force updates.",
    causes: [
      "DNS cache serving expired records",
      "Resolver not refreshing expired entries",
      "Network issues preventing updates",
      "Aggressive caching by ISP resolvers",
      "Browser or OS cache not clearing"
    ],
    solutions: [
      "Flush local DNS cache (ipconfig /flushdns)",
      "Use a different DNS resolver",
      "Clear browser cache",
      "Wait for TTL to expire naturally",
      "Use our tool to check authoritative servers directly"
    ],
    technicalDetails: "TTL (Time To Live) determines how long resolvers cache records. After expiration, resolvers should re-query authoritative servers. Some resolvers serve stale data during outages (RFC 8767). Lower TTLs mean faster propagation but more queries.",
    relatedErrors: ["timeout", "noerror-empty"],
    keywords: ["TTL expired", "stale DNS", "cache refresh", "old DNS records", "DNS propagation"]
  },
  {
    slug: "lame-delegation",
    code: "Lame Delegation",
    title: "Lame Delegation: When Nameservers Don't Answer for Your Domain",
    description: "Nameservers listed for domain don't actually serve its zone",
    metaDescription: "Fix lame delegation DNS issues. Diagnose when nameservers don't respond authoritatively for your domain.",
    causes: [
      "Nameserver removed but NS records not updated",
      "Zone file deleted from nameserver",
      "Wrong nameservers specified at registrar",
      "DNS provider account expired",
      "Migration incomplete between providers"
    ],
    solutions: [
      "Verify each nameserver responds for your domain",
      "Update NS records to correct nameservers",
      "Ensure zone file exists on all listed servers",
      "Complete DNS migration properly",
      "Remove defunct nameservers from NS records"
    ],
    technicalDetails: "Lame delegation occurs when NS records point to a server that doesn't have authoritative data for the zone. The server may respond with REFUSED, SERVFAIL, or refer to other servers. This breaks resolution for the domain.",
    relatedErrors: ["servfail", "refused", "nxdomain"],
    keywords: ["lame delegation", "lame server", "nameserver not authoritative", "bad NS record", "delegation broken"]
  },
  {
    slug: "missing-glue",
    code: "Missing Glue Records",
    title: "Missing Glue Records: Nameserver Resolution Chicken-and-Egg",
    description: "Glue records missing for in-domain nameservers",
    metaDescription: "Fix missing glue record errors. Understand why in-domain nameservers need glue and how to add them.",
    causes: [
      "Using ns1.yourdomain.com without glue A records",
      "Glue records deleted at parent zone",
      "Registrar not properly setting glue records",
      "IPv6 glue (AAAA) missing",
      "Glue IP addresses outdated"
    ],
    solutions: [
      "Add glue records at your registrar",
      "Provide both A and AAAA glue records",
      "Update glue IPs when nameserver IPs change",
      "Use external nameservers to avoid glue requirement",
      "Verify glue at parent zone with dig +trace"
    ],
    technicalDetails: "When a nameserver hostname is under the zone it serves (e.g., ns1.example.com for example.com), resolvers need 'glue' A/AAAA records in the parent zone to break the circular dependency. Without glue, resolution cannot proceed.",
    relatedErrors: ["servfail", "lame-delegation"],
    keywords: ["glue records", "missing glue", "in-domain nameserver", "circular dependency", "NS glue"]
  },
  {
    slug: "spf-permerror",
    code: "SPF PermError",
    title: "SPF PermError: Permanent Validation Errors in Email Authentication",
    description: "SPF record contains syntax errors or exceeds lookup limits",
    metaDescription: "Fix SPF PermError issues. Troubleshoot syntax errors, DNS lookup limits, and email authentication failures.",
    causes: [
      "SPF record has syntax errors",
      "More than 10 DNS lookups in SPF chain",
      "Invalid mechanisms or modifiers",
      "Multiple SPF records for same domain",
      "Circular include references"
    ],
    solutions: [
      "Validate SPF syntax with our TXT record checker",
      "Flatten SPF to reduce DNS lookups under 10",
      "Merge multiple SPF records into one",
      "Remove duplicate or conflicting mechanisms",
      "Use ip4/ip6 instead of include when possible"
    ],
    technicalDetails: "SPF PermError (permanent error) occurs when the SPF record cannot be evaluated due to syntax errors or exceeding the 10 DNS lookup limit (RFC 7208). This typically results in neutral/fail outcomes for email authentication.",
    relatedErrors: ["spf-temperror", "dmarc-failure"],
    keywords: ["SPF PermError", "SPF syntax error", "too many DNS lookups", "SPF record invalid", "email authentication"]
  },
  {
    slug: "dkim-signature-invalid",
    code: "DKIM Signature Invalid",
    title: "DKIM Signature Invalid: Email Signature Verification Failures",
    description: "DKIM signature cannot be verified against the public key",
    metaDescription: "Fix DKIM signature failures. Troubleshoot invalid signatures, missing keys, and email authentication issues.",
    causes: [
      "DKIM public key missing from DNS",
      "Key selector incorrect in email headers",
      "Email body modified in transit",
      "Signature algorithm mismatch",
      "Key rotation not completed properly"
    ],
    solutions: [
      "Verify DKIM TXT record exists at selector._domainkey.domain",
      "Check key matches signature algorithm (rsa-sha256)",
      "Ensure email not modified after signing",
      "Update selector if key was rotated",
      "Test with our MX record and TXT checker"
    ],
    technicalDetails: "DKIM verification fails when the signature in the email header cannot be validated against the public key in DNS, or when the signed content has changed. The d= and s= tags identify the domain and selector for key lookup.",
    relatedErrors: ["spf-permerror", "dmarc-failure"],
    keywords: ["DKIM invalid", "DKIM signature failed", "email signature", "DKIM key missing", "selector not found"]
  },
  {
    slug: "dmarc-failure",
    code: "DMARC Failure",
    title: "DMARC Failure: Email Authentication Policy Violations",
    description: "Email failed both SPF and DKIM alignment checks",
    metaDescription: "Troubleshoot DMARC failures. Fix SPF/DKIM alignment issues and improve email deliverability.",
    causes: [
      "SPF alignment failed (envelope From mismatch)",
      "DKIM alignment failed (d= domain mismatch)",
      "Both SPF and DKIM completely failed",
      "Forwarded email breaking authentication",
      "Third-party sender not properly configured"
    ],
    solutions: [
      "Ensure SPF includes all sending IPs",
      "Configure DKIM for all email sources",
      "Set up alignment (relaxed vs strict)",
      "Add legitimate senders to SPF/DKIM",
      "Use DMARC reports to identify failures"
    ],
    technicalDetails: "DMARC requires either SPF or DKIM to pass AND align with the From header domain. Alignment can be strict (exact match) or relaxed (organizational domain match). Failures result in actions specified by the p= policy (none, quarantine, reject).",
    relatedErrors: ["spf-permerror", "dkim-signature-invalid"],
    keywords: ["DMARC failed", "email authentication", "SPF alignment", "DKIM alignment", "email rejected"]
  },
  {
    slug: "ptr-missing",
    code: "Missing PTR Record",
    title: "Missing PTR Record: Reverse DNS Lookup Failures",
    description: "No PTR record exists for the IP address",
    metaDescription: "Fix missing PTR record issues. Set up reverse DNS for email servers and troubleshoot rDNS problems.",
    causes: [
      "PTR record never created",
      "IP address recently assigned",
      "Hosting provider manages reverse DNS",
      "PTR at wrong reverse zone",
      "ISP doesn't allow custom PTR records"
    ],
    solutions: [
      "Request PTR record from your IP provider/ISP",
      "For cloud hosting, configure in provider dashboard",
      "Ensure PTR matches server's forward A record",
      "Wait for propagation after adding PTR",
      "Contact ISP if they manage your reverse zone"
    ],
    technicalDetails: "PTR records map IP addresses to hostnames (reverse of A records). They're stored in .in-addr.arpa (IPv4) or .ip6.arpa (IPv6) zones. Missing PTR is common cause of email delivery issues as many servers check reverse DNS.",
    relatedErrors: ["ptr-mismatch", "timeout"],
    keywords: ["PTR missing", "reverse DNS", "rDNS", "no PTR record", "email bounce PTR"]
  }
];

export function getDnsErrorBySlug(slug: string): DnsError | undefined {
  return dnsErrors.find(error => error.slug === slug);
}

export function getAllDnsErrorSlugs(): string[] {
  return dnsErrors.map(error => error.slug);
}
