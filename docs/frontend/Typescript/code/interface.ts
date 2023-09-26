export interface Product {
  name: string;
  brand: string;
  color: string;
}
export interface ProductNewFeatures extends Product {
  speed?: "100km/h";
}
// Nếu giống nhau thì sẽ merge
// export interface Product {
//   speed?: '100km/h';
// }

export interface Icard {
  title: string;
  description: string;
  image: string;
  link: string;
}

// assertions
export type FinalProduct = Product & ProductNewFeatures;
