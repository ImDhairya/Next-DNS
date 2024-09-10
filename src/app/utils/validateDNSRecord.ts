import {DnsRecordType} from "./DNSRecord";

export function isValidDnsRecord(recordType: string) {
  const validRecordTypes: DnsRecordType[] = [
    "A",
    "AAAA",
    "CNAME",
    "MX",
    "NS",
    "PTR",
    "SOA",
    "SRV",
    "TXT",
    "CAA",
    "DS",
    "DNSKEY",
    "RRSIG",
    "NSEC",
    "NAPTR",
    "HINFO",
    "RP",
    "TLSA",
    "SSHFP",
    "OPT",
    "SPF",
    "LOC",
    "DNAME",
  ];

  return validRecordTypes.includes(recordType.split(" ")[0] as DnsRecordType);
}
