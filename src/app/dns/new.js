import * as dgram from "dgram";
import DNSHeaderJs from "./parts/headers.js";
import DNSQuestionJs from "./parts/question.js";
import {DNSType, DNSClass} from "./parts/question.js";
import {OpCode, ResponseCode} from "./parts/headers.js";
import DNSAnswerJs from "./parts/answer.js";
// import DNSHeader, {OpCode, ResponseCode, TDNSHeader} from "./parts/headers";
// import DNSQuestion, {DNSClass, DNSType, IDNSQuestion} from "./parts/question";
// import {DNSClass} from "./parts/question.js";
// import {ResponseCode} from "./parts/headers.js";
// import DNSAnswer, {IDNSAnswer} from "./parts/answer";
const port = 53;

const defaultHeader = {
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

const defaultQuestion = {
  name: "codecrafters.io",
  classCode: DNSClass.IN,
  type: DNSType.A,
};

const defaultAnswer = {
  name: "codecrafeters.io",
  type: DNSType.A,
  className: DNSClass.IN,
  ttl: 60,
  data: "\x08\x08\x08\x08",
};

const udpSocket = dgram.createSocket("udp4");

udpSocket.on("message", (data, remoteAddr) => {
  try {
    console.log(`Received data from ${remoteAddr.address}:${remoteAddr.port}`);
    const question = DNSQuestionJs.write([defaultQuestion]);
    const header = DNSHeaderJs.write({
      ...defaultHeader,
      qdcount: 1,
      ancount: 1,
    });
    const answer = DNSAnswerJs.write([defaultAnswer]);
    const response = Buffer.concat([header, question, answer]);
    console.log(`Header buffer is thsi : ${header}`);
    udpSocket.send(response, remoteAddr.port, remoteAddr.address);
  } catch (error) {
    console.log(`Error sending data: ${error}`);
  }
});

udpSocket.bind(port, () => console.log(`DNS Server is running on ${port}`));
