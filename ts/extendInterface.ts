interface User {
  name: string;
  email: string;
  password: string;
}

interface Admin extends User {
  admin?: boolean;
}

function amPM(obj: Admin) {
  console.log(obj);
}
amPM({
  name: "dhairya",
  email: "pandya#gamil.com",
  password: "teri toh ",
  admin: false,
});

// if 2 interfaces of same name are there they are merged and combined to a single interface which contains the properties of both the interfaces

interface Abcd {
  name: string;
}

interface Abcd {
  age: number;
}

function abcd(obj: Abcd) {
  obj.name;
  obj.age;
  console.log(obj.name, obj.age);
}

abcd({name: "dhairya", age: 32});
