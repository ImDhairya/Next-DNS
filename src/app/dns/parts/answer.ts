import {DNSClass, DNSType} from "./question";

export interface IDNSAnswer {
  name: string;
  type: DNSType;
  className: DNSClass;
  ttl: number;
  // length: number;
  data: string;
}

class DNSAnswer {
  static write(answer: IDNSAnswer[]) {
    return Buffer.concat(
      answer.map((ans) => {
        const buffer = Buffer.alloc(10);
        const {name, type, className, ttl, data} = ans;

        const str = name
          .split(".")
          .map((e) => `${String.fromCharCode(e.length)}${e}`)
          .join("");

        buffer.writeInt16BE(type);
        buffer.writeInt16BE(className, 2);
        buffer.writeInt32BE(ttl, 4);
        buffer.writeInt16BE(data.length, 6);

        return Buffer.concat([
          Buffer.from(str + "\0" + "binary"),
          buffer,
          Buffer.from(data + "\0", "binary"),
        ]);
      })
    );
  }
}

export default DNSAnswer;
