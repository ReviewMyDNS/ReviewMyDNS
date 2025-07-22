import { promises as dns } from 'dns';
import { DnsRecordType } from '@shared/schema';

export interface DnsQueryResult {
  success: boolean;
  response?: string;
  error?: string;
  responseTime: number;
}

export class DnsResolver {
  private resolver: dns.Resolver;

  constructor(dnsServerIp: string) {
    this.resolver = new dns.Resolver();
    this.resolver.setServers([dnsServerIp]);
  }

  async queryRecord(domain: string, recordType: DnsRecordType): Promise<DnsQueryResult> {
    const startTime = Date.now();
    
    try {
      let response: string;
      
      switch (recordType) {
        case 'A':
          const aRecords = await this.resolver.resolve4(domain);
          response = aRecords.join(', ');
          break;
          
        case 'AAAA':
          const aaaaRecords = await this.resolver.resolve6(domain);
          response = aaaaRecords.join(', ');
          break;
          
        case 'CNAME':
          const cnameRecords = await this.resolver.resolveCname(domain);
          response = cnameRecords.join(', ');
          break;
          
        case 'MX':
          const mxRecords = await this.resolver.resolveMx(domain);
          response = mxRecords
            .sort((a, b) => a.priority - b.priority)
            .map(record => `${record.priority} ${record.exchange}`)
            .join(', ');
          break;
          
        case 'NS':
          const nsRecords = await this.resolver.resolveNs(domain);
          response = nsRecords.join(', ');
          break;
          
        case 'TXT':
          const txtRecords = await this.resolver.resolveTxt(domain);
          response = txtRecords.map(record => record.join('')).join(', ');
          break;
          
        case 'SOA':
          const soaRecord = await this.resolver.resolveSoa(domain);
          response = `${soaRecord.nsname} ${soaRecord.hostmaster} ${soaRecord.serial} ${soaRecord.refresh} ${soaRecord.retry} ${soaRecord.expire} ${soaRecord.minttl}`;
          break;
          
        case 'PTR':
          const ptrRecords = await this.resolver.resolvePtr(domain);
          response = ptrRecords.join(', ');
          break;
          
        case 'SRV':
          const srvRecords = await this.resolver.resolveSrv(domain);
          response = srvRecords
            .map(record => `${record.priority} ${record.weight} ${record.port} ${record.name}`)
            .join(', ');
          break;
          
        case 'CAA':
          const caaRecords = await this.resolver.resolveCaa(domain);
          response = caaRecords
            .map(record => `${record.critical} ${record.issue || record.issuewild || 'unknown'} ${record.value}`)
            .join(', ');
          break;
          
        default:
          // For DS and DNSKEY, we'll use a generic resolve
          try {
            const anyRecords = await this.resolver.resolveAny(domain);
            const filteredRecords = anyRecords.filter(record => record.type === recordType);
            response = filteredRecords.length > 0 ? JSON.stringify(filteredRecords) : 'No records found';
          } catch {
            response = 'Record type not supported';
          }
          break;
      }
      
      const responseTime = Date.now() - startTime;
      return {
        success: true,
        response,
        responseTime
      };
      
    } catch (error: any) {
      const responseTime = Date.now() - startTime;
      return {
        success: false,
        error: error.message || 'DNS query failed',
        responseTime
      };
    }
  }
}

export async function performDnsLookup(
  domain: string,
  recordType: DnsRecordType,
  dnsServers: Array<{ id: number; ip: string }>
): Promise<Array<{ serverId: number; result: DnsQueryResult }>> {
  const results: Array<{ serverId: number; result: DnsQueryResult }> = [];
  
  // Create promises for all DNS queries
  const queryPromises = dnsServers.map(async server => {
    try {
      const resolver = new DnsResolver(server.ip);
      const result = await resolver.queryRecord(domain, recordType);
      return { serverId: server.id, result };
    } catch (error) {
      return {
        serverId: server.id,
        result: {
          success: false,
          error: 'Failed to create resolver',
          responseTime: 0
        }
      };
    }
  });
  
  // Wait for all queries to complete (or timeout)
  const settledResults = await Promise.allSettled(queryPromises);
  
  settledResults.forEach(settledResult => {
    if (settledResult.status === 'fulfilled') {
      results.push(settledResult.value);
    } else {
      // This shouldn't happen since we handle errors in the promise itself
      console.error('Unexpected promise rejection:', settledResult.reason);
    }
  });
  
  return results;
}
