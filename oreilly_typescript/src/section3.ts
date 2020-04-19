enum A {
  First = 1,
  Second = 2
}

let a = A[3];

console.log(a); // undefined

type Cat = {name: string, purrs: boolean};
type Dog = {name: string, barks: boolean, wags: boolean};

type CatOrDogOtBoth = Cat | Dog;

const testAnimal: CatOrDogOtBoth = {
  name: 'tama',
  barks: false,
  wags: false
}
