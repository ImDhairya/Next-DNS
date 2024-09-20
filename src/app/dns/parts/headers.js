import {buffer} from "stream/consumers";

export const OpCode = {
  STANDARD_QUERY: 0,
};

export const ResponseCode = {
  NO_ERROR: 0,  
  FORMAT_ERROR: 1,
};

class DNSHeaderJs {
  static write(values) {
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
    header.writeUInt16BE(flags, 2);
    header.writeUint16BE(values.qdcount, 4);
    header.writeUint16BE(values.ancount, 6);
    header.writeUint16BE(values.nscount, 8);
    header.writeUint16BE(values.arcount, 10);
    console.log(header, "Bhaisaab dekh lo ye hai header");
    return header;
  }
}

export default DNSHeaderJs;
