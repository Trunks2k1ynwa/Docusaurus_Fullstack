// Union type typeA | typeB
// Intersection types & typeA & typeB
interface IBusinessPartner {
  name: string;
  credit: number;
}
interface IIdentity {
  id: number;
  name: string;
}
interface IContact {
  email: string;
  phone: string;
}
type Employee = IIdentity & IContact;
type Customer = IBusinessPartner & IContact;
type Other = IContact | IIdentity;
let evondev: Employee = {
  email: "trung@gmail.com",
  id: 1,
  name: "evondev",
  phone: "12345",
};
let trung: Customer = {
  name: "Trung",
  credit: 3232,
  email: "trungthekop123@gmail.com",
  phone: "0323245r43",
};

// type casting
// type assertion
