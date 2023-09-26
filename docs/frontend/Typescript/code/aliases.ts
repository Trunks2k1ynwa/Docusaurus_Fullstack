type check = number | string
const checkNumber = (number: check, b: string): check => {
  console.log(number, b)
  return number
}
checkNumber(223, 'trung')
type Point = {
  x: number
  y: number
}

///////////
type a = number | string
function printCoord(pt: Point, val: a) {
  console.log("The coordinate's x value is " + pt.x)
  console.log("The coordinate's y value is " + pt.y)
  console.log(val)
}

printCoord({ x: 100, y: 100 }, 'trung')
