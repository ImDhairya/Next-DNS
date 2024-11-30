console.log("This is type inferance for ts");

// ts will use its own brain, to infer the datatype what is the datatype of this bullshit let me see says typescript
let m = 12;

let n: number | boolean | string;

n = 34234;
n = false;
n = "dalloh";
console.log(n);

function investigativeStudy(value: string) {
  const a = Math.random();
  console.log(value);
  console.log(a);
  return a;
}
investigativeStudy("423");

interface ObjType {
  name: string;
  age: number;
  time: number;
  lastName: string;
  gender?: string;
}
function getDataOfUser(obj: ObjType) {
  console.log(obj);
}
getDataOfUser({
  name: "dhairyaPandya",
  age: 342,
  gender: "faltu",
  lastName: "pandya",
  time: Date.now(),
});
