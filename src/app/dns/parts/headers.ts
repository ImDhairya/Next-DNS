export enum OpCode {
  STANDARD_QUERY = 0,
}

export enum ResponseCode {
  NO_ERROR = 0,
  FORMAT_ERROR = 1,
}

export interface TDNSHeader {
  id: number;
  qr: number;
  opcode: OpCode;
  aa: number;
  tc: number;
  rd: number;
  ra: number;
  z: number;
  rcode: ResponseCode;
  qdcount: number;
  ancount: number;
  nscount: number;
  arcount: number;
}

class DNSHeader {
  static write(values: TDNSHeader) {
    const header = Buffer.alloc(12);
    const flags =
      ((values.qr & 1) << 15) | // QR (1 bit) - most significant bit
      ((values.opcode & 0xf) << 11) | // Opcode (4 bits)
      ((values.aa & 1) << 10) | // AA (1 bit)
      ((values.tc & 1) << 9) | // TC (1 bit)
      ((values.rd & 1) << 8) | // RD (1 bit)
      ((values.ra & 1) << 7) | // RA (1 bit)
      ((values.z & 7) << 4) | // Z (3 bits)
      (values.rcode & 0xf); // RCODE (4 bits)

    header.writeUint16BE(values.id, 0);
    header.writeUint16BE(flags, 2);
    header.writeUint16BE(values.qdcount, 4);
    header.writeUint16BE(values.ancount, 6);
    header.writeUint16BE(values.nscount, 8);
    header.writeUint16BE(values.arcount, 10);

    return header;
  }
}

export default DNSHeader;
