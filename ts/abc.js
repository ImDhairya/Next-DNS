"use strict";
console.log("Kaisan ba");
// {}, [], ()
let a = [1, 23, 4, 5];
let b = a;
a.pop();
console.log(a, b);
// perfect days
// i saw the tv glow
let c = 12;
let array = [1, 2, 3, 4, { name: "gugu", type: "ksi" }, 5, "DHairYA"];
let arr1 = ["dhairya", 53];
// below is wrong
// let arr2: [ boolean,string] = ["dhairya", false];
// now its right
let arr2 = ["dhairya", false];
var UserRoles;
(function (UserRoles) {
    UserRoles["Admin"] = "ADMIN";
    UserRoles["GUEST"] = "guest";
    UserRoles["SUPER_ADMIN"] = "supperman";
})(UserRoles || (UserRoles = {}));
// blank space
console.log(UserRoles.SUPER_ADMIN);
let giyan;
giyan = 32;
// giyan = false;
function abcd1() {
    console.log("function abcd printed");
    return "dhairya";
}
// function pqrs(): never {
//   console.log("kaisan ba");
//   // while (true) {}
// }
// pqrs();
