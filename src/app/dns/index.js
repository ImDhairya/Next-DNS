import dgram from "node:dgram";
import dnsPacket from "dns-packet";
const server = dgram.createSocket("udp4");
const port = 53;

const db = {
  "dhairya.dev": {
    type: "A",
    data: "1.2.3.4",
  },
  "kabir.dev": {
    type: "CNAME",
    data: "saquib.com",
  },
};

server.on("message", (msg, rinfo) => {
  const incomingReq = dnsPacket.decode(msg);
  const ipFromDb = db[incomingReq.questions[0].name];

  const ans = dnsPacket.encode({
    type: "response",
    id: incomingReq.id,
    flags: dnsPacket.AUTHORITATIVE_ANSWER,
    questions: incomingReq.questions,
    answers: [
      {
        type: ipFromDb.type,
        class: "IN",
        name: incomingReq.questions[0].name,
        data: ipFromDb.data,
      },
    ],
  });
  server.send(ans, rinfo.port, rinfo.address);
});

server.bind(53, () => console.log("DNS Server is running on port 53"));
