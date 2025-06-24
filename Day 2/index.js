const test = "test"
console.log(test);

const arr = [1, 2, 3, 4, 5];
console.log(arr[2]*2);

let person = {
    name: "John",
    age: 30
}

console.log(person.name);
console.log(person.age);

const dataUser = [
    {
        name: "Alice",
        age: 25
    },
    {
        name: "Bob",
        age: 28
    }
];
console.log(dataUser[1].name);
console.log(dataUser[0].age);
console.log(dataUser[0].name + " is " + dataUser[0].age + " years old.");

function greet(name) {
    return "Hello, " + name + "!";
}
console.log(greet("Alice"));

function add(a, b,c) {
    return a + b + c;
}
console.log(add(5, 10));
console.log(add(20, "30", 5));
