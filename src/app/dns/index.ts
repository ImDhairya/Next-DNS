import dgram from "node:dgram";
import dnsPacket from "dns-packet";

type DnsRecordType = "A" | "CNAME" | "NS" | "TXT"; // Extend with other DNS types as needed

interface DnsAnswerBase {
  class: "IN"; // Internet class
  name: string; // Domain name
  data: string; // Could be an IP address, domain, or other depending on the record type
}

interface ARecordAnswer extends DnsAnswerBase {
  type: "A"; // A record
  data: string; // IPv4 address for 'A' record
}

interface CnameRecordAnswer extends DnsAnswerBase {
  type: "CNAME"; // CNAME record
  data: string; // Canonical name
}

interface NsRecordAnswer extends DnsAnswerBase {
  type: "NS"; // NS record
  data: string; // Name server
}

interface TxtRecordAnswer extends DnsAnswerBase {
  type: "TXT"; // TXT record
  data: string; // Text data
}

// Union type for all possible DNS answer types
type DnsAnswer =
  | ARecordAnswer
  | CnameRecordAnswer
  | NsRecordAnswer
  | TxtRecordAnswer;

const server = dgram.createSocket("udp4");
const port = 53;

interface DNSRecord {
  type: string;
  data: string;
}

const db: Record<string, DNSRecord> = {
  "dhairya.dev": {
    type: "A",
    data: "1.2.3.4",
  },
  "kabir.dev": {
    type: "CNAME",
    data: "saquib.com",
  },
};

server.on("message", (msg: Buffer, rinfo: dgram.RemoteInfo) => {
  const incomingReq = dnsPacket.decode(msg);
  const ipFromDb = db[incomingReq.questions![0].name];

  const ans = dnsPacket.encode({
    type: "response",
    id: incomingReq.id,
    flags: dnsPacket.AUTHORITATIVE_ANSWER,
    questions: incomingReq.questions,
    answers: [
      {
        type: ipFromDb.type,
        class: "IN",
        name: incomingReq.questions![0].name,
        data: ipFromDb.data,
      } as DnsAnswer,
    ],
  });
  server.send(ans, rinfo.port, rinfo.address);
});

server.bind(port, () => console.log("DNS Server is running on port 53"));
