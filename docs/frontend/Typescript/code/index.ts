import { FinalProduct, Product, ProductNewFeatures } from './interface';

export function total(a: number, b: number): void {
  a + b;
}
total(5, 8);
const age: number = 20;
const name: string = 'Trunks';

// Type assignment
// const variable: dataTypes = value
// const name:string = 'Trunks'
// const age: number = 20

/**
//Tuple
string[]->['trunks','react']
Cú pháp : [number,string]
Đúng: key:[number,string]-> key:[12432,'trunks']
Sai: ['evondev',123]

 */

/**
//Enum


 */
//Any
//Union
//Literal
//Function
//Void
//unknown

// let aNumber: unknown;
//   aNumber = 100;
// if (typeof aNumber === "number") {
//   aNumber.toFixed(2)
// }

//never

function raiseError(err: string): never {
  throw Error(err);
}
//Interface

const product: ProductNewFeatures = {
  name: 'cart',
  brand: 'evon',
  color: 'black',
};

function addProduct(product: FinalProduct) {
  console.log(product);
}
addProduct(product);

// Overloading
