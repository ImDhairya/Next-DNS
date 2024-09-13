import * as dgram from "dgram";
import DNSHeader, {OpCode, ResponseCode, TDNSHeader} from "./parts/headers";
import DNSQuestion, {DNSClass, DNSType, IDNSQuestion} from "./parts/question";
import DNSAnswer, {IDNSAnswer} from "./parts/answer";
const port = 53;

const defaultHeader: TDNSHeader = {
  id: 1234,
  qr: 1,
  opcode: OpCode.STANDARD_QUERY,
  aa: 0,
  ra: 0,
  tc: 0,
  rd: 0,
  z: 0,
  rcode: ResponseCode.NO_ERROR,
  qdcount: 0,
  ancount: 0,
  nscount: 0,
  arcount: 0,
};

const defaultQuestion: IDNSQuestion = {
  name: "codecrafters.io",
  classCode: DNSClass.IN,
  type: DNSType.A,
};

const defaultAnswer: IDNSAnswer = {
  name: "codecrafeters",
  type: DNSType.A,
  className: DNSClass.IN,
  ttl: 60,
  data: "1.2.3.4",
};

const udpSocket: dgram.Socket = dgram.createSocket("udp4");

udpSocket.on("message", (data: Buffer, remoteAddr: dgram.RemoteInfo) => {
  try {
    console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`);
    const header = DNSHeader.write({...defaultHeader, qdcount: 1, ancount: 1});
    const question = DNSQuestion.write([defaultQuestion]);
    const answer = DNSAnswer.write([defaultAnswer]);
    const response = Buffer.concat([header, question, answer]);
    udpSocket.send(response, remoteAddr.port, remoteAddr.address);
  } catch (error) {
    console.log(`Error sending data: ${error}`);
  }
});

udpSocket.bind(port, "127.0.0.1");
// udpSocket.bind(port, () => console.log("DNS Server is running on port 53"));
