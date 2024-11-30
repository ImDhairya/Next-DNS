console.log("Kaisan ba");

// {}, [], ()

let a = [1, 23, 4, 5];

let b = a;

a.pop();
console.log(a, b);
// perfect days
// i saw the tv glow

let c = 12;
let array = [1, 2, 3, 4, {name: "gugu", type: "ksi"}, 5, "DHairYA"];

let arr1: [string, number] = ["dhairya", 53];

// below is wrong

// let arr2: [ boolean,string] = ["dhairya", false];

// now its right
let arr2: [string, boolean] = ["dhairya", false];

enum UserRoles {
  Admin = "ADMIN",
  GUEST = "guest",
  SUPER_ADMIN = "supperman",
}
// blank space
console.log(UserRoles.SUPER_ADMIN);

let giyan: number;
giyan = 32;
// giyan = false;

function abcd1(): string {
  console.log("function abcd printed");
  return "dhairya";
}

// function pqrs(): never {
//   console.log("kaisan ba");
//   // while (true) {}
// }
// pqrs();
