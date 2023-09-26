// function overloading

// function overloading: function have the same name, same amount of different amount of parameter, different type  and return type
function total(a: number, b: number): number;
function total(a: string, b: string): string;
function total(a: any, b: any) {
  return a + b;
}
total(5, 7); //12
total('trunks', 'is develop');

interface Coordinate {
  x: number;
  y: number;
}
// {x:number}
function parseCoodinate(obj: Coordinate): Coordinate;
// x:10, y:20
function parseCoodinate(x: number, y: number): Coordinate;
function parseCoodinate(arg1: any, arg2?: any): Coordinate {
  let coord = {
    x: arg1 as number,
    y: arg2 as number,
  };
  if (typeof arg1 === 'object') {
    coord = {
      ...(arg1 as Coordinate),
    };
  } else {
    coord = {
      x: arg1 as number,
      y: arg2 as number,
    };
  }
  return coord;
}

// Normal function
function addNumbers(a: number, b: number): number {
  return a + b;
}
// Arrow function
const addStrings = (x: string, y: string): string => {
  return `${x}${y}`;
};
// Default parameters
function addNumberDefaultParams(a: number = 10, b: number = 20): number {
  return a + b;
}

addNumberDefaultParams(); //30
//Union Types
function format(title: string, description: string, amount: string | number) {
  return `${title} ${description} ${amount}`;
}
format('evondev', 'developer', 40);
format('evondev', 'developer', '50');

// void function
function contact(name: string, phone: string): void {
  console.log(name, phone);
}
// promise function
const fetchData = (url: string): Promise<string> =>
  Promise.resolve(`get data from ${url}`);
// rest parameter
function information(id: number, ...names: string[]): string {
  return `${id}${names.join('')}`;
}
information(1, 'trunks', 'tuan');
// Callback function
function handleFile(text: string, callback: () => void): void {
  console.log(text);
  callback();
}
// Function params with params
// Function as type
type UpdateArray = (n: number) => number;
function handleFilterArray(numbers: number[], filter: UpdateArray): number[] {
  return numbers.map(item => filter(item));
}
handleFilterArray([1, 2, 34, 54], n => n * 5);
// Type assertion 'as'
function handleValue(val: number) {
  return (n: number) => n * val;
}
const value = handleValue(5);
console.log(value(10));
