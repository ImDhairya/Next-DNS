class DNSParser {
  static parseHeader(buffer) {
    const id = buffer.readUint16BE(0);
    const flags = buffer.readUint16BE(2);

    const qr = (flags >> 15) & 1; // QR flag (1 bit)
    const opcode = (flags >> 11) & 0xf; // Opcode (4 bits)
    const aa = (flags >> 10) & 1; // Authoritative Answer (1 bit)
    const tc = (flags >> 9) & 1; // Truncated (1 bit)
    const rd = (flags >> 8) & 1; // Recursion Desired (1 bit)
    const ra = (flags >> 7) & 1; // Recursion Available (1 bit)
    const z = (flags >> 4) & 7; // Reserved (3 bits)
    const rcode = flags & 0xf; // Response code (4 bits)

    const qdcount = buffer.readUint16BE(4);
    const ancount = buffer.readUint16BE(6);
    const nscount = buffer.readUint16BE(8);
    const arcount = buffer.readUint16BE(10);

    return {
      id,
      qr,
      opcode,
      aa,
      tc,
      rd,
      ra,
      z,
      rcode,
      qdcount,
      ancount,
      nscount,
      arcount,
    };
  }

  static parseQuestion(buffer) {
    let qname = "";
    let offset = 0;
    let length = buffer[offset];

    while (length > 0) {
      qname +=
        buffer.slice(offset + 1, offset + 1 + length).toString("ascii") + ".";
      offset += length + 1;
      length = buffer[offset];
    }

    qname = qname.slice(0, -1);

    const qtype = buffer.readUint16BE(offset + 1);
    const qclass = buffer.readUint16BE(offset + 3);

    return {name: qname, type: qtype, classCode: qclass};
  }
}
const receivedHeaderBuffer = Buffer.from([
  // ID (1234)
  0x12, 0x34,
  // Flags (0x8000)
  0x80, 0x00,
  // QDCOUNT (1)
  0x00, 0x01,
  // ANCOUNT (0)
  0x00, 0x00,
  // NSCOUNT (0)
  0x00, 0x00,
  // ARCOUNT (0)
  0x00, 0x00,
]);

const receivedQuestionBuffer = Buffer.from([
  // Question name (example.com)
  0x07,
  0x65,
  0x78,
  0x61,
  0x6d,
  0x70,
  0x6c,
  0x65, // "example"
  0x03,
  0x63,
  0x6f,
  0x6d, // ".com"
  0x00, // End of name
  // QTYPE (A)
  0x00,
  0x01,
  // QCLASS (IN)
  0x00,
  0x01,
]);
const parsedHeader = DNSParser.parseHeader(receivedHeaderBuffer);
const parsedQuestion = DNSParser.parseQuestion(receivedQuestionBuffer, 12);

// console.log(parsedQuestion)
console.log(parsedHeader);
console.log(parsedQuestion);
