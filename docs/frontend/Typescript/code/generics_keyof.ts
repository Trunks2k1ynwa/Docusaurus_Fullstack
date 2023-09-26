const devices = [
  {
    name: 'Iphone',
    price: 1000
  },
  {
    name: 'Ipad',
    price: 2000
  },
  {
    name: 'Macbook',
    price: 300
  }
]

function getDevicesKey<A, B extends keyof A>(val: A[], key: B) {
  return val.map((item) => item[key])
}
console.log(getDevicesKey(devices, 'name'))
console.log(getDevicesKey(devices, 'price'))
